const http = require('http');
const qs = require('querystring');
const qv = require('./queryVar');
const fs = require('fs');
const books = require('../data/books.json');

function sendResponse(status, content, response) {
  response.writeHead(status, {'Content-Type' : 'text/html'});
  response.write(content);
  response.end();
}

function save (books) {
  fs.writeFile('../data/books.json', JSON.stringify(books), function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('this file was saved!');
  });
}

module.exports = http.createServer( (request, response) => {
  var urlParts = request.url.split('?');
  var route = urlParts[0];

  console.log(queryString);

  if (route === '/') {
    response.writeHead( 200, { 'Content-Type': 'text/html' } );
    fs.createReadStream('index.html').pipe(response);
  }

  else if (route === '/books') {
    urlParts = request.url.split('?');
    var queryString = urlParts[1] || '';

    console.log('this\'ll work', queryString);

    //////////////////////// GET ////////////////////////

    if (request.method === 'GET') {
      let title = qv(queryString, 'title');
      if (title != '') {
        books.forEach(book => {
          if (book.title.toLowerCase() == title) {
            sendResponse(200, JSON.stringify(book), response);
          }
        });
        sendResponse(200, `no book with title "${title}" found`, response);
      }
      else {
        sendResponse(200, JSON.stringify(books), response);
      }
    }

    //////////////////////// POST ////////////////////////

    else if (request.method === 'POST') {
      var body = '';
      request.on('data', (data) => {
        body += data;
      });
      request.on('end', () => {

        // LEFT OFF RIGHT HERE, POST IS BODY BUT AS THE KEY FOR AN EMPTY VALUE?

        console.log('body', body);
        var post = qs.parse(body);
        console.log('post', post);
        var book = {
          title : post['title'],
          author : post['author'],
          pubYear : post['pubYear'],
          numPages : post['numPages'],
          rating : post['rating'],
          complete : post['complete'],
          method : post['method']
        };
        console.log('book', book);
        console.log('before', books.length);
        books.push(book);
        console.log('after', books.length);
        save(books);
        sendResponse(200, JSON.stringify(book), response);
      });
    }

    //////////////////////// PUT ////////////////////////

    else if (request.method === 'PUT') {
      sendResponse(400, 'PUT', response);
    }

    //////////////////////// DELETE ////////////////////////

    else if (request.method === 'DELETE') {
      // console.log('one');
      // console.log('queryString', queryString);
      let title = qv(queryString, 'title');
      // console.log('title', title);

      let deleteIndex = -1;
      for (var i = 0; i< books.length; i++) {
        if (books[i].title == title) {
          deleteIndex = i;
        }
      }
      books.remove(deleteIndex);





      sendResponse(200, 'that book has been removed...', response);
    }

    else {
      sendResponse(400, 'not quite...', response);
    }
  }

  else {
    sendResponse(404, '#nah-t found', response);
  }
});
