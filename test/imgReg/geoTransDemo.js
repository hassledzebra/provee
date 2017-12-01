//load rigTrans.js and brain.jpg first

var img = imread('../test/brain.jpg');
canvas(img,'../test/newtab.jpg');


var r = rigTrans(img[0],1,0,10,0,1,0);
var g = rigTrans(img[1],1,0,10,0,1,0);
var b = rigTrans(img[2],1,0,10,0,1,0);
var a = img[3];

/*
var r = rigTrans(img[0],1,0,0,1,10,0);
var g = rigTrans(img[1],1,0,0,1,10,0);
var b = rigTrans(img[2],1,0,0,1,10,0);
var a = img[3];
*/


var img2 = [r,g,b,a];
canvas(img2,'../test/newtab1.jpg');