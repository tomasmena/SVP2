//import data from '../assets/midpoints.json' assert {type:'JSON'}

async function polygons(){
    const response = fetch('./assets/180kmboundary-Tomas.geojson');
    return (await response).json()
};
export const mapPolygons =  await polygons();

