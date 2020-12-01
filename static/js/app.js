// Create empty dictionaries to hold sample_values, otu_ids, otu_labels,
var sample_values = {};
var otu_ids = {};
var otu_labels = {};

// Load samples.json

d3.json("/data/samples.json", function(data) {
    sample_values.push(data.sample_values);

});