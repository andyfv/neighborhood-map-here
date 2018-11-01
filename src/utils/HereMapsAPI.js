import * as MapConst from './HereMapsData';


const headTag = document.getElementsByTagName('head')[0];
let Map, Search, Platform, Explore;
const defaultBox = {
    ga: 23.26034401013183,
    ha: 23.380077820556636,
    ja: 42.66127992940933,
    ka: 42.71610488336009
};


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

export function initMap(center) {
    Platform = new window.H.service.Platform({
        app_id: MapConst.APP_ID,
        app_code: MapConst.APP_CODE,
        useHTTPS: true
    });

    let mapTypes = Platform.createDefaultLayers();

    Map = new window.H.Map(
        document.getElementById('map-container'),
        mapTypes.normal.map, {
            zoom: 14,
            center: center
        }
    );

    Search = new window.H.places.Search(Platform.getPlacesService())

    let mapEvents = new window.H.mapevents.MapEvents(Map);
    let behavior = new window.H.mapevents.Behavior(mapEvents);

    Search = new window.H.places.Search(Platform.getPlacesService());
    Explore = new window.H.places.Explore(Platform.getPlacesService());

    let headers = {
        'X-Map-Viewport': `${defaultBox.ga},${defaultBox.ja},${defaultBox.ha},${defaultBox.ka}`
    }

    window.addEventListener('resize', () => {
        Map.getViewPort().resize();
    })

    // For later use - maybe drag to a clicked result
    // Map.addEventListener('drag', () => {
        
    // })
}