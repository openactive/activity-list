// simple script retrieving JSON-LD serialisation of activity list,
// writing to file to ensure repo copy is current

var request = require("request");
var fs = require("fs");

const options = {
    url: 'https://openactive.io/activity-list/activity-list.jsonld',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
};

request(options, function (error, response, body) {
  if(response.statusCode == "200"){
    writeLatest(body);
  }
  else{
    throw new Error("Could not retrieve activity list JSON: Response code " + response.statusCode);
  }
});

var writeLatest = (latestJSON) => {

  asJSON = JSON.parse(latestJSON);
  // need to roundtrip txt->JSON->txt to avoid character-escaping problems
  asString = JSON.stringify(asJSON, null, 4);
  var writeStream = fs.createWriteStream("activity-list.jsonld");
  writeStream.write(asString);
  writeStream.end();

}
