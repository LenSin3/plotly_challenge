// Create empty dictionaries to hold sample_values, otu_ids, otu_labels,

// var samplesData = [];
// Load samples.json

d3.json("/data/samples.json").then((data) => {

    // Extract metadata
    var metaData = data.metadata;
    console.log(metaData);
     
    // Extract samples data    
    var samples_data = data.samples; 

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

        // Panel Data
        var metaDataDefault = metaData[0];
        console.log(metaDataDefault);

        // Make reference to panel-body
        var pbody = d3.select(".panel-body");

        Object.entries(metaDataDefault).forEach(([key, value]) => {
            pbody.append("p").text(`${key}:${value}`);
            //cell.text(value);

        });

        // Gauge Chart

        
        var washFreq = {'lev1': 20,
                        'lev2': 40,
                        'lev3': 60,
                        'lev4': 80,
                        'lev5': 100,
                        'lev6': 120,
                        'lev7': 140,
                        'lev8': 160,
                        'lev9': 180};
        var level = washFreq.lev2;

        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
        x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'washfreq',
            text: level,
            hoverinfo: 'text+name'},
        { values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
        rotation: 90,
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9', ''],
        textinfo: 'text',
        textposition:'inside',	  
        marker: {colors:['rgba(162, 222, 208, 1)', 'rgba(78, 205, 196, 1)', 'rgba(145, 180, 150, 1)', 'rgba(77, 175, 124, 1)', 'rgba(3, 166, 120, 1)', 'rgba(1, 152, 117, 1)', 'rgba(22, 160, 133, 1)', 'rgba(4, 147, 114, 1)', 'rgba(30, 130, 76, 1)', 'rgba(255, 255, 255, 0)']},
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false,
        direction: "clockwise"
        }];

        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: '<b> Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 600,
        width: 600,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);




    }

   
        
       
    init();


    function optionChanged() {

        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var idVal = dropdownMenu.property("value");

        // Make reference to option tag
        var optionVal = d3.select("select");

        idVal = Object.entries(metaData).forEach(([key, value]) => {
            optionVal.append("option").text(value.id);
        });

        

    };
    optionChanged();

   
});


