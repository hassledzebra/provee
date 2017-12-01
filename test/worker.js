onconnect = function(e){
    //import scripts
	importScripts("https://cdnjs.cloudflare.com/ajax/libs/stacktrace.js/0.6.4/stacktrace.min.js");
	//importScripts("http://hassledzebra.com/creativeImaging/test/_lib.js");
	//global functions
	function imread(url){
	    url = current_fileroot + url;
        var output;
        var index = imageNameArray.indexOf(url);
        if(index > -1 ){
        output = imageDataArray[index];
        return output;
        }else{
            console.error('the image ' + url +' has not been loaded in ini.js yet.' )
        }
        
    }
    function canvas(img,Name){
        var imgData = [];
        imgData[0] = Name;
        imgData[1] = img;
        imgData = JSON.stringify(imgData);
        port.postMessage({img:imgData})
    }
    function imagesc(matrix,Name){
        var w = matrix.length;
        var h = matrix[0].length;
        var imgData = [];
        imgData[0] = Name;
        imgData[1] = [];
        imgData[1][0] = matrix;
        imgData[1][1] = matrix;
        imgData[1][2] = matrix;
        imgData[1][3] = channelA(w,h) // channelA is defined in _lib.js
        imgData = JSON.stringify(imgData);
        port.postMessage({img:imgData}) // still use Canvas function to display image;
        
    }
    
    var fminsearch=function(fun,Parm0,x,y,Opt){// fun = function(x,Parm)
            // example
            //
            // x = [32,37,42,47,52,57,62,67,72,77,82,87,92];y=[749,1525,1947,2201,2380,2537,2671,2758,2803,2943,3007,2979,2992]
            // fun = function(x,P){return x.map(function(xi){return (P[0]+1/(1/(P[1]*(xi-P[2]))+1/P[3]))})}
            // Parms=jmat.fminsearch(fun,[100,30,10,5000],x,y)
            //
            // Another test:
            // x=[32,37,42,47,52,57,62,67,72,77,82,87,92];y=[0,34,59,77,99,114,121,133,146,159,165,173,170];
            //
            // Opt is an object will all other parameters, from the objective function (cost function), to the 
            // number of iterations, initial step vector and the display switch, for example
            // Parms=fminsearch(fun,[100,30,10,5000],x,y,{maxIter:10000,display:false})
            
            if(!Opt){Opt={}};
            if(!Opt.maxIter){Opt.maxIter=1000};
            if(!Opt.step){// initial step is 1/100 of initial value (remember not to use zero in Parm0)
                    Opt.step=Parm0.map(function(p){return p/100});
                    Opt.step=Opt.step.map(function(si){if(si==0){return 1}else{ return si}}); // convert null steps into 1's
            };
            if(typeof(Opt.display)=='undefined'){Opt.display=true};
            if(!Opt.objFun){Opt.objFun=function(y,yp){return y.map(function(yi,i){return Math.pow((yi-yp[i]),2)}).reduce(function(a,b){return a+b})}} //SSD
            
            var cloneVector=function(V){return V.map(function(v){return v})};
            var ya,y0,yb,fP0,fP1;
            var P0=cloneVector(Parm0),P1=cloneVector(Parm0);
            var n = P0.length;
            var step=Opt.step;
            var funParm=function(P){return Opt.objFun(y,fun(x,P))}//function (of Parameters) to minimize
            
            var count = 0;
           for(var i=0;i<Opt.maxIter;i++){
                for(var j=0;j<n;j++){ // take a step for each parameter
                        P1[j]+=step[j];
                        if(funParm(P1)<funParm(P0)){ // if parm value going in the righ direction
                                step[j]=1.2*step[j]; // then go a little faster
                                P0[j]=P1[j];
                                count = 0; // reset the count
                        }
                        else if(funParm(P1)>funParm(P0)){
                                step[j]=-(0.5*step[j]); // otherwiese reverse and go slower
                                P1[j]=P0[j];
                                count = 0;
                        }else{
                                step[j]=-(0.5*step[j]); // otherwiese reverse and go slower
                                P1[j]=P0[j];
                                if(count < 30){
                                    count +=1;
                                }else{
                                    var message = 'fminsearch finished by reaching a minimum'; 
                                    console.log(message);
                                    
                                    return P0;
                                }
                                
                        }       
                }
                    //if(Opt.display){if(i>(Opt.maxIter-10)){console.log(i+1,funParm(P0),P0)}}
                    if(Opt.display){
                        //if(i>(Opt.maxIter-10)){
                            var message1 = 'step ' + (i+1) + ': '+ funParm(P0)+ ' '+P0; 
                            console.log(message1);
                            
                    }
                    
                    if(i>=Opt.maxIter){
                        console.log('fminsearch reached maxIter')
                    }
            };
            
            return P0;
    };
    // global variables
    var current_fileroot;
	var imageNameArray = [];
	var imageDataArray = [];
	var port = e.ports[0];

	var console = {
	  log: function(arguments){
		// send the message back to the main thread
	    var str = '';
	    str = arguments;
		port.postMessage({message:str});
	  },
	  error: function(arguments){
		port.postMessage({error:arguments});
	  },
	  warn: function(arguments){
		port.postMessage({warning:arguments});
	  }
	};
	
	var ajax = function(url, data, callback, type) { // ajax function in web worker
	  var data_array, data_string, idx, req, value;
	  if (data == null) {
		data = {};
	  }
	  if (callback == null) {
		callback = function() {};
	  }
	  if (type == null) {
		//default to a GET request
		type = 'GET';
	  }
	  data_array = [];
	  for (idx in data) {
		value = data[idx];
		data_array.push("" + idx + "=" + value);
	  }
	  data_string = data_array.join("&");
	  req = new XMLHttpRequest();
	  req.open(type, url, false);
	  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  req.onreadystatechange = function() {
		if (req.readyState === 4 && req.status === 200) {
		  return callback(req.responseText);
		}
	  };
	  req.send(data_string);
	  return req;
	};
	
	
	// on connect message
	console.log('Worker is ready!');
	// on message actions
	port.onmessage =  function(e) {
		if(typeof(e.data.current_fileroot) != 'undefined'){
	  		  current_fileroot = e.data.current_fileroot;
	  	}
	  	if(typeof(e.data.scripts) != 'undefined'){
	  		  importScripts(e.data.scripts)
	  		  console.log(e.data.scripts + ' loaded')
	  	}
		// eval code
		if(typeof(e.data.code) != 'undefined'){
		
			var code = e.data.code;
			
			try{
				eval(code)
			}catch(e){
				var trace = printStackTrace({e: e});
				var error = 'Error!\n' + 'Message: ' + e.message + '\nStack trace:\n' + trace.join('\n');
				console.error(error);
			}
			
		}
		if(typeof(e.data.imageData) != 'undefined'){
			
			try{
			var imageData = JSON.parse(e.data.imageData);
			imageNameArray.push(imageData[0]);
			imageDataArray.push(imageData[1]);
			//console.log(imageDataArray);
			}catch(e){
				var trace = printStackTrace({e: e});
				var error = 'Error!\n' + 'Message: ' + e.message + '\nStack trace:\n' + trace.join('\n');
				console.log(error);
			}
		}
		}
		
		port.start();
}
