var array= [['State Code', 'State', 'Confirmed','Active'],]
  array.push([ 'IN-UP','Uttar Pradesh', 0,0]);
  google.load('visualization', '1', {'packages': ['geochart']});
     fetch("https://covid-19-india.p.rapidapi.com/state_data", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-india.p.rapidapi.com",
        "x-rapidapi-key": "3976837a4amshf669e9f19d86bbep11dc88jsn3a3f761c6725"
        }
      })
  .then(response => response.json())
  .then(response=>{
            google.setOnLoadCallback(drawVisualization);
           // console.log(response.data.state_data);
             response.data.statewise.forEach(element => {
                const active=Number(element.active);
                const confirmed=Number(element.confirmed);
                const state=element.state;
                const statecode="IN-"+element.statecode;
                if(statecode !=="IN-TT")
                    {
                        array.push([statecode,state,confirmed,active]);
                    }
             });
    })
    .catch(err => {
      console.log(err);
      });

function drawVisualization() {
  var data = google.visualization.arrayToDataTable(array);

      var opts = {
        region: 'IN',
        domain:'IN',
        displayMode: 'regions',
        colorAxis: {colors: ['#ffdede', '#ff9090','#fd5252','#ce1e1e']},
        resolution: 'provinces',
        /*backgroundColor: '#81d4fa',*/
        /*datalessRegionColor: '#81d4fa',*/
        defaultColor: '#f5f5f5',
        width: 800, 
        height: 600
      };
      var geochart = new google.visualization.GeoChart(
          document.getElementById('visualization'));
      geochart.draw(data, opts);
    };
