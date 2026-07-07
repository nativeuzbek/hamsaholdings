const fs = require('fs');

let jsCode = fs.readFileSync('static/cars-data.js', 'utf8');
jsCode = jsCode.replace('module.exports = CARS_DATA;', '');

let CARS_DATA;
// Evaluate the code to get the array
eval(jsCode + "\n CARS_DATA_EXPORT = CARS_DATA;");

const pythonDictString = JSON.stringify(CARS_DATA_EXPORT, null, 4)
  .replace(/true/g, 'True')
  .replace(/false/g, 'False')
  .replace(/null/g, 'None');

const pyCode = `CARS = ${pythonDictString}\n`;
fs.writeFileSync('data.py', pyCode, 'utf8');
console.log('Successfully created data.py');
