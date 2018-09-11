import {
    APP_ID,
    APP_CODE,
    LIB
} from '../data/HereMapsData';

const headTag = document.getElementsByTagName('head')[0];

export const initMap = function (center) {
    // First load mapjsCore
    return loadLibrary(LIB.mapsjsCore)
        .then(() => Promise.all([
            // Then load the rest async after mapjsCore has loaded
            loadLibrary(LIB.mapsjsService),
            loadLibrary(LIB.mapjsEvents)
        ]))
        .then(defineMap.bind(this, center))
        .catch(error => new Error('failed to load map: ' + error))
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
            reject('error')
        }

        headTag.appendChild(scriptHTML);
    })
}

export const defineMap = function (center) {
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