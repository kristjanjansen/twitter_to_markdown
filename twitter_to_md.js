var fs = require('fs');
var config = require('config');
var ntwitter = require('ntwitter');
var moment = require('moment');
var argv = require('optimist')
  .default({ path : __dirname, count: 10})
  .argv
  
var twit = new ntwitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

var screen_name = config.screen_name

twit.getUserTimeline({screen_name: screen_name, count: argv.count, exclude_replies: false},
   function (err, data) {

     for (var i=0; i < data.length; i++) {
       
       var header = 
        '---\n' +
        '\ntitle: "' + data[i].text + '"' + 
        '\ndate: ' + moment(data[i].created_at).format('YYYY-MM-DD h:mm:ss') + 
        '\nurl: ' + 'http://twitter.com/' + screen_name + '/status/' + data[i].id_str + 
        '\ntype: twitter' +
        '\n---\n'
            
       var body = '\n' + data[i].text
       
       filename = moment(data[i].created_at).format('YYYY-MM-DD') + '-twitter-' + data[i].id_str
       fs.writeFile(argv.path +  '/' + filename + '.md', header + body, function (err) {
         if (err) throw err
       });
       
     };
   }
);

function expandUrl(shortUrl) {
  request( { method: "HEAD", url: shortUrl, followAllRedirects: true }, function (error, response) {
    console.log(response.request.href);
  });
}