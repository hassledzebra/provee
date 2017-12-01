function rgb2gray(img){
    var r = img[0];
    var g = img[1];
    var b = img[2];
    
    var m = r.length;
    var n = r[0].length;
    
    var output = zeros(m,n);
    for(var i=0;i<m;i++){
        for(var j=0;j<n;j++){
            output[i][j] = 0.29900 * r[i][j] + 0.58700 * g[i][j] + 0.11400 * b[i][j]
        }
    }
    
    return output;
}