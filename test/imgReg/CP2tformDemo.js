//load atlas.jpg, brain.jpg, CP2tform, checkerboard, and rigTrans1

var atlas = imread('../test/atlas.jpg')
canvas(atlas,'../test/atlas.jpg');

var brain = imread('../test/brain.jpg')
canvas(brain,'../test/brain.jpg');

var warp = [[152,88],[104,78],[71,115],[100,115]];
var unwarp = [[153,121],[113,107],[71,134],[98,147]];

var tform = CP2tform(warp, unwarp);

var a1=tform[0][0];
var a2=tform[0][1];
var a3=tform[0][2];
var b1=tform[1][0];
var b2=tform[1][1];
var b3=tform[1][2];

var r_def = rigTrans(atlas[0],a1,a2,a3,b1,b2,b3);
var g_def = rigTrans(atlas[1],a1,a2,a3,b1,b2,b3);
var b_def = rigTrans(atlas[2],a1,a2,a3,b1,b2,b3);
var a_def = atlas[3]

var atlas_def = [r_def, g_def, b_def, a_def];
canvas(atlas_def,'../test/atlas_def.jpg');

checkerboard(atlas_def, brain, 5, '../test/checkerboard.jpg');