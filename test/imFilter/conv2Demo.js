// load conv2.js, and Bikesgray.jpg first

var img3 = imread('../test/imFilter/Bikesgray.jpg');
canvas(img3,'../test/newtab2.jpg');
var kernel = [[-1,-2,-1],[0,0,0],[1,2,1]];
var r = conv2(img3[0],kernel);
var g = conv2(img3[1],kernel);
var b = conv2(img3[2],kernel);
var a = img3[3];

var output = [r,g,b,a];
console.log(output)
canvas(output,'../test/newtab3.jpg');