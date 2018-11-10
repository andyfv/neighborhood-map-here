import * as MapConst from './HereMapsData';
import icon from '../icons/marker_red.png';

const headTag = document.getElementsByTagName('head')[0];
let MapInstance, Platform, UI, markerIcon, MapEvents, Behavior;
export let MarkerGroup;


/* 
    The HereMaps libraries are loaded in the following sequence:
        1) mapjsCore
        2) mapjsService, mapjsEvents, mapjsUI (dependent on mapjsCore)
        3) mapjsPlaces (dependent on mapjsCore, mapjsService)
*/
export const loadMapLibs = () => {
    return loadLibrary(MapConst.LIBS.mapsjsCore)
        .then(() => Promise.all([
            loadLibrary(MapConst.LIBS.mapsjsService),
            loadLibrary(MapConst.LIBS.mapjsEvents),
            loadLibrary(MapConst.LIBS.mapjsUI)
        ]))
        .then(() => loadLibrary(MapConst.LIBS.mapjsPlaces))
        .catch(error => new Error('Failed to load map: ' + error))
}

// Load library by adding it to the headTag
function loadLibrary(url) {
    return new Promise((resolve, reject) => {
        let scriptHTML = document.createElement('script');

        scriptHTML.type = 'text/javascript';
        scriptHTML.charset = 'utf-8';
        scriptHTML.async = true;
        scriptHTML.src = url;

        scriptHTML.onload = function () {
            resolve(url);
        }

        scriptHTML.onerror = function () {
            reject('Failed to load library: ' + url);
        }

        headTag.appendChild(scriptHTML);
    })
}

/* 
    Initialize the Map
*/
export function initMap(center) {
    // Initialize Platform object with personal credentials and set options
    Platform = new window.H.service.Platform({
        app_id: MapConst.APP_ID,
        app_code: MapConst.APP_CODE,
        useHTTPS: true
    });

    // let defaultLayers = Platform.createDefaultLayers();

    let pixelRatio = window.devicePixelRatio || 1;

    // Get default map types from the Platform object
    let defaultLayers = Platform.createDefaultLayers({
        tileSize: pixelRatio === 1 ? 256 : 512,
        ppi: pixelRatio === 1 ? undefined : 320
    });

    // Instantiate the map:
    MapInstance = new window.H.Map(
        document.getElementById('map-container'),
        defaultLayers.normal.map, {
            zoom: 14,
            center: center
        }
    );

    MapEvents = new window.H.mapevents.MapEvents(MapInstance);
    Behavior = new window.H.mapevents.Behavior(MapEvents);

    // Create the default UI and remove the unwanted controls
    UI = window.H.ui.UI.createDefault(MapInstance, defaultLayers);
    UI.removeControl('mapsettings');
    UI.removeControl('zoom');

    // Add group for markers and add it to the map instance
    MarkerGroup = new window.H.map.Group();
    MapInstance.addObject(MarkerGroup);

    // Set marker icon
    markerIcon = new window.H.map.Icon(icon);

    // Window resize also resizes the map instance
    window.addEventListener('resize', () => {
        MapInstance.getViewPort().resize();
    })
}

export function searchPlaces(query = 'restaurant', cat) {
    let myHeaders = new Headers({
        'Accept-Language': 'en-US'
    });

    let url = `${MapConst.API.search}?
                app_id=${MapConst.APP_ID}&
                app_code=${MapConst.APP_CODE}&
                in=${MapInstance.l.center.lat},
                ${MapInstance.l.center.lng};
                r=5000&
                q=${query}&
                language=en-US&
                size=100`

    return fetch(formatURL(url), {
            headers: myHeaders
        }).then(response => {
            if (!response.ok) {
                throw Error('Unable to search venues')
            } else {
                return response.json()
            }
        })
        .then(data => data.results.items)
}

// Remove the unnecessary spaces from the URL string
function formatURL(URL) {
    return URL.replace(/\s+/g, '');
}

export function addMarker(place, index) {
    let coords = {
        lat: place.position[0],
        lng: place.position[1]
    };
    let marker = new window.H.map.Marker(coords, {
        icon: markerIcon,
        data: index
    });

    MarkerGroup.addObject(marker);
}


export function createInfoBubble(place) {
    // Remove previously opened InfoBubbles
    UI.getBubbles().forEach(bubble => UI.removeBubble(bubble))

    // Create the InfoBubble HTML content
    let html = createBubbleHTML(place);

    let position = {
        lat: place.position[0],
        lng: place.position[1]
    }

    // Create new InfoBubble
    let bubble = new window.H.ui.InfoBubble(position, {
        content: html
    });

    // Open the newly created InfoBubble
    UI.addBubble(bubble);

    // Set the center of the map at the InfoBubble location
    MapInstance.setCenter(position, true);
}

// Remove all previous Markers from the group if there are any
export function clearMarkers() {
    MarkerGroup.removeAll();
}

function createBubbleHTML(place) {
    return `<div>
                <h3>${place.title}</h2>
                <h4>${place.vicinity}</h3>
                ${(typeof(place.openingHours) !== 'undefined') ?
                `<h5>${place.openingHours.text}</h5>` :
                `Open Hours: No information`}
            </div>`
}