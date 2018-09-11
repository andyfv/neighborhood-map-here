import {
    APP_ID,
    APP_CODE
} from '../data/credentials';

const libraries = {
    mapsjsCore: 'http://js.api.here.com/v3/3.0/mapsjs-core.js',
    mapsjsService: 'http://js.api.here.com/v3/3.0/mapsjs-service.js',
    mapjsEvents: 'http://js.api.here.com/v3/3.0/mapsjs-mapevents.js'
};

const headTag = document.getElementsByTagName('head')[0];

export const loadMapLibraries = function () {
    // First script loads
    return getLibrary(libraries.mapsjsCore)
    .then(() => Promise.all([
            // Load the rest async
            getLibrary(libraries.mapsjsService),
            getLibrary(libraries.mapjsEvents)
        ])
    )
    .catch(error => new Error('failed to load map: ' + error))
}

function getLibrary(url) {
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
            reject('error')
        }

        headTag.appendChild(scriptHTML);
    })
}

export const initMap = function (center) {
   let platform = new window.H.service.Platform({
       'app_id': APP_ID,
       'app_code': APP_CODE
   });

   let mapTypes = platform.createDefaultLayers();

   let map = new window.H.Map(
       document.getElementById('map-container'),
       mapTypes.normal.map, {
           zoom: 14,
           center: center
       }
   );

   let mapEvents = new window.H.mapevents.MapEvents(map);
   let behavior = new window.H.mapevents.Behavior(mapEvents);

   window.addEventListener('resize', () => map.getViewPort().resize());
}