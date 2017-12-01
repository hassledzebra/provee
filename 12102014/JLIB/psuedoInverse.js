// JavaScript Document
function pseudoInverse(input){
	// input is a mxn matrix
	var m=input.length;
	var n=input[0].length;
	
	var output = zeros(n,m);
	var input_t = matrixTranspose(input);
	
	if(m>=n){
		
		temp = matrixMultiply(input_t,input);
		temp = inverseMatrix(temp);
		output = matrixMultiply(temp,input_t);
	}else{
			
		var temp = matrixMultiply(input,input_t);
		var temp = inverseMatrix(temp); 
		output = matrixMultiply(input_t,temp);
	}
	
	return output;
	
}
function matrixTranspose(input){
	var m=input.length;
	var n=input[0].length;
	
	var output = zeros(n,m);
	
	for(var i=0;i<n;i++){
		for(var j=0;j<m;j++){
			output[i][j] = input[j][i];
		}
	}
	return output;
}

// calculate the inverse of a square matrix
function inverseMatrix(input){
	// input is a matrix
	var rows = input.length;
	var cols = input[0].length;
	var output = zeros(rows,cols);
	//console.log(input);
	
	var A = input; // make a copy of the input matrix
	var B = identityMatrix (rows,cols); // create an identity matrix
		
	if (rows == 1) {
      // this is a 1 x 1 matrix
      value = input[0][0];
      if (value == 0) {
        throw Error('Cannot calculate inverse, determinant is zero');
      }
      return [[
        1/value
      ]];
    }
    else if (rows == 2) {
      // this is a 2 x 2 matrix
      var d = input[0][0]*input[1][1]-input[0][1]*input[1][0];
      if (d == 0) {
        throw Error('Cannot calculate inverse, determinant is zero');
      }
      return [
        [
          input[1][1]/ d,
          -input[0][1]/ d
        ],
        [
          -input[1][0]/ d,
          input[0][0]/ d
        ]
      ];
    }
    else {
		
	for (var c=0;c<cols;c++){
		var r=c;
		while(r<rows && A[r][c] == 0){
			r++;
		}
		
		if(r==rows || A[r][c] == 0){
			throw Error('Cannot calculate inverse, determinant is zero');
			//console.log("r:"+r+"c:"+c)
			//console.log(A[r][c])
		}
		
		if(r!=c){
		  temp = A[c]; A[c] = A[r]; A[r] = temp;
          temp = B[c]; B[c] = B[r]; B[r] = temp;
		}
		
		// eliminate non-zero values on the other rows at column c
        var Ac = A[c],
            Bc = B[c];
			
        for (r = 0; r < rows; r++) {
          var Ar = A[r],
              Br = B[r];
          if(r != c) {
            // eliminate value at column c and row r
            if (Ar[c] != 0) {
              var f = Ar[c]/Ac[c];

              // add (f * row c) to row r to eliminate the value
              // at column c
              for (s = c; s < cols; s++) {
                Ar[s] = Ar[s] - f * Ac[s];
              }
              for (s = 0; s < cols; s++) {
                Br[s] = Br[s] - f * Bc[s];
              }
            }
          }
          else {
            // normalize value at Acc to 1,
            // divide each value on row r with the value at Accvar 
            f = Ac[c];
            for (s = c; s < cols; s++) {
              Ar[s] = Ar[s] / f;
            }
            for (s = 0; s < cols; s++) {
              Br[s] = Br[s] / f;
            }
          }
        }
		
      }
	  
      return B;
	}

}
function zeros(m,n){
	var output = [];
	for(var i=0;i<m;i++){
		output[i] = [];
		for(var j=0;j<n;j++){
			output[i].push(0);
		}
	}
	
	return output;
}
function identityMatrix(m,n){
	var output = zeros(m,n);
	for(var i=0; i<m; i++){
		for(var j=0;j<n;j++){
			output[0][0]=1;
			if(i = j){
				output[i][j] =1;
			}
		}
	}
	
	return output;
}
function matrixMultiply(M1,M2){
	// m1 and m2 are matrices
	
	// check matrix type to be configured;
	
	// first, get the dimensions of m1 and m2;
	var M1_m = M1.length; // number of rows
	var M1_n = M1[0].length; // number of columns
	
	var M2_m = M2.length; // number of rows
	var M2_n = M2[0].length; // number of columns
	
	var output =[];
	
	if (M1_n != M2_m){
		console.log("cannot perform matrix multiplication due to dimension issue");
		return false;
	}else{
		for(var i=0;i<M1_m;i++){
			output[i] = [];
			for(var j=0;j<M2_n;j++){
				temp = 0;				
				for(var k=0; k<M1_n;k++){
					temp += M1[i][k]*M2[k][j];
					//console.log("i= "+i+" k= "+k+" j= "+j+" M1ik= "+M1[i][k]+" M2kj= "+M2[k][j]+" temp= "+temp);
				}
				output[i].push(temp);
			}
		}
		//console.log(output);
		return output;
	}
	
}