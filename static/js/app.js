// Create empty dictionaries to hold sample_values, otu_ids, otu_labels,


// Load samples.json

d3.json("/data/samples.json").then((data) => {
     
    var samples_data = data.samples;
    // var sample_values = samples_data.id.sample_values;
    console.log(samples_data);
    // console.log(data.sample_values);
    var otu_ids = samples_data.map(val => val.otu_ids);
    console.log(otu_ids);
    
    

});



