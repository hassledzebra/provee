//load normxcor2s.js, rigTrans1, and brain.jpg, imagesc, fminsearch1, gray2rgb first

var img = imread('../test/brain.jpg');
canvas(img,'../test/newtab.jpg');

var gray = rgb2gray(img);
imagesc(gray,'../test/gray.jpg');
var gray1 = rigTrans(gray,1,0.2,0,0,1,0);
imagesc(gray1,'../test/gray1.jpg');


var c1 = normxcor2(gray,gray1);
var c2 = normxcor2(gray,gray);
console.log(c1);
console.log(c2);

var fun = function(gray1,p){
    var a = p[0], b = p[1], c = p[2], d = p[3], e = p[4], f = p[5];
    //console.log(gray);
    var gray_move = rigTrans(gray1,a,b,c,d,e,f);
    //var cost = 1 - normxcor2(gray,gray_move);
    //return cost;
    return gray_move;
};

var objFun = function(y,yp){
    return 1-normxcor2(y,yp);
};
var P = fminsearch(fun, [1,0,0,0,1,0],gray1,gray,{objFun: objFun, maxIter: 50 });
console.log(P);
//---select run this again

var gray2 = rigTrans(gray1,P[0],P[1],P[2],P[3],P[4],P[5]);
var img2 = gray2rgb(gray2);

imagesc(gray2,'../test/gray2.jpg');
checkerboard(img,img2,5,'../test/checkerboard.jpg');
