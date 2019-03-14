window.onload = function() {
  window.addEventListener('resize', resize, false);
  resize();
};
function resize() {
  // Arcade machine
  var image = document.getElementById("image");
  var imagecontainer = document.getElementById("arcade");
  var height = window.innerHeight;
  var ratio = image.width/image.height;
  var width = height*ratio;
  var left = window.innerWidth/2-width/2;
  var top = window.intterHeight/2-height/2;

  image.style.width = width+"px";
  image.style.height = height+"px";
  imagecontainer.style.left = left+"px";
  imagecontainer.style.top = top+"px";

  // Arcade machine background
  image = document.getElementById("arcadebg");
  imagecontainer = document.getElementById("arcadebgdiv");
  height = window.innerHeight/4*3;
  ratio = image.width/image.height;
  width = height*ratio;
  left = window.innerWidth/2-width/2;
  top = window.innerHeight/2-height/2;

  image.style.width = width+"px";
  image.style.height = height+"px";
  imagecontainer.style.left = left+"px";
  imagecontainer.style.top = top+"px";

  // Canvas
  var canvas = document.getElementById("myCanvas");
  height = window.innerHeight/4*2;
  ratio = canvas.width/canvas.height;
  width = height*ratio;

  canvas.style.width = width+"px";
  canvas.style.height = height+"px";

  // Button
  var button = document.getElementById("turnon");
  left = window.innerWidth/2;
  top = window.innerHeight/12*10.7;
  var padheigth = window.innerHeight/12*1;
  var padwidth = padheigth*ratio;

  button.style.left = left+"px";
  button.style.top = top+"px";
  button.style.padding = padheigth+"px "+padwidth+"px";
}
