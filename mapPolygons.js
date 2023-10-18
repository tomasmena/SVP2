//import data from '../assets/midpoints.json' assert {type:'JSON'}

async function polygons(){
    const response = fetch('./assets/Intactforest4_Tomas.geojson');
    return (await response).json()
};
export const mapPolygons =  await polygons();

