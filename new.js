var fs = require('fs');
var moment = require('moment');
var argv = require('optimist')
  .default({ path : __dirname, title: "New post"})
  .argv
  
var header = 
  '---' +
  '\nlayout: post' + 
  '\ntitle: ' + argv.title + 
  '\ndate: ' + moment().format('YYYY-MM-DD h:mm:ss') + 
  '\n---\n\n'
      
var filename = moment().format('YYYY-MM-DD') + '-' + argv.title.replace(' ', '-').toLowerCase()
fs.writeFile(argv.path +  '/' + filename + '.md', header, function (err) {
  if (err) throw err
});
