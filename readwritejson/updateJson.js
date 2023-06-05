const fs = require('fs');
const path = require('path');

function updateJsonData() {
  const filePath = path.join(__dirname, 'dummy.json');

  // Read the dummy.json file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Update the name field with the global variable
    jsonData.name = global.myVariable;

    // Convert the updated data back to JSON format
    const updatedData = JSON.stringify(jsonData, null, 2);

    // Write the updated data back to the dummy.json file
    fs.writeFile(filePath, updatedData, 'utf8', err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Successfully updated the name in dummy.json file.');
    });
  });
}

module.exports = updateJsonData;
