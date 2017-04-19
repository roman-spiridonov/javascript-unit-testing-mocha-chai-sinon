function Hex2rgbWrapper() {

  this.convert = function (hex, cb) {
    setTimeout(() => {
      if (/^#/.test(hex)) {
        hex = hex.slice(1);
      }

      let invalid = this.isInvalid(hex);
      if (invalid) {
        return cb(new Error(invalid.reason));
      }

      let nums = this.arrayify(hex);
      let result;
      try {
        result = this.parse(nums);
      } catch (err) {
        cb(err);
      }

      cb(null, result);
    });
  };

  this.isInvalid = function (hex) {
    if (hex.length !== 3 && hex.length !== 6) {
      return {reason: "Invalid number of characters"}
    }

  };

  this.arrayify = function (hex) {
    let nums = hex.split("");
    if (nums.length === 3) {
      nums = [nums[0], nums[0], nums[1], nums[1], nums[2], nums[2]];
    }
    return nums;
  };

  this.parse = function (nums) {
    let r = parseInt([nums[0], nums[1]].join(""), 16);
    let g = parseInt([nums[4], nums[5]].join(""), 16);
    let b = parseInt([nums[2], nums[3]].join(""), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      throw new Error("Invalid hexadecimal string");
    }

    return [r, g, b];
  }
}

module.exports = new Hex2rgbWrapper();