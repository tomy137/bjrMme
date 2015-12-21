"use strict";
/** Hi! This program isn't for young boy, ok? 
Let's see the most beautiful thing in the world **/

// A CHANGER AU BESOIN : 
// ----------------------

var destinationFolder = '/media/dd1/Dropbox/Shared/MenFolders/'
//var destinationFolder = "/tmp/"
// ----------------------

var fs = require('fs'); //FileSystem
var request = require("request"); //request
var cheerio = require("cheerio"); //cheerio
var http = require('http');
var moment = require('moment');

var website = 'http://ditesbonjouralamadame.tumblr.com';
var downTable = [];

var findHer = function(url,date){
  console.log("findHer("+url+','+date+');');

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var a = $("div[class='photo post']").html();
      var $$ = cheerio.load(a);
      var url = $$('a img').attr('src');
      console.log(url);
      //download(url, destinationFolder+date+'.jpg',cb);
      if(url) addDownload (url, destinationFolder+date+'.jpg');
    }
  });
};

var addDownload = function (url, dest){
  downTable.push([url, dest]);
  console.log("downTable : ", downTable);
  download();
  FLAG=true;
};

var cb = function (err) {
  console.log("Téléchargement terminé, gros voyeur ! =)");
};

var FLAG = false;
var download = function () {
  
  if (downTable[0] || !FLAG ) {
    var table = downTable.shift();
    var url = table[0];
    var dest = table[1];

    var file = fs.createWriteStream(dest);
  
    var request = http.get(url, function (response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(download());
      });
    });
  }
  else cb();

};




var dateDuJour = function (){
  return moment().format('YYYYMMDD').toString();
};

var dateMinorOf = function (nb){
  return moment().subtract(nb, 'days').format('YYYYMMDD').toString();
};


/**** MODE RATTRAPAGE *****/

/******Check des arguments*******/
//checkARGS = function(cb){
var checkARGS = function(){
  var ARGS = false;
  for (var i = 0; i < process.argv.length; i++) {
    if (process.argv[i] ==='--miss') {
      ARGS = true;
      if(process.argv[i+1]) {
        var nbDAY = process.argv[i+1];
        console.log("Missing days = "+nbDAY);
        missDays(nbDAY);
      }
      else 'Veuillez entrer la commande sous la forme suivante : --miss [Nombre de jours à rattraper';
    }     
  };
  if(ARGS===false) findHer(website,date);
};

var missDays = function (nbDAY){
  for (var i = 1; i <= nbDAY; i++) {
    console.log("DAY "+i);
    //Si nbDay = 3 alors d'abord 1J de retard : 
    var newDate = dateMinorOf(i);
    var newURL = website+'/page/'+i;
    console.log('date : '+newDate+' url : '+newURL );
    findHer(newURL, newDate);
  };
};
var date = dateDuJour();

checkARGS();
