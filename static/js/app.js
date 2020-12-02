// Create empty dictionaries to hold sample_values, otu_ids, otu_labels,

var samplesData = [];
// Load samples.json

d3.json("/data/samples.json").then((data) => {
     
    // Extract samples data
    // var samples_data = data.samples; 
    samplesData.push(data.samples);   
    console.log(data.samples);

    /*samples_data.forEach(element => {
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

        function init() {
        data = [{
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 4, 8, 16] }];

        Plotly.newPlot("plot", data);
}


    });
    */

    // Grab subject ids
    // var id =  samples_data.map(val => val.id);
    //console.log(id);

    // Grab the otu_ids
    // var otu_ids = samples_data.map(val => val.otu_ids);
    // console.log(otu_ids);

    // Grab the sample values
    // var sample_values = samples_data.map(val => val.sample_values);
    // console.log(sample_values);

    // Grab the otu labels
    // var otu_labels = samples_data.map(val => val.otu_labels);
    // console.log(otu_labels);

    // Horizontal Bar Chart

    /*var trace = {
        type: "bar",
        x: sample_values.map(val => val),
        y: otu_ids.map(val => val),
        text: otu_labels.map(val => val),
        name: "otu value",
        orientation: "h"
    };
    var data = [trace];

    var layout = {
        title: "Bar Chart"
    };
    Plotly.newPlot("bar", data, layout);



    */
});

console.log(samplesData)

// Initializes the page with a default plot
function init() {


    samplesData.forEach(element => {
        var id = element.id;
        console.log(id);

        var otu_ids = element.otu_ids;
        console.log(otu_ids);

        // Grab the sample values
        var sample_values = element.sample_values;
        console.log(sample_values);

        // Grab the otu labels
        var otu_labels = element.otu_labels;
        console.log(otu_labels);


    });


    /*data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("plot", data);
    */
  };
init();

