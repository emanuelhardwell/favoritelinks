/*  */
const timeago = require("timeago.js");

const helpers = {};

helpers.timeago = (timestamp) => {
  /*  console.log(timestamp); */
  return timeago.format(timestamp);
};

module.exports = helpers;
