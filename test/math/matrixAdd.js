function matrixAdd(m1,m2){
    var w1 = m1.length;
    var h1 = m1[0].length;
    
    var w2 = m2.length;
    var h2 = m2[0].length;
    
    if(w1 != w2 || h1 != h2){
        var message = '\nerror{matrix dimensions should be the same!}';
        error_printToConsole(message);
    }
    
    var output = zeros(w1,h1);
    
    for(var i=0;i<w1;i++){
        for(var j=0;j<h1;j++){
            output[i][j] = m1[i][j] + m2[i][j];
        }
    }
    
    return output;
}