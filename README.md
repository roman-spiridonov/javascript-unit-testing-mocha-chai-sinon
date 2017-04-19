[![Travis CI status](https://travis-ci.org/roman-spiridonov/javascript-unit-testing-mocha-chai-sinon.svg?branch=master)](https://travis-ci.org/roman-spiridonov/mocha-test)

This is a fork of the source files for the Tuts+ course: JavaScript Unit Testing With Mocha, Chai and Sinon. 

https://github.com/tutsplus/javascript-unit-testing-mocha-chai-sinon/tree/start

# Notes
## Mocha
```
mocha -b  # bail - stop after first failure
mocha -w # watch
mocha -R nyan # reporter
mocha -g hex  # grep certain tests

test/mocha.opts  # default cmd options

describe/it
	.only  # run only this test
	.skip  # skip test
it("")  # pending test

it("should …", function(done) {  # async callback test
	…done(); 
})
```

`Fixture` - fixed data samples that function uses + use together with DI to pass in the fixture or path to it.

Run in browser:
```
$ mocha init browser  # init to browser folder
$ npm run browserify -- test/*.js -o browser/tests.js  # create commonjs bundle for tests
```

A unit-test should test the behavior of its target function.
A function depends on another function or database:
	1) Dependency Injection (DI)
		a. Pass function
		b. Fixtures: pass parameter (e.g. path to database or file) to load fixtures (prepared test data)
	2) Use a mocking library (e.g. Sinon)
	 
## Sinon
Spy - function that records arguments, return value, this, and exception thrown for its calls.

```
let cb = sinon.spy();  // anonymous spy
f(cb);
cb.called, cb.calledOnce, calledWith(1, 2, 3)

sinon.spy(jQuery, "ajax");  // spying on $.ajax
jQuery.ajax.calledOnce
expect(jQuery.ajax.getCall(0).args[0].url).to.be('/some/resource');
jQuery.ajax.restore();  // restore object's initial state

sinon.spy(f);  // spying on function f
f.returnValues[i]  // returned values on i-th call
f.returned(obj) // true if returned obj at least once, uses deep equal - for strict comparison f.returned(sinon.match.same(obj))
```

Stub - spy with pre-programmed behavior (can return certain value or throw an error).

```
let f = sinon.stub.throws("TypeError");  // throws specific type of error
f = sinon.stub.returns(obj);
f = sinon.resolves(value) or .rejects();  // promise that resolves to value
sinon.stub(jQuery, 'ajax').callsFake(func);  // replace $.ajax with func
…
jQuery.ajax.restore();  
```

Fake XMLHttpRequest and Fake server
```
let xhr, requests;
before(function() {
	xhr = sinon.useFakeXMLHttpRequest();
	requests = [];  // each call to xhr => requests[0].url, etc.
	xhr.onCreate = function(req) { requests.push(req); };
});
after( function() { xhr.restore(); } );

it("sends 1 request and passes parsed json to callback", function() {
    let cb = sinon.spy();
    myLib.getCommentsFor("/some/article", cb);
    expect(requests.length).to.be.1;
    requests[0].respond(200, { "Content-Type": "application/json" },  // status, headers, body
        '[{ "id": 12, "comment": "Hey there" }]');
    expect(cb.calledWith([{ "id": 12, comment: "Hey there" }]));
});

let server = sinon.fakeServer.create();
server.respondWith( [method, url, ] response );
server.respond();  // cause all queued requests to receive a response
```

Fake time
```
clock.tick(100);
```

Mocks
```
Mock = spy (fake method with checks) + stub (with pre-programmed behavior) + pre-programmed expectation.
let mock = sinon.mock(obj);
let expectation = mock.expects("method");  
expectation.once().withArgs(arg1, arg2); // all function returns expectation for chaining
…
mock.verify();  // check expectations
mock.restore();
```