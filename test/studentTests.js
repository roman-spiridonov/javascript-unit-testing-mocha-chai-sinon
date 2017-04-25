'use strict';

const
  expect = require("chai").expect,
  Student = require("../src/student"),
  Course = require("../src/course");

describe("Student", function () {
  let studentName = "John Doe";
  let studentGrade = 5;

  it("should save the info on the student and create an id when created", function () {
    // arrange + act
    let student = Student.create(studentName, studentGrade);
    // assert
    expect(student.name).to.exist;
    expect(student.name).to.equal(studentName);
    expect(student.grade).to.exist;
    expect(student.grade).to.equal(studentGrade);
    expect(student.id).to.exist;
  });

  it("advanceGrade should increase the student's grade by 1", function() {
    // arrange
    // duplication is fine (DAMP) in tests (vs DRY in prod code)
    let student = Student.create(studentName, studentGrade);
    // act
    student.advanceGrade();
    // assert
    expect(student.grade).to.equal(studentGrade+1);

  })

});
