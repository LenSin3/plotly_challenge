// Create empty dictionaries to hold sample_values, otu_ids, otu_labels,


// Load samples.json

d3.json("/data/samples.json").then((data) => {
     
    // Extract samples data
    var samples_data = data.samples;    
    console.log(samples_data);

    // Grab subject ids
    var id =  samples_data.map(val => val.id);
    console.log(id);

    // Grab the otu_ids
    var otu_ids = samples_data.map(val => val.otu_ids);
    console.log(otu_ids);

    // Grab the sample values
    var sample_values = samples_data.map(val => val.sample_values);
    console.log(sample_values);

    // Grab the otu labels
    var otu_labels = samples_data.map(val => val.otu_labels);
    console.log(otu_labels);

    

});



