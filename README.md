![Travis CI status](https://travis-ci.org/roman-spiridonov/javascript-unit-testing-mocha-chai-sinon.svg?branch=master)

This is a fork of the source files for the Tuts+ course: JavaScript Unit Testing With Mocha, Chai and Sinon. 

https://github.com/tutsplus/javascript-unit-testing-mocha-chai-sinon/tree/start

# Notes
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
