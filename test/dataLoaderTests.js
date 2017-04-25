"use strict";

const
  expect = require("chai").expect,
  Student = require("../src/student"),
  Course = require("../src/course"),
  DataLoader = require("../src/dataLoader");

let dataLoader = new DataLoader();

describe("DataLoader", function () {
  it("getStudent: gets a student async", function(done) {
    dataLoader.getStudent(1, function(student) {
      expect(student).to.exist;
      expect(student.id).to.equal(1);
      done();
    })
  })
});
