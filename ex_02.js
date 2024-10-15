document.getElementById('loadData').addEventListener('click', async () => {
    try {
        const url = 'https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv';     
        let response = await fetch(url);
  
        if (!response.ok) {throw new Error("Erreur : " + response.status);}
        let data = await response.text();
        
        document.getElementById('temperatureData').textContent = data;} 
        catch (error) {
        console.error('Une erreur est survenue :', error);
        document.getElementById('temperatureData').textContent = 'Charge pas';}})
        console.log(url);
