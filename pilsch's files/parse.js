var fs = require('fs');

var CSV_DATA = fs.readFileSync('./harvey_rain.csv').toString().split(/\n/).slice(1);

var JS_DATA = [];
CSV_DATA.forEach(csv_line => {
	var csv_array = csv_line.split(/,/);
  var long = parseFloat(csv_array[3], 10) || 0;
  long = long >= 0 ? long * -1 : long;
	JS_DATA.push([
		parseFloat(csv_array[2], 10) || 0,
		long,
		parseFloat(csv_array[16], 10) || 0,
	]);
});

fs.writeFileSync('./data.js', `var addressPoints = ${JSON.stringify(JS_DATA.slice(0,-1), null, 2)};`);
