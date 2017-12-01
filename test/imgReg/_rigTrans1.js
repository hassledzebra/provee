// JavaScript Document
function rigTrans(imageMatrix,a,b,c,d,e,f){
	// imageData is separated channel of imageData which already be turned into matrix
	var m = imageMatrix.length; // number of rows
	var n = imageMatrix[0].length; // number of column
	var imgMap = rigTransMap(a,b,c,d,e,f,m,n);
	var imgMap_ori = imgMap[0];
	var imgMap_def = imgMap[1];
	
	var output = zeros(m,n); //construct a zero matrix of mxn dimensions
	
	for(var i=0;i<m;i++){
		for(var j=0;j<n;j++){
		    
			var original_i = imgMap_ori[i][j][0]; //find where the image pixel at (i,j) mapped to
			var original_j = imgMap_ori[i][j][1];
			//console.log("i:"+deformed_i+"; j:"+deformed_j);
			if(original_i >= 0 && original_i < m && original_j >= 0 && original_j < n){ 
				output[j][i] = imageMatrix[original_j][original_i]; // be careful with j,i
				//output[i][j] = imageMatrix[deformed_i][deformed_j];
			}
		}
	}
	return output;
}
function rigTransMap(a,b,c,d,e,f,m,n){
	
	// m: nunber of rows of the image data; n: number of columns of the image data;
	
	var arrayTrans = [a,b,c,d,e,f,0,0,1];
	var matrixTrans = createMatrix(arrayTrans,3,3); //3x3 matrix
	var matrixTrans_inv = inverseMatrix(matrixTrans);

	var mapOriginal = [];
	var mapDeformed = [];
	
	for(var i=0;i<m;i++){
		 mapOriginal[i] =[];
		 mapDeformed[i] =[];
		 for(var j=0;j<n;j++){
		     
		     mapOriginal[i][j] =[];
			 mapDeformed[i][j] =[];
			 mapDeformed[i][j][0] = i;
			 mapDeformed[i][j][1] = j;
			 
			 var coordinate_deformed = [[i],[j],[1]]; //3x1 matrix
			 var coordinate_original = [];
			 
			 
			 coordinate_original = matrixMultiply(matrixTrans_inv,coordinate_deformed); //3x3 * 3x1 = 3x1 affine transform

			 mapOriginal[i][j][0] = Math.floor(coordinate_original[0][0]); // nearest neighbor;
			 mapOriginal[i][j][1] = Math.floor(coordinate_original[1][0]);
		 }
	}
	
	var output =[];
	output[0] = mapOriginal;
	output[1] = mapDeformed;
	//console.log(output[0]);
	return output;
	
}
function createMatrix(input, m, n){
	// input is the input array; m and n are the dimensions of the matrix;
	if(input.length != m*n) {
		console.log("the input array length and dimensions are not consistent");
	}
	var output = [];
	for(var i=0; i<m; i++){
		output[i] = [];
		for(var j=0; j<n; j++){
			var k = n*i + j;
			output[i].push(input[k]);
		}
	}
	return output
}
function matrixMultiply(M1,M2){
	// m1 and m2 are matrices
	
	// check matrix type to be configured;
	
	// first, get the dimensions of m1 and m2;
	var M1_m = M1.length; // number of rows
	var M1_n = M1[0].length>0? M1[0].length : 1; // number of columns
	
	var M2_m = M2.length; // number of rows
	var M2_n = M2[0].length>0? M2[0].length : 1; // number of columns
	
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