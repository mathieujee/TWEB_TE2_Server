let http = require('http');
let assert = require('assert');

let server = require('./index');

/*
You can use any framework that you'd like including express.js.
The only important point is that you should somehow export the
functions to start and stop the server.
Here, we have exported listen(port) and close().
*/

describe('HTTP Server Test', function() {
	// The function passed to before() is called before running the test cases.
	before(function() {
		server.listen(8989);
	});

	// The function passed to after() is called after running the test cases.
	after(function() {
		server.close();
	});

	describe('/', function() {
		it('should be Hello, Mocha!', function(done) {
			http.get('http://127.0.0.1:8989', function(response) {
				// Assert the status code.
				assert.equal(response.statusCode, 200);

                                var body = '';
				response.on('data', function(d) {
					body += d;
				});
				response.on('end', function() {
					// Let's wait until we read the response, and then assert the body
					// is 'Hello, Mocha!'.
					assert.equal(body, 'Hello, Mocha!');
					done();
				});
			});
		});
	});
});