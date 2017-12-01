/*
TEST:

*/

function normxcor2(m1,m2){
    // m1 and m2 are matrices
    
    var w1 = m1.length;
    var h1 = m1[0].length;
    var w2 = m2.length;
    var h2 = m2[0].length;
    
    if(w1 != w2 || h1 != h2){
	    var message = '\nerror{ image dimensions are different!}';
		error_printToConsole(message);
	}
	
	var m1_ave = averageMatrix(m1);
	var m2_ave = averageMatrix(m2);
	
	var A=0,B=0,C=0;
	
	for(var i=0;i<w1;i++){
	    for(var j=0;j<h1;j++){
	        A = A + (m1[i][j] - m1_ave) * (m2[i][j] - m2_ave);
	        B = B + (m1[i][j] - m1_ave) * (m1[i][j] - m1_ave);
	        C = C + (m2[i][j] - m2_ave) * (m2[i][j] - m2_ave);
	    }
	}
	
	var output = 0;
	output = A/(Math.sqrt(B)*Math.sqrt(C));
	
	return output;
}
function averageMatrix(matrix){
    var m = matrix.length;
    var n = matrix[0].length;
    var output = 0;
    
    for(var i=0;i<m;i++){
        for(var j=0;j<n;j++){
            output += matrix[i][j];
        }
    }
    
    return output/(m*n);
}
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