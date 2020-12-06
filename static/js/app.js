// Create empty dictionaries to hold sample_values, otu_ids, otu_labels,

// var samplesData = [];
// Load samples.json
function createPlots(id) {

    d3.json("/data/samples.json").then((data) => {

        // Extract Names
        // var names  = data.names;
        // console.log(names);
    
        // Extract metadata
        var metaData = data.metadata;
        console.log(metaData);

        // Extract wash frequency
        var wfreq = metaData.map(val => val.wfreq);
        console.log(wfreq);
         
        // Extract samples data    
        var samples_data = data.samples; 
        // console.log(samples_data.sample_values);

        // Extract samples value id
        var samplesData = samples_data.filter(val => val.id.toString() === id)[0];
        console.log(samplesData);

        /* var samplesVals = [];
        var samplesOTUIDs = [];
        // var otuIdLabels = [];
        var samplesLabels = [];

        Object.entries(samples_data).forEach(([key, value]) => {
            samplesVals.push(value.sample_values);
            samplesOTUIDs.push(value.otu_ids);
            samplesLabels.push(value.otu_labels);
        }); */

        // Extract top 10 sample values and corresponding otu ID and labels
            
        var samplesVal= samplesData.sample_values.slice(0, 10);
        var samplesOTUID = (samplesData.otu_ids.slice(0, 10)).reverse();
        var otuIdLabel = samplesOTUID.map(val => 'OTU ' + val);
        var samplesLabel = samplesData.otu_labels.slice(0, 10);
        
        console.log(samplesVal);
        console.log(samplesOTUID);
        console.log(otuIdLabel);
        console.log(samplesLabel);



        // Extract top 10 sample values and corresponding otu ID and labels
            
        /* var samplesVal= samplesVals[0].slice(0, 10);
        var samplesOTUID = (samplesOTUIDs[0].slice(0, 10)).reverse();
        var otuIdLabel = samplesOTUID.map(val => 'OTU ' + val);
        var samplesLabel = samplesLabels[0].slice(0, 10);
        
        console.log(samplesVal);
        console.log(samplesOTUID);
        console.log(otuIdLabel);
        console.log(samplesLabel); */

        // Horizontal Bar Graph
        var trace1 = {
            x: samplesVal.sort(function(a, b){return a - b}),
            y: otuIdLabel.toString(),
            text: samplesLabel.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        Plotly.newPlot("bar", data1, layout1);

        // Bubble chart
        var trace2 = {
            x: samplesData.otu_ids,
            y: samplesData.sample_values,
            mode: "markers",
            marker: {
                size: samplesData.sample_values,
                color: samplesData.otu_ids
            },
            text: samplesData.otu_labels
        };

        var data2 = [trace2];

        var layout2 = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };
        Plotly.newPlot("bubble", data2, layout2);

        // Gauge Chart
       /* var trace3 = [
            {
                domain: {x: [0, 1], y: [0, 1]},
                value: parseFloat(wfreq),
                title: {
                    text: "<b> Belly Button Washing Frequency</b> <br> Scrubs per Week"
                },
                type: "indicator",
                mode: "gauge+number",
                gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "yellow" },
                    { range: [2, 4], color: "cyan" },
                    { range: [4, 6], color: "teal" },
                    { range: [6, 8], color: "lime" },
                    { range: [8, 9], color: "green" },
                  ]}
            }
        ];

        var data3 = [trace3];

        var layout3 = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
        };
        Plotly.newPlot("gauge", data3, layout3); */ 
        
        /* var washFreq = {'lev1': 20,
                        'lev2': 40,
                        'lev3': 60,
                        'lev4': 80,
                        'lev5': 100,
                        'lev6': 120,
                        'lev7': 140,
                        'lev8': 160,
                        'lev9': 180}; */
        // Extract wash frequency
       /* var metaDataIdinfo = Object.entries(metaData).forEach(([key, value]) =>{
            return value.id;
        });
        console.log(metaDataIdinfo);

        var level = parseFloat(metaDataIdinfo) * 20;
    
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
    
        Plotly.newPlot('gauge', data, layout); */
    
    });
};

// Capture ID from metadata and display metadata
function metaDataByID(id) {

    // read samples data from json data file
    d3.json("data/samples.json").then((data) => {
        // Extract metadata
        var metaData = data.metadata;
        console.log(metaData);

        // Extract metadata ID
        // Extract wash frequency
        var metaDataId = metaData.filter(val => val.id.toString() === id)[0];
        console.log(metaDataId);

        // Make reference to panel-body
        // var pbody = d3.select(".panel-body");
        var pbody = d3.select("#sample-metadata");
    
        // reset html after selection
        pbody.html("");
    
        // Append 'p' tag to hold the metadata       
    
        Object.entries(metaDataId).forEach(([key, value]) => {
            pbody.append("p").text(`${key}:${value}`);    
        });


    });

};

// Create function for event listener
function optionChanged(id) {
    createPlots(id);
    metaDataByID(id);
}

// Initialize default plots
function init() {
    // Capture data for dropdown selector
    var dropdown = d3.select("#selDataset");

    // read json data
    d3.json("data/samples.json").then((data) => {
        console.log(data);
        // Extract  names array
        var names = data.names;
        // Get id for dropdown selector
        names.forEach((value) => {
            dropdown.append("option").text(value).property("value");
        });

        // call the plot functions to display the plots
        createPlots(names[0]);
        metaDataByID(names[0]);

    });

}

init();







// console.log(samplesVals[0]);
          
        // console.log(samples_data.slice(0, 1));
    
        // data for default plot
    
        // meta data panel
        /*function metaDataPanel(data) {
    
            // var metaDataDefault = metaData[0];
            // console.log(metaDataDefault);
    
            // Make reference to panel-body
            // var pbody = d3.select(".panel-body");
            var pbody = d3.select("#sample-metadata");
    
            // reset html after selection
            pbody.html("");
    
            // Append 'p' tag to hold the metadata       
    
            Object.entries(metaData).forEach(([key, value]) => {
                pbody.append("p").text(`${key}:${value}`);
                //cell.text(value);
    
            });
    
        };
    
        // build bar, bubble and gauge chart
    
        function multiChartPanel() {
    
            // Horizontal bar chart
    
            var x = samplesVals.slice(0, 10);
            var y =  samplesOTUID.slice(0, 10);
            var labels = samplesLabels.slice(0, 10);
            var tickvals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var ticktext = samplesOTUID.map(val => 'OTU ' + val);
    
            var trace1 = {
                type: "bar",
                x: x.sort(function(a, b){return a - b}),
                y: y.toString(),
                text: labels.reverse(),
                name: "otu value",
                orientation: "h"
            };
            var data1 = [trace1];
    
            // var valTickText = yVals.reverse();
            // console.log(valTickText);
    
            var layout = {
                title: "Bar Chart",
                yaxis: {
                    tickmode: "array",
                    tickvals: tickvals,
                    ticktext: ticktext
                }
            };
            Plotly.newPlot("bar", data1, layout);
    
            // Bubble chart
            var xVal = samplesOTUID;
            var yVal = samplesVals;
            var text = labelVals;
            var size = samplesVals;
            var color = samplesOTUID;
    
            var trace2 = {
                x: xVal,
                y: yVal,
                text: text,
                mode: "markers",
                marker: {
                    size: size,
                    color: color
                }
            };
            var data2 = [trace2];
    
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
            Plotly.newPlot("bubble", data2, layout);
    
    
        };
    
        // Build default plots
        function init() {
    
            // Use D3 to select the dropdown menu
            var dropdownMenu = d3.select("#selDataset");
            // Assign the value of the dropdown menu option to a variable
            // var idVal = dropdownMenu.property("value");
    
            // Make reference to option tag
            // var optionVal = d3.select("select");
    
            // var idVals = [];
    
            names.forEach((value) => {
                dropdownMenu.append("option").text(value).property("value", value);
                // idVals.push(value.id);
    
            });
            // Get values for first arrays to plot default charts
            const defaultPlot = names[0];
            metaDataPanel(defaultPlot);
            multiChartPanel(defaultPlot);
        };
    
        // d3.selectAll("#selDataset").on("change", optionChanged);
    
        function optionChanged(dropdownVal) {
            metaDataPanel(dropdownVal);
            multiChartPanel(dropdownVal);
        }
    
        init();
        
    
        
    
    
    
       /* // var landingPlotData = samples_data.slice(0, 1);
        var xVals = samplesVals[0].slice(0, 10);
        var yVals =  samplesOTUID[0].slice(0, 10);
        var labelVals = samplesLabels[0].slice(0, 10);
        console.log(xVals);
        console.log(yVals);
        console.log(labelVals);
    
        /*function init() {
    
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
            // var pbody = d3.select(".panel-body");
            var pbody = d3.select("#sample-metadata");
            
    
            Object.entries(metaDataDefault).forEach(([key, value]) => {
                pbody.append("p").text(`${key}:${value}`);
                //cell.text(value);
    
            });
    
            // Gauge Chart
    
            
           /* var washFreq = {'lev1': 20,
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
    
        }*/
             
           
        // init();
    
       
    
    
        /* function optionChanged() {
    
            // Use D3 to select the dropdown menu
            var dropdownMenu = d3.select("#selDataset");
            // Assign the value of the dropdown menu option to a variable
            var idVal = dropdownMenu.property("value");
    
            // Make reference to option tag
            var optionVal = d3.select("select");
    
            var idVals = [];
    
            Object.entries(metaData).forEach(([key, value]) => {
                optionVal.append("option").text(value.id);
                idVals.push(value.id);
            });
    
            idVal = idVals.map(val => val);
    
            console.log(idVals);
    
            for (var i = 0; i < idVal.length; i++) {
            
    
                // update horizontal bar graph
                // Initialize x and y arrays
                var x = [];
                var y = [];
                var textLabels = [];
        
                x = samplesVals[i].slice(0, 10);
                y = samplesOTUID[i].toString().slice(0, 10);
                textLabels = samplesLabels[i].slice(0, 10);
        
                var trace = {
                    type: "bar",
                    x: x.sort(function(a, b){return a - b}),
                    y: y.toString(),
                    text: textLabels.reverse(),
                    name: "otu value",
                    orientation: "h"
                };
                var data = [trace];
            
                // var valTickText = y.reverse();
                // console.log(valTickText);
            
                var layout = {
                    title: "Bar Chart",
                    yaxis: {
                        tickmode: "array",
                        tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        
                        ticktext: y.map(val => 'OTU ' + val)
                            
                    }
                }; 
    
                // updatePlot(data);
    
            };
            
    
            
        };
        // Call updatePlotly() when a change takes place to the DOM
        optionChanged();
        /* function updatePlot(newdata) {
    
    
            Plotly.restyle("bar", "x", [newdata]);
            Plotly.restyle("bar", "y", [newdata]); 
    
        }*/
        // init();
        
    
       



