const Course = require("../models/course");

async function getAllCourses() {
  return await Course.findAll();
}

async function getCourseById(id) {
  return await Course.findByPk(id);
}

async function createCourse(courseData) {
  return await Course.create(courseData);
}

async function updateCourse(id, updatedData) {
  const course = await getCourseById(id);
  if (!course) throw new Error("Course not found");
  return await course.update(updatedData);
}

async function deleteCourse(id) {
  const course = await getCourseById(id);
  if (!course) throw new Error("Course not found");
  return await course.destroy();
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
