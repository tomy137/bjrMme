/** Hi! This program isn't for young boy, ok? 
Let's see the most beautiful thing in the world **/

// A CHANGER AU BESOIN : 
// ----------------------
var destinationFolder = '/media/dd1/Dropbox/Shared/MenFolders/'
// ----------------------


var fs = require('fs'); //FileSystem
var request = require("request"); //request
var cheerio = require("cheerio"); //cheerio
var http = require('http');
var moment = require('moment');

request('http://www.bonjourmadame.fr/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    var a = $("div[class='photo post']").html();
    var $$ = cheerio.load(a);
    var url = $$('a img').attr('src');
    console.log(url);
    download(url, destinationFolder+dateDuJour()+'.jpg',cb);
  }
});

var cb = function (err) {
  console.log('Gros voyeur !');
};

var download = function (url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function (response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
};

var dateDuJour = function (){
  return moment().format('YYYYMMDD').toString();
};
