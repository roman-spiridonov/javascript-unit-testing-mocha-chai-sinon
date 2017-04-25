"use strict";

const
  fs = require('fs');

function DataLoader() {}

const _p = DataLoader.prototype;

_p.getStudent = function (studentId, cb) {
  let filePath = "./students/" + studentId + ".json";

  fs.readFile(filePath, function (err, data) {
    if (err) {
      if (err.code && "ENOENT" === err.code) {
        throw new Error(`Student ${studentId} does not exist`);
      }
      throw err;
    }

    cb(JSON.parse(data));
  })

};

_p.getStudentSync = function (studentId, cb) {
  let filePath = "./students/" + studentId + ".json";

  return JSON.parse(fs.readFileSync(filePath));
};

module.exports = DataLoader;