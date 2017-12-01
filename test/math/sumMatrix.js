function sumMatrix(matrix){
    var m = matrix.length;
    var n = matrix[0].length;
    var output = 0;
    
    for(var i=0;i<m;i++){
        for(var j=0;j<n;j++){
            output += matrix[i][j];
        }
    }
    
    return output;
}