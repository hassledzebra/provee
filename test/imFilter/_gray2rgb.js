function gray2rgb(img){
    // img is a matrix
    var w=img.length;
	var h=img[0].length; // this is opposite to get the matrix coordinates
	
	var a = ones(w,h);
	
	return [gray,gray,gray,a];
}
function ones(m,n){
    var output = [];
    for(var i=0;i<m;i++){
        output[i] = [];
        for(var j=0;j<n;j++){
            output[i][j] = 1;
        }
    }
    return output;
}