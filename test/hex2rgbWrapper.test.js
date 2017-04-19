const sinon = require('sinon');
const assert = require('assert');
const expect = require('chai').expect;

let hex2rgbWrapper = require('../lib/hex2rgbWrapper');

describe("hex2rgbWrapper - Sinon", function () {
  describe("convert method", function () {
    it("should call parse properly", function (done) {
      sinon.spy(hex2rgbWrapper, "parse");
      hex2rgbWrapper.convert("#fff", (err, rgb) => {
        expect(hex2rgbWrapper.parse.calledOnce).to.be.true;
        expect(hex2rgbWrapper.parse.args[0][0]).to.have.length(6);

        hex2rgbWrapper.parse.restore();
        done();
      });
    });

    it("sbould return the result of parse method", function (done) {
      sinon.stub(hex2rgbWrapper, "parse").returns([0, 0, 200]);

      hex2rgbWrapper.convert("#abc", (err, rgb) => {
        expect(rgb).to.deep.equal([0, 0, 200]);

        hex2rgbWrapper.parse.restore();
        done();
      });

    });

    it("should return an error if the value is not a hex code", function (done) {
      hex2rgbWrapper.convert("blue", (err) => {
        assert(err);
        done();
      });

      // assert.throws(() => hex2rgb("blue"));
      // assert.throws(() => hex2rgb("red"));
      // assert.throws(() => hex2rgb("1234"));
      // assert.throws(() => hex2rgb(1234));
    });

    it("should always pass 6 item array to parse", function (done) {
      let mock = sinon.mock(hex2rgbWrapper);
      mock.expects('parse').twice().withExactArgs("000000".split(''));

      hex2rgbWrapper.convert("#000000", function (err, result) {
        hex2rgbWrapper.convert("#000", function (err, result) {
          mock.verify();
          done();
        });
      });
    });

    it("should return correct rgb value", function (done) {
      hex2rgbWrapper.convert("#fff", (err, rgb) => {
        assert.strictEqual(err, null, "err to be null");
        assert.deepEqual(rgb, [255, 255, 255], "correct value passed to cb");
        done();
      });
    });

  });
});