// load fft2.js and brain.jpg first

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