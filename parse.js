// In Node, we have to require external libraries in this way:
var fs = require('fs'); // This requires the filesystem (fs) object, which reads and writes files


var CSV_DATA = fs.readFileSync('./harvey_rain.csv'). // Read in the CSV file
  toString(). // Convert the contents into a string
  split(/\n/). // Break that string into an array of strings (line-by-line)
  slice(1); // Remove the first element (which contains column names)

// Declare our output variable as a blank array:
var JS_DATA = [];

// Go line by line through the array of CSV lines:
CSV_DATA.forEach(csv_line => { // csv_line contains each line of the CSV file
	var csv_array = csv_line.split(/,/); // Split that line into an array of strings by comma
  var long = parseFloat(csv_array[3], 10) || 0; // Get the longitude point and convert from string to floating point number
  long = long >= 0 ? long * -1 : long; // Fix the ones that are entered wrong from CoCoRaHS
  // Add an array of data to the end of our output variable (.push adds to the end of an array)
	JS_DATA.push([
		parseFloat(csv_array[2], 10) || 0, // Get latitude and convert from string to floating point number
		long, // Longitude (calculated above)
    parseFloat(csv_array[16], 10) || 0, // Get total rainfall and convert from string to floating point number
    // Change 16 above if you want to look at individual days
	]);
});

// Convert the array of arrays into a serialized string that can be later converted back into an array
// by JavaScript:
var output_contents = JSON.stringify(JS_DATA.slice(0,-1), null, 2);
// The file name for writing the data (change if you want to have multiple data sets):
var output_file = 'data.js';
// Write the file:
fs.writeFileSync(output_file, `var addressPoints = ${output_contents};`);
