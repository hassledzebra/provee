function checkerboard(img1, img2, ratio, url){
	// img is the array contain all the channels while they are in matrix form
	
	var w1=img1[0][0].length;
	var h1=img1[0].length;
	
	var w2=img2[0][0].length;
	var h2=img2[0].length;
	
	if(w1 != w2 || h1 != h2){
	    var message = '\nerror{ image dimensions are different!}';
		error_printToConsole(message);
	}
	var r1=img1[0];
	var g1=img1[1];
	var b1=img1[2];
	var a1=img1[3];
	
	var r2=img2[0];
	var g2=img2[1];
	var b2=img2[2];
	var a2=img2[3];
	
    var n = Math.floor(w1/ratio);
    var mask = ones(w1,h1);
    for(var i=0;i<w1;i++){
        for(var j=0;j<h1;j++){
            if(Math.floor(i/n) % 2 === 0 && Math.floor(j/n) % 2 === 1){
                mask[i][j] = 0;
            }else if(Math.floor(i/n) % 2 === 1 && Math.floor(j/n) % 2 === 0){
                mask[i][j] = 0;
            }
        }
        
    }
    
    //console.log('mask '+mask)
    //console.log('r1 '+r1)
    var inverseMask = matrixSubstract(ones(w1,h1),mask);
    var r3 = matrixAdd(matrixProduct(mask,r1),matrixProduct(inverseMask,r2));
    var g3 = matrixAdd(matrixProduct(mask,g1),matrixProduct(inverseMask,g2));
    var b3 = matrixAdd(matrixProduct(mask,b1),matrixProduct(inverseMask,b2));
    var a3 = a1;
	
	r3 = matrixToArray(r3);
	g3 = matrixToArray(g3);
	b3 = matrixToArray(b3);
	a3 = matrixToArray(a3);
	
	var tempTab = $("#tab-wrapper2").tabs('getTab',url);
	
	//console.log(tempTab);
	if(tempTab != null){
			var tempTabIndex = $("#tab-wrapper2").tabs('getTabIndex',tempTab);
			$("#tab-wrapper").tabs('select','2');
	}else{
	//console.log([w,h]);
	addOutputTab(url);
	}
	var c=document.getElementById(url);
	var canvOK=1;
	try {c.getContext("2d");}
	catch (er) {canvOK=0; console.log(er.message);}
	if (canvOK==1)
		{
		c.width = w1;
		c.height = h1;
		//c.setAttribute('id',url);
		var ctx = c.getContext("2d");
		//var defaultImageData = ctx.createImageData(w,h);
		//ctx.putImageData(defaultImageData,0,0)
				
		var img3 = mergeRGB(r3,g3,b3,a3,ctx,w1,h1);
		//console.log(img2);
		ctx.putImageData(img3,0,0)
		//var message = "<pre>convas "+url+" loaded.</pre>";
		//$("#consoleOutput").append(message);
		var message = '\nstatus{ canvas '+url+' is loaded.}';
		status_printToConsole(message);
		}
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
function matrixProduct(m1,m2){
    var w1 = m1.length;
    var h1 = m1[0].length;
    
    var w2 = m2.length;
    var h2 = m2[0].length;
    
    if(w1 != w2 || h1 != h2){
        var message = '\nerror{ to do matrixProduct matrix dimensions should be the same!}';
        error_printToConsole(message);
    }
    
    var output = zeros(w1,h1);
    
    for(var i=0;i<w1;i++){
        for(var j=0;j<h1;j++){
            output[i][j] = m1[i][j] * m2[i][j];
        }
    }
    
    return output;
}
function matrixAdd(m1,m2){
    var w1 = m1.length;
    var h1 = m1[0].length;
    
    var w2 = m2.length;
    var h2 = m2[0].length;
    
    if(w1 != w2 || h1 != h2){
        var message = '\nerror{to do matrixAdd matrix dimensions should be the same!}';
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
function matrixSubstract(m1,m2){
    var w1 = m1.length;
    var h1 = m1[0].length;
    
    var w2 = m2.length;
    var h2 = m2[0].length;
    
    if(w1 != w2 || h1 != h2){
        var message = '\nerror{to do matrixSubtract matrix dimensions should be the same!}';
        error_printToConsole(message);
    }
    
    var output = zeros(w1,h1);
    
    for(var i=0;i<w1;i++){
        for(var j=0;j<h1;j++){
            output[i][j] = m1[i][j] - m2[i][j];
        }
    }
    
    return output;
}