// JavaScript Document
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//loading editors
//general functions
function getElementByRel(rel) {
    aElements = document.getElementsByTagName("link");
    relElems = [];
    for (i = 0; i < aElements.length; i++) {
        if (aElements[i].hasAttribute("rel") && aElements[i].rel == rel) {
             return aElements[i];
        }
    }
}
/*================================================================================
 * @name: bPopup - if you can't get it up, use bPopup
 * @author: (c)Bjoern Klinggaard (twitter@bklinggaard)
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.10.0.min
 ================================================================================*/
 (function(b){b.fn.bPopup=function(z,F){function M(){a.contentContainer=b(a.contentContainer||c);switch(a.content){case "iframe":var d=b('<iframe class="b-iframe" '+a.iframeAttr+"></iframe>");d.appendTo(a.contentContainer);r=c.outerHeight(!0);s=c.outerWidth(!0);A();d.attr("src",a.loadUrl);k(a.loadCallback);break;case "image":A();b("<img />").load(function(){k(a.loadCallback);G(b(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:A(),b('<div class="b-ajax-wrapper"></div>').load(a.loadUrl,a.loadData,function(c,d,e){k(a.loadCallback,d);G(b(this))}).hide().appendTo(a.contentContainer)}}function A(){a.modal&&b('<div class="b-modal '+e+'"></div>').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+t}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);D();c.data("bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?f.scrollLeft()+u:-1*(v+s):l(!(!a.follow[0]&&m||g)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?f.scrollTop()+w:x+-1*r:n(!(!a.follow[1]&&p||g)),"z-index":a.zIndex+t+1}).each(function(){a.appending&&b(this).appendTo(a.appendTo)});H(!0)}function q(){a.modal&&b(".b-modal."+c.data("id")).fadeTo(a.speed,0,function(){b(this).remove()});a.scrollBar||b("html").css("overflow","auto");b(".b-modal."+e).unbind("click");f.unbind("keydown."+e);h.unbind("."+e).data("bPopup",0<h.data("bPopup")-1?h.data("bPopup")-1:null);c.undelegate(".bClose, ."+a.closeClass,"click."+e,q).data("bPopup",null);clearTimeout(I);H();return!1}function J(d){w=y.innerHeight||h.height();u=y.innerWidth||h.width();if(B=E())clearTimeout(K),K=setTimeout(function(){D();d=d||a.followSpeed;c.dequeue().each(function(){g?b(this).css({left:v,top:x}):b(this).animate({left:a.follow[0]?l(!0):"auto",top:a.follow[1]?n(!0):"auto"},d,a.followEasing)})},50)}function G(d){var b=d.width(),e=d.height(),f={};a.contentContainer.css({height:e,width:b});e>=c.height()&&(f.height=c.height());b>=c.width()&&(f.width=c.width());r=c.outerHeight(!0);s=c.outerWidth(!0);D();a.contentContainer.css({height:"auto",width:"auto"});f.left=l(!(!a.follow[0]&&m||g));f.top=n(!(!a.follow[1]&&p||g));c.animate(f,250,function(){d.show();B=E()})}function N(){h.data("bPopup",t);c.delegate(".bClose, ."+a.closeClass,"click."+e,q);a.modalClose&&b(".b-modal."+e).css("cursor","pointer").bind("click",q);O||!a.follow[0]&&!a.follow[1]||h.bind("scroll."+e,function(){B&&c.dequeue().animate({left:a.follow[0]?l(!g):"auto",top:a.follow[1]?n(!g):"auto"},a.followSpeed,a.followEasing)}).bind("resize."+e,function(){J()});a.escClose&&f.bind("keydown."+e,function(a){27==a.which&&q()})}function H(d){function b(e){c.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){L(d)})}switch(d?a.transition:a.transitionClose||a.transition){case "slideIn":b({left:d?l(!(!a.follow[0]&&m||g)):f.scrollLeft()-(s||c.outerWidth(!0))-C});break;case "slideBack":b({left:d?l(!(!a.follow[0]&&m||g)):f.scrollLeft()+u+C});break;case "slideDown":b({top:d?n(!(!a.follow[1]&&p||g)):f.scrollTop()-(r||c.outerHeight(!0))-C});break;case "slideUp":b({top:d?n(!(!a.follow[1]&&p||g)):f.scrollTop()+w+C});break;default:c.stop().fadeTo(a.speed,d?1:0,function(){L(d)})}}function L(b){b?(N(),k(F),a.autoClose&&(I=setTimeout(q,a.autoClose))):(c.hide(),k(a.onClose),a.loadUrl&&(a.contentContainer.empty(),c.css({height:"auto",width:"auto"})))}function l(a){return a?v+f.scrollLeft():v}function n(a){return a?x+f.scrollTop():x}function k(a,e){b.isFunction(a)&&a.call(c,e)}function D(){x=p?a.position[1]:Math.max(0,(w-c.outerHeight(!0))/2-a.amsl);v=m?a.position[0]:(u-c.outerWidth(!0))/2;B=E()}function E(){return w>c.outerHeight(!0)&&u>c.outerWidth(!0)}b.isFunction(z)&&(F=z,z=null);var a=b.extend({},b.fn.bPopup.defaults,z);a.scrollBar||b("html").css("overflow","hidden");var c=this,f=b(document),y=window,h=b(y),w=y.innerHeight||h.height(),u=y.innerWidth||h.width(),O=/OS 6(_\d)+/i.test(navigator.userAgent),C=200,t=0,e,B,p,m,g,x,v,r,s,K,I;c.close=function(){q()};c.reposition=function(a){J(a)};return c.each(function(){b(this).data("bPopup")||(k(a.onOpen),t=(h.data("bPopup")||0)+1,e="__b-popup"+t+"__",p="auto"!==a.position[1],m="auto"!==a.position[0],g="fixed"===a.positionStyle,r=c.outerHeight(!0),s=c.outerWidth(!0),a.loadUrl?M():A())})};b.fn.bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:'scrolling="no" frameborder="0"',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);
 
 
 ////// for image loading
function imload(url){
	var name= url;
	
	var rgba=[];
	var img=document.createElement("img");
	img.setAttribute("src",url);
	
	var imageHolder = document.getElementById("imageHolder");
	imageHolder.appendChild(img);
	
	var c=document.createElement("canvas");
	img.onload = function(){
		var w = img.width;
		var h = img.height;
		c.width = w;
		c.height = h;
				
		var ctx=c.getContext("2d");
		ctx.drawImage(img,0,0,w,h);	
		
		c.setAttribute("id",name);
		
		var canvasHolder = document.getElementById("canvasHolder");
		canvasHolder.appendChild(c);
		
		//var message = '<pre>'+name+' is loaded.</pre>';
		//$("#consoleOutput").append(message);
		var message = '\nstatus{ image '+url+' is loaded.}';
		status_printToConsole(message);
	}
}
function imread(url){
	var c=document.getElementById(url);
	var rgba = getRGBA(c);
	
	//var message = '<pre>'+url+' is read into a matrix.</pre>';
	//$("#consoleOutput").append(message);
	var message = '\nstatus{ image '+url+' is read into a matrix.}';
	status_printToConsole(message);
	return rgba;
}

function getRGBA(c){
		var w = c.width;
		var h = c.height;
		var ctx=c.getContext("2d");
			
		var imageData = ctx.getImageData(0,0,w,h);
		var rgba = splitRGB(imageData.data);
		
	 
		 r = createMatrix(rgba [0],h,w);
		 g = createMatrix(rgba [1],h,w);
		 b = createMatrix(rgba [2],h,w);	
		 a = createMatrix(rgba [3],h,w);	
		
		return [r,g,b,a]
}
function splitRGB(data) {
    var n = data.length / 4,
        r = new Uint8ClampedArray(n),
        g = new Uint8ClampedArray(n),
        b = new Uint8ClampedArray(n),
		a = new Uint8ClampedArray(n),
        i

    for(i = 0; i < n; i++) {
      r[i] = data[4 * i    ]
      g[i] = data[4 * i + 1]
      b[i] = data[4 * i + 2]
	  a[i] = data[4 * i + 3]
    }

    return [r, g, b, a]
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
////// for display of image based on an array;
function canvas(img,url){
	// img is the array contain all the channels while they are in matrix form
	var r=matrixToArray(img[0]);
	var g=matrixToArray(img[1]);
	var b=matrixToArray(img[2]);
	var a=matrixToArray(img[3]);
	
	var w=img[0][0].length;
	var h=img[0].length;
	
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
		c.width = w;
		c.height = h;
		//c.setAttribute('id',url);
		var ctx = c.getContext("2d");
		//var defaultImageData = ctx.createImageData(w,h);
		//ctx.putImageData(defaultImageData,0,0)
				
		var img2 = mergeRGB(r,g,b,a,ctx,w,h);
		//console.log(img2);
		ctx.putImageData(img2,0,0)
		//var message = "<pre>convas "+url+" loaded.</pre>";
		//$("#consoleOutput").append(message);
		var message = '\nstatus{ canvas '+url+' is loaded.}';
		status_printToConsole(message);
		}
}
function addOutputTab(url){
		var content ='<div style="width:100%;height:100%;"><canvas id="'+url+'"></canvas></div>' // different id for different tabs
		
		$('#tab-wrapper2').tabs('add',{
			title:url,
			content:content,
			closable:true
		});
	}
function matrixToArray(matrix){
	var output =[];
	
	var m = matrix.length; // number of rows;
	var n = matrix[0].length; // number of columns;
	
	for(var i=0;i<m;i++){
		for(var j=0;j<n;j++){
			output.push(matrix[i][j]);
		}
	}
	return output;
}
function mergeRGB(r, g, b, a, ctx, w, h) {
    var n = r.length,
        output = ctx.createImageData(w,h),
        i
	
    for(i = 0; i < n; i++) {
      output.data[4 * i    ] = r[i]
      
      output.data[4 * i + 1] = g[i]
      
      output.data[4 * i + 2] = b[i]
	  
	  output.data[4 * i + 3] = a[i]
      
    }
	
    return output; // this is the imageData that can be put into the canvas;
  }
function matrixMultiply(M1,M2){
	// m1 and m2 are matrices
	// this can handle number*matrix (3D), matrix*number(3D); matrix*matrix (2D);
	// check matrix type to be configured;
if(isNaN(M1)&&isNaN(M2)){
	// first, get the dimensions of m1 and m2;
	var M1_m = M1.length; // number of rows
	var M1_n = isNaN(M1[0])? M1[0].length: 0; // number of columns
	
	var M2_m = M2.length; // number of rows
	var M2_n = isNaN(M2[0])? M2[0].length: 0; // number of columns
	
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
}else if(!isNaN(M1)&&!isNaN(M2)){
	var output = M1 * M2;
	return output;
}else if(!isNaN(M1)){
	var M2_m = M2.length; // number of rows
	var M2_n = isNaN(M2[0])? M2[0].length: 0; // number of columns
	var M2_o = isNaN(M2[0][0])? M2[0][0].length: 0; // fourth dimension
	
	var output = [];
	for(var i=0;i<M2_m;i++){
		output[i] = [];
		for(var j=0;j<M2_n;j++){
			output[i][j] = []
			for(var k=0;k<M2_o;k++){
				output[i][j][k]= M1 * M2[i][j][k];
			}
		}
	}
	return output;
}else if(!isNaN(M2)){
	var M1_m = M1.length; // number of rows
	var M1_n = isNaN(M1[0])? M1[0].length: 0; // number of columns
	var M1_o = isNaN(M1[0][0])> 0? M1[0][0].length: 0; // fourth dimension
	
	var output = [];
	for(var i=0;i<M1_m;i++){
		output[i] = [];
		for(var j=0;j<M1_n;j++){
			output[i][j] = []
			for(var k=0;k<M1_o;k++){
				output[i][j][k]= M2 * M1[i][j][k];
			}
		}
	}
	return output;
}

	
}
function matrixDivide(M1,M2){
	// m1 and m2 are matrices
	// this can handle number*matrix (3D), matrix*number(3D); matrix*matrix;
	// check matrix type to be configured;
if(isNaN(M1)&&isNaN(M2)){
	// first, get the dimensions of m1 and m2;
	var M1_m = M1.length; // number of rows
	var M1_n = isNaN(M1[0])? M1[0].length: 0; // number of columns
	
	var M2_m = M2.length; // number of rows
	var M2_n = isNaN(M2[0])> 0? M2[0].length: 0; // number of columns
	
	var output =[];
	
	if (M1_n != M2_m){
		console.log("cannot perform matrix dividing due to dimension issue");
		return false;
	}else{
		for(var i=0;i<M1_m;i++){
			output[i] = [];
			for(var j=0;j<M2_n;j++){
				temp = 0;				
				for(var k=0; k<M1_n;k++){
					temp += M1[i][k]/M2[k][j];
					//console.log("i= "+i+" k= "+k+" j= "+j+" M1ik= "+M1[i][k]+" M2kj= "+M2[k][j]+" temp= "+temp);
				}
				output[i].push(temp);
			}
		}
	
		//console.log(output);
		return output;
	}
}else if(!isNaN(M1)&&!isNaN(M2)){
	var output = M1 * M2;
	return output;
}else if(!isNaN(M1)){
	var M2_m = M2.length; // number of rows
	var M2_n = isNaN(M2[0])? M2[0].length: 0; // number of columns
	var M2_o = isNaN(M2[0][0]) > 0? M2[0][0].length: 0; // fourth dimension
	
	var output = [];
	for(var i=0;i<M2_m;i++){
		output[i] = [];
		for(var j=0;j<M2_n;j++){
			output[i][j] = []
			for(var k=0;k<M2_o;k++){
				output[i][j][k]= M1 / M2[i][j][k];
			}
		}
	}
	return output;
}else if(!isNaN(M2)){
	var M1_m = M1.length; // number of rows
	var M1_n = isNaN(M1[0])? M1[0].length: 0; // number of columns
	var M1_o = isNaN(M1[0][0])? M1[0][0].length: 0; // fourth dimension
	
	var output = [];
	for(var i=0;i<M1_m;i++){
		output[i] = [];
		for(var j=0;j<M1_n;j++){
			output[i][j] = []
			for(var k=0;k<M1_o;k++){
				output[i][j][k]= M2 / M1[i][j][k];
			}
		}
	}
	return output;
}

	
}
// JavaScript Document
// calculate the inverse of a square matrix
function inverseMatrix(input){
	// input is a matrix
	
	var rows = input.length;
	var cols = input[0].length;
	var output = zeros(rows,cols);
	
	var A = [];
		A =input; // make a copy of the input matrix
	var B = identityMatrix (rows,cols); // create an identity matrix
	
	for (var c=0;c<cols;c++){
		var r=c;
		while(r<rows && A[r][c] == 0){
			r++;
		}
		if(r==rows || A[r][c] == 0){
			throw Error('Cannot calculate inverse, determinant is zero');
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
              f = Ar[c]/Ac[c];

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
	  
    output = B;
	
	return output;
	
	
}
function identityMatrix(m,n){
	var output = zeros(m,n);
	for(var i=0; i<m; i++){
		for(var j=0;j<n;j++){
			if(i == j){
				output[i][j] =1;
				//console.log("i: "+i+" j: "+j+" "+output[i][j]);
			}
		}
	}
	
	return output;
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
// require js
function require(url){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;    
	
	document.getElementsByTagName('head')[0].appendChild(script);
	//var message = '<pre>'+url+' is loaded.</pre>';
	//$("#consoleOutput").append(message);
	var message = '\nstatus{ '+url+' is loaded.}';
	status_printToConsole(message)
}
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
	//console.log(r_f_abs);
	var _r_r = createMatrix(r_f_r,w,h);
	var _g_r = createMatrix(r_f_r,w,h);
	var _b_r = createMatrix(r_f_r,w,h);
	
	var _r_i = createMatrix(r_f_i,w,h);
	var _g_i = createMatrix(r_f_i,w,h);
	var _b_i = createMatrix(r_f_i,w,h);
	
	var _r_abs = createMatrix(r_f_abs,w,h);
	var _g_abs = createMatrix(r_f_abs,w,h);
	var _b_abs = createMatrix(r_f_abs,w,h);
	
	
	//var message = "fft performed!";
	//$("#consoleOutput").append(message);
	var message = '\nstatus{ fft2 done}';
    status_printToConsole(message);
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
