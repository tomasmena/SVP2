
import {mapPolygons} from './mapPolygons.js';
const testPolygons=(mapPolygons.features[0].geometry.coordinates)
// console.log(testPolygons[0][0])


mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYXNtZW5hIiwiYSI6ImNsbXlqZjY0bjEzZGYyamxpOHBwMGxqczMifQ.y8mLdsITvhs0VkXdZXxx0Q';
const map = new mapboxgl.Map({
container: 'map',
// container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/tomasmena/clm87qlc2014001pfg85j9v96', // style URL
center: [20.2040871486724,65.5804451373921], // starting position [lng, lat]
zoom: 6

 // starting zoom
});

for (let coord of testPolygons){
    console.log(coord)
}

const geojson = {
    type:'FeatureCollection',
    features:[{
        type: 'Feature',
        geometry: {
            type:'Point',
            coordinates:[18.570945,66.974733]
            },
            properties:{
            title:'Tjamotis Damm',
            description:'<iframe src="https://speckle.xyz/embed?stream=521b67e98f&transparent=true&autoload=true&hidecontrols=true&noscroll=true&hidesidebar=true&hideselectioninfo=true" width="400" height="400" frameborder="0"></iframe>'
            }           
        }]
    };
map.on('load',()=>{
    map.addSource(
        'testPol',{
            type:'geojson',
            data:mapPolygons
            }
        )               
        // Add a new layer to visualize the polygon.
        map.addLayer({
        'id': 'testPol',
        'type': 'fill',
        'source': 'testPol', // reference the data source
        'layout': {},
        'paint': {
        'fill-color': '#FF0000', // blue color fill
        'fill-opacity': 0.5
        }
        });
        // Add a black outline around the polygon.
        map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'testPol',
        'layout': {},
        'paint': {
        'line-color': '#000',
        'line-width': 2
        }
    });
});

for (let feature of geojson.features){
    const el= document.createElement('div');
    el.className='marker';
    new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h3>${feature.properties.title} </h3><p> ${feature.properties.description}</p>`).setMaxWidth('800'))
    .addTo(map);
};  


