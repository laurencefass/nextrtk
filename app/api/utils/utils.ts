const fs = require('fs');

export const readFromFile = (filename: string) => {
    try {
      const jsonData = fs.readFileSync(filename, 'utf8');
      return JSON.parse(jsonData);
    } catch (err) {
      console.error('Error reading from file:', err);
      return null;
    }
};
  
export const writeToFile = (filename: string, data: any) => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filename, jsonData, 'utf8');
      console.log('Data written to file', jsonData, filename);
    } catch (err) {
      console.error('Error writing to file:', err);
    }
};