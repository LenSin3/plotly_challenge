// Create empty dictionaries to hold sample_values, otu_ids, otu_labels,

// var samplesData = [];
// Load samples.json

d3.json("/data/samples.json").then((data) => {
     
    // Extract samples data
    
    samples_data = data.samples; 

    var samplesVals= [];
    var samplesOTUID = [];
    var samplesLabels = [];


    Object.entries(samples_data).forEach(([key, value]) => {

        
        samplesVals.push(value.sample_values);
        samplesOTUID.push(value.otu_ids);
        samplesLabels.push(value.otu_labels);
        
    });

    console.log(samplesVals[0]);
    console.log(samplesOTUID[0]);
    console.log(samplesLabels);
    // console.log(samplesVals[0]);
      
    // console.log(samples_data.slice(0, 1));

    // data for default plot

    // var landingPlotData = samples_data.slice(0, 1);
    var xVals = samplesVals[0].slice(0, 10);
    var yVals =  samplesOTUID[0].slice(0, 10);
    var labelVals = samplesLabels[0].slice(0, 10);
    console.log(xVals);
    console.log(yVals);
    console.log(labelVals);

    function init() {

        // horizontal bar graph
        

        var trace = {

            type: "bar",
            x: xVals.sort(function(a, b){return a - b}),
            y: yVals.toString(),
            text: labelVals.reverse(),
            name: "otu value",
            orientation: "h"
        };
        var data = [trace];

        var valTickText = yVals.reverse();
        console.log(valTickText);

        var layout = {
            title: "Bar Chart",
            yaxis: {
                tickmode: "array",
                tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                ticktext: yVals.map(val => 'OTU ' + val)
                // ['OTU 1167', 'OTU 2859', 'OTU 482', 'OTU 2264', 'OTU 41', 'OTU 1189', 'OTU 352', 'OTU 189', 'OTU 2318', 'OTU 1977']
            }
        };
        Plotly.newPlot("bar", data, layout);



        
        // Bubble chart plot

        var trace1 = {
            x: samplesOTUID[0],
            y: samplesVals[0],
            text: labelVals[0],
            mode: "markers",
            marker: {
                size: samplesVals[0],
                color: samplesOTUID[0]
            }
        };
        var data = [trace1];

        var layout = {
            title: "Sample Values",
            showlegend: false,
            width: 1000,
            height: 600,
            xaxis: {
                title: {
                    text:  "OTU-ID"
                } 
            }
        };
        Plotly.newPlot("bubble", data, layout);
        
       /*
        var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 11, 12, 13],
            mode: 'markers',
            marker: {
            size: [40, 60, 80, 100]
            }
        };
        
        var data = [trace1];
        
        var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
        };
        
        Plotly.newPlot('bubble', data, layout);
        */



    }
    init();






   /* samples_data.forEach(element => {
        var id = element.id;
        console.log(id);

        var otu_ids = element.otu_ids.slice(0, 10);
        console.log(otu_ids);

        // Grab the sample values
        var sample_values = element.sample_values.slice(0, 10);
        console.log(sample_values);

        // Grab the otu labels
        var otu_labels = element.otu_labels.slice(0, 10);
        console.log(otu_labels);
        

        


    });
    */
    

    
});


