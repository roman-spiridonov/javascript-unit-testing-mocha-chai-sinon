'use strict';

const
  uuid = require("uuid"),
  DataLoader = require("./dataLoader");

function Student(dataLoader) {}

Student.create = function (name, grade) {
  let student = new Student();

  student.name = name;
  student.grade = grade;
  student.id = uuid.v4();

  return student;
};

let _p = Student.prototype;

_p.advanceGrade = function () {
  this.grade++;
};

_p.toString = function () {
  return this.id + "\t" + this.name;
};

_p._load = function (studentId) {
  return new Student(dataLoader.getStudentSync(studentId));
};

_p._save = function (studentId) {
  let toSave = {};

  Object.keys(this).forEach((key) => {
    if(key.indexOf("_") !== 0) {
      toSave[key] = this[key];
    }
  });

  return DataLoader.saveStudent(this.id, toSave);
};

module.exports = Student;