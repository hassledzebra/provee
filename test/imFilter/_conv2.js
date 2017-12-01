function conv2(matrix, kernel){
 var w = matrix.length;
 var h = matrix[0].length;
 
 var kw = kernel.length;
 var kh = kernel[0].length;
 
 if(kw != kh){
     console.log('kernel dimensions does not match');
 }
 
 var halfSide = Math.floor(kw/2);
 var output = zeros(w,h);
 
 var weight = 0;
 for(var i=0;i<kw;i++){
     for(var j=0;j<kh;j++){
         weight += kernel[i][j];
     }
 }
 
 if(weight === 0){
     weight = 1;
 }else{
     weight = 1/weight;
 }
 for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var sum = 0;
      for (var cy=0; cy<kh; cy++) {
        for (var cx=0; cx<kw; cx++) {
          var scy = Math.min(h-1, Math.max(0, sy + cy - halfSide));
          var scx = Math.min(w-1, Math.max(0, sx + cx - halfSide));
          
          var kn = kernel[cy][cx];
          sum += matrix[scx][scy] * kn;
		  
        }
      }
      
      output[x][y] =sum * weight;
      if(output[x][y]<0){
          output[x][y] =0;
      }else if(output[x][y] > 255){
          output[x][y] = 255;
      }
    }
 }
 
 return output;
}

