var fs = require('fs');
var each = require('each');
var config = require('config');
var ntwitter = require('ntwitter');
var moment = require('moment');
var request = require('request');
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
   function (err, item) {

     each(item)
     .on('item', function(data, i, next) {
       var header = 
        '---\n' +
        '\ntitle: ' + data.text.replace('"', '').replace(':', '') + 
        '\ndate: ' + moment(data.created_at).format('YYYY-MM-DD h:mm:ss') + 
        '\npermalink: ' + 'twitter/' + data.id_str + 
        '\ntwitter_url: ' + 'http://twitter.com/' + screen_name + '/status/' + data.id_str + 
        '\n---\n'
            
       var body = data.text

       expandUrls(body, function(body) {
         body = body
           .replace(/\B#([^ ]+)/ig, '<a href="https://twitter.com/search?q=' + encodeURIComponent('#') + '$1">#$1</a>')
           .replace(/\B\@([^ ]+)/ig, '<a href="https://twitter.com/$1">@$1</a>')
          filename = moment(data.created_at).format('YYYY-MM-DD') + '-twitter-' + data.id_str
          fs.writeFile(argv.path +  '/' + filename + '.md', header + '\n' + body, function (err) {
            if (err) throw err
          });
          setTimeout(next, 0);             
       })       
     })
   }
);



function expandUrls(str, callback) {
    
  var matches = str.match(/((^|\s)(https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)
  if (matches) {
  each(matches)
  .on('item', function(url, index, next) {
    request({
      method: "HEAD",
      url: url,
      followAllRedirects: true
      }, 
      function(e, r, b) {
       str = str.replace(url, ' ' + r.request.href)
       setTimeout(next, 0);   
    })
  })
  .on('end', function() {
    return callback(str)
  });
  } else {
    return callback(str)
  }
}
