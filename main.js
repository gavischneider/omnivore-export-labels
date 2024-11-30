const fs = require('fs');
const path = require('path');

// Get all JSON files from the current directory
const jsonsInDir = fs.readdirSync('.').filter(file => path.extname(file) === '.json');

let files = [];
let total = 0;
let links = {};
let noLabels = [];
let fileName = 'links.json';

// Place all JSON files from current directory in files array
jsonsInDir.forEach(file => {
    files.push(file);
  });

// Sort files
files.sort((a, b) => a.localeCompare(b, navigator.languages[0] || navigator.language, {numeric: true, ignorePunctuation: true}));

// Loop through files, loop through json objects in each file
files.forEach(file => {
    const fileData = fs.readFileSync(file);
    const json = JSON.parse(fileData.toString());
    total += json.length;
    for (i=0; i<json.length; i++){
        let jsonObject = json[i];
        let labels = Array.from(jsonObject["labels"]);
        if(labels.length > 0){
            // There's at least one label
            for(j=0; j<labels.length; j++){
                // Create an array for this label if it doesn't already exist
                let x = links[labels[j]];
                let listOfLinks = Array.isArray(x) ? x : [];
                // Add url to the array, then add the array to the links object
                listOfLinks.push(jsonObject["url"]);
                links[labels[j]] = listOfLinks;
            }
        } else {
            // No labels attached
            noLabels.push(jsonObject["url"]);
        }
    }
});

// Add noLabels array to links object
links["noLabels"] = noLabels;
links = [links];

//Save links object to file
let linksString = JSON.stringify(links);
let filePath = 'results/' + fileName;
fs.writeFile(filePath, linksString, (err, res) => {
    if(err){
        console.log("Error: " + err);
    } else {
        console.log("\nFile " + fileName + " created/updated successfully");
    }
});

// Print array lengths
let totalWithDuplicates = 0;
console.log("\nArray Lengths: \n---------------------------")
for(let key in links){
    totalWithDuplicates += links[key].length;
    console.log("[ " + key + ": " + links[key].length + " links ]");
}

// Print summary
console.log("\nTotal ammount of links: " + total);
console.log("\nTotal ammount of links (including duplicates): " + totalWithDuplicates);
console.log("\nTotal ammount of links with more than one label attached: " + (totalWithDuplicates - total));


