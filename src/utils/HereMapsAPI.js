const libraries = {
    mapsjsCore: 'http://js.api.here.com/v3/3.0/mapsjs-core.js',
    mapsjsService: 'http://js.api.here.com/v3/3.0/mapsjs-service.js',
    mapjsEvents: 'http://js.api.here.com/v3/3.0/mapsjs-mapevents.js'
};

const headTag = document.getElementsByTagName('head')[0];

export const loadMap = function () {
    // First script loads
    return getLibrary(libraries.mapsjsCore)
    .then(() => Promise.all([
            // Load the rest async
            getLibrary(libraries.mapsjsService),
            getLibrary(libraries.mapjsEvents)
        ])
    )
    .catch(error => new Error('failed to load map'))
    
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
        console.log('exit');
        console.log(window);
    })
}



// function getLibrary(url) {
//     fetch(url)
//     .then(() => {
//         console.log(window);

//     })
// }