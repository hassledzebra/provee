function imagesc(img,url){
	// img is a matrix
	var w=img[0].length;
	var h=img.length; // this is opposite to get the matrix coordinates
	var gray=matrixToArray(img);
	var a = channelA(w,h);
	
	
	var tempTab = $("#tab-wrapper2").tabs('getTab',url);
	
	//console.log(tempTab);
	if(tempTab !== null){
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
	if (canvOK == 1)
		{
		c.width = w;
		c.height = h;
		//c.setAttribute('id',url);
		var ctx = c.getContext("2d");
		//var defaultImageData = ctx.createImageData(w,h);
		//ctx.putImageData(defaultImageData,0,0)
				
		var img2 = mergeRGB(gray,gray,gray,a,ctx,w,h);
		//console.log(img2);
		ctx.putImageData(img2,0,0)
		//var message = "<pre>convas "+url+" loaded.</pre>";
		//$("#consoleOutput").append(message);
		var message = '\nstatus{ canvas '+url+' is loaded.}';
		status_printToConsole(message);
		}
}
function channelA(m,n){
    var output = [];
    for(var i=0;i<m*n;i++){
        output[i] = 255;
    }
    return output;
}