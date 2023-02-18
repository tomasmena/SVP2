//import data from '../assets/midpoints.json' assert {type:'JSON'}

async function panels(){
    const response = fetch('./assets/panels.json');
    return (await response).json()
};
export const panelsr =  await panels();

