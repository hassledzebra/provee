
// This one is wrong. Didn't use inverse way

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
			var deformed_i = imgMap_def[i][j][0]; //find where the image pixel at (i,j) mapped to
			var deformed_j = imgMap_def[i][j][1];
			//console.log("i:"+deformed_i+"; j:"+deformed_j);
			if(deformed_i >= 0 && deformed_i < m && deformed_j >= 0 && deformed_j < n){ 
				output[deformed_j][deformed_i] = imageMatrix[j][i]; // be careful with j,i
				//output[i][j] = imageMatrix[deformed_i][deformed_j];
			}
		}
	}
	return output;
}
function rigTransMap(a,b,c,d,e,f,m,n){
	
	// m: nunber of rows of the image data; n: number of columns of the image data;
	var sin = Math.sin;
	var cos = Math.cos;
	
	var arrayTrans = [a,b,c,d,e,f,0,0,1];
	//var arrayTrans = [a,b,0,c,d,0,e,f,1];
	var matrixTrans = createMatrix(arrayTrans,3,3); //3x3 matrix
	//console.log(matrixTrans);
	
	var mapOriginal = [];
	var mapDeformed = [];
	
	for(var i=0;i<m;i++){
		 mapOriginal[i] =[];
		 mapDeformed[i] =[];
		 for(var j=0;j<n;j++){
			 mapOriginal[i][j] =[];
			 mapDeformed[i][j] =[];
			 mapOriginal[i][j][0] = i;
			 mapOriginal[i][j][1] = j;
			 
			 var coordinate_original = [[i],[j],[1]]; //3x1 matrix
			 //var coordinate_original = [[i,j,1]]; //1x3 matrix
			 var coordinate_deformed = [];
			 
			 coordinate_deformed = matrixMultiply(matrixTrans,coordinate_original); //3x3 * 3x1 = 3x1 affine transform
			 //coordinate_deformed = matrixMultiply(coordinate_original,matrixTrans); //1x3 * 3x3 = 1x3 affine transform
			 //console.log(coordinate_original);
			 //console.log(coordinate_deformed);			 
			 
			 mapDeformed[i][j][0] = Math.floor(coordinate_deformed[0][0]); // nearest neighbor;
			 mapDeformed[i][j][1] = Math.floor(coordinate_deformed[1][0]);
			 
			 //mapDeformed[i][j][0] = Math.floor(coordinate_deformed[0][0]); // nearest neighbor;
			 //mapDeformed[i][j][1] = Math.floor(coordinate_deformed[0][1]);
			 
		 }
	}
	
	var output =[];
	output[0] = mapOriginal;
	output[1] = mapDeformed;
	//console.log(output[1]);
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
