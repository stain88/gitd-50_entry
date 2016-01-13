var DELAY   = 700,
    clicks  = 0,
    timer   = null;

$(function() {
  $('#choicebtn').on("click", function() {
    console.log("button clicked");
  });
  $('#choicebtn').on("dblclick", function() {
    console.log("button doubleclicked");
  });
});