// version: Dec 9th, 2014;
// author: Zheng Han;
// This function takes an image matrix containg four channels(RGBA); it returns an array
// the first element of the array is the absolute value of fft result, second element is the real channel, third is the imaginary channel;
// example:
/*
    var img = imread(url);
    var fft_img = fft2(img);
    canvas(fft_img);
*/
function fft2(img){
// img is a matrix containing RGBA channel of the image; each channel is a 2d matrix;	
	var w = img[0][0].length,
		h = img[0].length,
		sqrt = Math.sqrt,
		log = Math.log;
	
	var	r = img[0],//r_r = r, r_i = new Uint8ClampedArray(r.length),
		g = img[1],//g_r = g, g_i = new Uint8ClampedArray(g.length),
		b = img[2],//b_r = b, b_i = new Uint8ClampedArray(b.length),
		a = img[3];//a_r = a, a_i = new Uint8ClampedArray(a.length);
		
	var r_r = matrix2Array(r); // I have to convert to normal array for normal image data to do fft2d
	var r_i = zeroArray(w*h);
	var g_r = matrix2Array(g);
	var g_i = zeroArray(w*h);
	var b_r = matrix2Array(b);
	var b_i = zeroArray(w*h);	
				
	
	var r_f = fft2d_core(r_r, r_i,w,h),
		g_f = fft2d_core(g_r, g_i,w,h),
		b_f = fft2d_core(b_r, b_i,w,h);
	 	//a_f = fft2d_core(a_r, a_i,w,h);
	
	var r_f_r = fft2shift(r_f[0],w,h),r_f_i = fft2shift(r_f[1],w,h),
		g_f_r = fft2shift(g_f[0],w,h),g_f_i = fft2shift(g_f[1],w,h),
		b_f_r = fft2shift(b_f[0],w,h),b_f_i = fft2shift(b_f[1],w,h);
		//a_f_r = a_f[0],a_f_i = a_f[1];
		
	var output_r=[],output_i=[],output=[];
	var r_f_abs=[],g_f_abs=[],b_f_abs=[];

	var n = w*h;
	for(var i=0;i<n;i++){
	    r_f_abs[i] = 10*log(1+sqrt(r_f_r[i]*r_f_r[i]+r_f_i[i]*r_f_i[i]));
	    g_f_abs[i] = 10*log(1+sqrt(g_f_r[i]*g_f_r[i]+g_f_i[i]*g_f_i[i]));
	    b_f_abs[i] = 10*log(1+sqrt(b_f_r[i]*b_f_r[i]+b_f_i[i]*b_f_i[i]));
	}
	console.log(r_f_abs);
	var _r_r = createMatrix(r_f_r,w,h);
	var _g_r = createMatrix(r_f_r,w,h);
	var _b_r = createMatrix(r_f_r,w,h);
	
	var _r_i = createMatrix(r_f_i,w,h);
	var _g_i = createMatrix(r_f_i,w,h);
	var _b_i = createMatrix(r_f_i,w,h);
	
	var _r_abs = createMatrix(r_f_abs,w,h);
	var _g_abs = createMatrix(r_f_abs,w,h);
	var _b_abs = createMatrix(r_f_abs,w,h);
	
	
	var message = "fft performed!";
	$("#consoleOutput").append(message);
	return [[_r_abs,_g_abs,_b_abs,a],[_r_r,_g_r,_b_r,a],[_r_i,_g_i,_b_i,a]];	
}

function matrix2Array(input){
	var m = input.length;
	var n = input[0].length;
	var output = [];
	for(var i=0;i<m;i++){
	    for(var j=0;j<n;j++)
	    {
		    output.push(input[i][j]);
	    }
	}
	return output;
}

function zeroArray(length){
	var output = [];
	for(var i=0;i<length;i++){
		output.push(0);
	}
	return output;
}

function fft2d_core(data_r,data_i,w,h){
	 	
	var tdata_x = [],
		tdata_y = [],
		tdata_rx = zeroArray(w),
        tdata_ix = zeroArray(w),
		tdata_ry = zeroArray(h),
        tdata_iy = zeroArray(h),
        i = 0;
      // x-axis
	
      for(var y=0; y<h; y++) {
        i = y*w;
        for(var x1=0; x1<w; x1++) {
          tdata_rx[x1] = data_r[x1 + i];
          tdata_ix[x1] = data_i[x1 + i];
        }
		
        tdata_x = FFT(tdata_rx,tdata_ix); // separate every row as an array and do fft1d
		tdata_rx = tdata_x[0];
        tdata_ix = tdata_x[1];
		
        for(var x2=0; x2<w; x2++) {
          data_r[x2 + i] = tdata_rx[x2];
          data_i[x2 + i] = tdata_ix[x2];
        }
      }
	 
      // y-axis
      for(var x=0; x<w; x++) {
        for(var y1=0; y1<h; y1++) {
          i = x + y1*w;
          tdata_ry[y1] = data_r[i];
          tdata_iy[y1] = data_i[i];
		  }
		
        tdata_y = FFT(tdata_ry,tdata_iy);// separate every column as an array and do fft1d
		tdata_ry = tdata_y[0];
        tdata_iy = tdata_y[1];
		
        for(var y2=0; y2<h; y2++) {
          i = x + y2*w;
          data_r[i] = tdata_ry[y2];
          data_i[i] = tdata_iy[y2];
        }
      }
	
	
	 return [data_r,data_i];
 }
 
function FFT(input_r,input_i, inverse){
	var n = input_r.length;

    if (n & (n - 1)) {
      return FFT_Recursive(input_r,input_i, inverse);
    } else {
      return FFT_Iterative(input_r,input_i, inverse);
    }
}

function FFT_Recursive(input_r,input_i, inverse) {
	//console.log("FFT_Recursive is called")
    var
      n = input_r.length,
      // Counters.
      i, j,
      output_r =zeroArray(n),output_i=zeroArray(n),
      // Complex multiplier and its delta.
      f_r, f_i, del_f_r, del_f_i,
      // Lowest divisor and remainder.
      p, m,
      normalisation,
      recursive_result,
      _swap, _real, _imag;
	  PI = Math.PI;
	//console.log(output_r)
    if (n === 1) {
      return input;
    }

    //output = new ComplexArray(n, input.ArrayType)

    // Use the lowest odd factor, so we are able to use FFT_2_Iterative in the
    // recursive transforms op varoutimally.
    p = LowestOddFactor(n);
    m = n / p;
    normalisation = 1 / Math.sqrt(p);
    var recursive_result_r=[], recursive_result_i=[];

    // Loops go like O(n Σ p_i), where p_i are the prime factors of n.
    // for a power of a prime, p, this reduces to O(n p log_p n)
    for(j = 0; j < p; j++) {
      for(i = 0; i < m; i++) {
        recursive_result_r[i] = input_r[i * p + j];
        recursive_result_i[i] = input_i[i * p + j];
      }
      // Don't go deeper unless necessary to save allocs.
      if (m > 1) {
        recursive_result = FFT(recursive_result_r,recursive_result_i, inverse);
      }

      del_f_r = Math.cos(2*PI*j/n);
      del_f_i = (inverse ? -1 : 1) * Math.sin(2*PI*j/n);
      f_r = 1;
      f_i = 0;

      for(i = 0; i < n; i++) {
        _real = recursive_result_r[i % m];
        _imag = recursive_result_i[i % m];

        output_r[i] += f_r * _real - f_i * _imag;
        output_i[i] += f_r * _imag + f_i * _real;
		//console.log(output_r[i])
        _swap = f_r * del_f_r - f_i * del_f_i;
        f_i = f_r * del_f_i + f_i * del_f_r;
        f_r = _swap;
      }
    }

    // Copy back to input to match FFT_2_Iterative in-placeness
    // TODO: faster way of making this in-place?
    for(i = 0; i < n; i++) {
      //input_r[i] = normalisation * output_r[i]
      //input_i[i] = normalisation * output_i[i]
	  input_r[i] =  output_r[i];
	  input_i[i] =  output_i[i];
    }

    return [input_r,input_i];
}

function LowestOddFactor(n) {
    var factor = 3,
        sqrt_n = Math.sqrt(n)

    while(factor <= sqrt_n) {
      if (n % factor === 0) return factor
      factor = factor + 2
    }
    return n
}

function FFT_Iterative(input_r,input_i,inverse){
	 	var PI = Math.PI,
			cos = Math.cos,
			sin = Math.sin,
			SQRT1_2 = Math.SQRT1_2,
    		sqrt = Math.sqrt;
			
			//console.log(input_r);
		var
		  n = input_r.length,
		  
		  // Counters.
		  i, j,
		  output, output_r, output_i,
		  // Complex multiplier and its delta.
		  f_r, f_i, del_f_r, del_f_i, temp,
		  // Temporary loop variables.
		  l_index, r_index,
		  left_r, left_i, right_r, right_i,
		  // width of each sub-array for which we're iteratively calculating FFT.
		  width;
			
		output_r = BitReverse(input_r); //bit reversal
		output_i = BitReverse(input_i);
		
		//console.log(output_r);
			
	width = 1;
    while (width < n) {
      del_f_r = cos(PI/width);
      del_f_i = (inverse ? -1 : 1) * sin(PI/width);

	  
      for (i = 0; i < n/(2*width); i++) {
        f_r = 1;
        f_i = 0;
		
        for (j = 0; j < width; j++) {
			
          l_index = 2*i*width + j;
          r_index = l_index + width;

          left_r = output_r[l_index];
          left_i = output_i[l_index];
		  
          right_r = f_r * output_r[r_index] - f_i * output_i[r_index];
          right_i = f_i * output_r[r_index] + f_r * output_i[r_index];
		  
		  
		  output_r[l_index] = left_r + right_r;
          output_i[l_index] = left_i + right_i;
          output_r[r_index] = left_r - right_r;
          output_i[r_index] = left_i - right_i;
          temp = f_r * del_f_r - f_i * del_f_i;
          f_i = f_r * del_f_i + f_i * del_f_r;
          f_r = temp;
		  
        }
		
      }
	  
      width <<= 1;
    }
	
	var output_r1=[];
	var output_i1=[];
	for(var i=0;i<n;i++){
		output_r1[i] = output_r[i];
		output_i1[i] = output_i[i];
	}
	//console.log(output_r1);
    return [output_r1,output_i1];
		
}

function BitReverseIndex(index, n) {
    var bitreversed_index = 0;

    while (n > 1) {
      bitreversed_index <<= 1;
      bitreversed_index += index & 1;
      index >>= 1;
      n >>= 1;
    }
    return bitreversed_index;
  
    
}

function BitReverse(array) {
    var n = array.length,
        flips = {},
        swap,
        i;
	//console.log(array);

    for(i = 0; i < n; i++) {
      var r_i = BitReverseIndex(i, n);

      if (flips.hasOwnProperty(i) || flips.hasOwnProperty(r_i)) continue;

      swap = array[r_i];
      array[r_i] = array[i];
      array[i] = swap;

      flips[i] = flips[r_i] = true;
    }
	
	
    return array;
    
}

function fft2shift(input,w,h){
	// only for html canvas image data purpose
	var temp_y = [];
	var half_h = Math.round(h/2); 
	
	for(var i=0;i<half_h;i++){
		for(var j=0;j<w;j++){
			var k=j+i*w;
			temp_y[k] = input[k+half_h*w];
			temp_y[k+half_h*w] = input[k];
		}
	}

	input = temp_y; // swap in y direction
	var temp_x =[];
	var half_w = Math.round(w/2);
	
	for(var i=0;i<h;i++){
		for(var j=0;j<half_w;j++){
			var k=j+i*w;
			temp_x[k] = input[k+half_w];
			temp_x[k+half_w] = input[k];	
		}
	}
	input = temp_x; // swap in x direction
	
	return input;
	
}
