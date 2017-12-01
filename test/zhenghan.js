// sample code

// 1. This part of code read a image into a matrix containing
// rgba channels; then plot the image in a new output tab;

// first select the brain.jpg and right click-load;
// then run the following code;
//（tip: you can select the code you want to run and 
// click run---run selection;)
var img = imread('../test/brain.jpg');
canvas(img,'../test/newtab.jpg');

// some processing can be made on the image matrix;
var img1 = matrixMultiply(0.5,img);
canvas(img1,'../test/newtab1.jpg');

// 2. do fft of the image
var imgfft = fft2(img);
//console.log(imgfft);
canvas(imgfft[0],'../test/fftimage_abs.jpg');//absolute image
canvas(imgfft[1],'../test/fftimage_real.jpg');//real image
canvas(imgfft[2],'../test/fftimage_imaginary.jpg');//imaginary image

var img3 = imread('../test/Bikesgray.jpg');
canvas(img3,'../test/newtab2.jpg');
var kernel = [[-1,-2,-1],[0,0,0],[1,2,1]];
var r = conv2(img3[0],kernel);
var g = conv2(img3[1],kernel);
var b = conv2(img3[2],kernel);
var a = img3[3];

var output = [r,g,b,a];
console.log(output)
canvas(output,'../test/newtab3.jpg');
