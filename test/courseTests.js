'use strict';

const
  expect = require("chai").expect,
  Student = require("../src/student"),
  Course = require("../src/course");

describe("Course", function () {
  let courseName = "Test Course",
    courseCode = "TC 001",
    courseDesc = "Test Course description",
    student;

  beforeEach(function () {
    student = Student.create("John Doe", 5);
  });

  it('constructor should create empty array of students', function () {
    let course = Course.create(courseName, courseCode, courseDesc);
    expect(course.students).eql([]);  // deep equal
  });

  describe("registerStudent", function () {
    it("should add studnet to the students array", function () {
      let course = Course.create(courseName, courseCode, courseDesc);

      course.registerStudent(student);
      expect(course.students.length).to.equal(1);
      expect(course.students[0].id).to.equal(student.id);
    })
  });

  describe("unregisterStudent", function () {
    it("should throw an error when unregistering a student who was not registered before", function () {
      let course = Course.create(courseName, courseCode, courseDesc);
      expect(() => {
        course.unregisterStudent(student.id);
      }).to.throw();

    });

  });
});
