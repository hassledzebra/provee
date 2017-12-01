// Name: Turboid Core
// Author: Mohamed Aharrou
// E-mail: mohamed@aharrou.de


function undef(arg){
}

var browserInformation = new function BrowserCheck () {
  var searchBrowserInfo = function () {
    var bname, ver;
    var bs = navigator.userAgent;
    var browserCheck = [ { identification: 'Firefox', name: 'Firefox', version: 'Firefox/\([0-9.]\+\)' },
	     { identification: 'Konqueror', name: 'Konqueror', version: 'Konqueror/\([0-9.]\+\)' },
	     { identification: 'MSIE', name: 'Internet Explorer', version: 'MSIE \([0-9.]\+\)' },
	     { identification: 'Camino', name: 'Camino', version: 'Camino/\([0-9.]\+\)' },
	     { identification: 'Opera', name: 'Opera', version: 'Opera/\([0-9.]\+\)' },
	     { identification: 'Netscape', name: 'Netscape', version: 'Netscape[0-9]\?/\([0-9.]\+\)' },
	     { identification: 'Safari', name: 'Safari', version: 'Safari/\([0-9.]\+\)' },
	     { identification: 'Gecko', name: 'Mozilla', version: 'rv:\([0-9.]+\)' }
	   ];
    var i = 0;
    while (!bname && browserCheck[i]) {
      if (bs.indexOf (browserCheck[i].identification) != -1) {
	bname = browserCheck[i].name;
	if (bs.match (RegExp (browserCheck[i].version)) != -1)
	  ver = RegExp.$1;
      }
      i++;
    }
    return { name: bname || 'unbekannt', version: ver || 'unbekannt' };
  }
  var browser = searchBrowserInfo ();
  this.getBrowserName = function () {
    return browser.name;
  }
  this.getBrowserVersion = function () {
    return browser.version;
  }
};

function browserName(question){
	if(undef(question)){
		if (window.opera)
			return "Opera";
		else if(navigator.userAgent.indexOf("Chrome")>-1)
			return "Chrome";
		else if(navigator.userAgent.indexOf("Netscape")>-1)
			return "Netscape";
		else if(navigator.userAgent.indexOf("MSIE")>-1)
			return 'Internet Explorer';
		else if(navigator.userAgent.indexOf("Safari")>-1 && navigator.userAgent.indexOf("Chrome")==-1)
			return 'Safari';
		else if(navigator.userAgent.indexOf("Firefox")>-1)
			return 'Firefox';
		else if(navigator.userAgent.indexOf("Konqueror")>-1)
			return 'Konqueror';
		else
			return 'unknown';
	} else {
		if((browserInformation.getBrowserName()+" "+browserInformation.getBrowserVersion()).indexOf(question)==0)
			return 1;
		else
			return 0;
	}
}; 	isIE = browserName("Internet Explorer"); isIE6 = browserName("Internet Explorer 6"); isIE7 = browserName("Internet Explorer 7"); isIE8 = browserName("Internet Explorer 8");isIE9=browserName("Internet Explorer 9");
	isFF = browserName("Firefox"); isOpera = browserName("Opera");

function _(elm){

	// ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ 
	// Functions:
	
	var func_isOneOf = function(){
		for(var i = 0; i < this.isOneOf.arguments.length; i++){
			if(this.isOneOf.arguments[i]==elm)
				return 1;
		}
		return 0;
	};
	
	var func_containsOneOf = function(){
		for(var i = 0; i < this.containsOneOf.arguments.length; i++){
			if(elm.indexOf(this.containsOneOf.arguments[i])>=0)
				return 1;
		}
		return 0;
	};
	
	var func_makeEven = function(){
		var num = this.value;
		if(round(num)%2>0){
			num--;
		} 
		return round(num);
	};
	
	var func_isOdd = function(){
		return (this.value%2);
	};
	
	var func_isInt = function(){
		var str = ""+this.value;
		if(str.indexOf(".")>-1)
			return 0;
		else
			return 1;
	};
	
	var func_isArray = function() {
		return !!(elm && elm.constructor == Array);
	}
	
	var func_retFalse = function(){
		return false;
	};
	
	/* Functions (end)
	//\ _ / \ _ / \ _ /\ _ / \ _ / \ _ / \ _ / \ _ / \ _ / \ _ /\ _ / \ _ / \ _ / \ _ /*/
	
	if((typeof elm)=="undefined")
		return undef();

	// Für Numbers:
	if(!isNaN(elm)){
		var retObj = new Object(elm);
		retObj.value = elm;
		retObj.makeEven = func_makeEven;
		retObj.isInt = func_isInt;
		retObj.isOdd = func_isOdd;
		retObj.isOneOf = func_isOneOf;
		retObj.containsOneOf = func_containsOneOf;
		retObj.isHtmlObj = 0;
		retObj.isArray = func_retFalse;
		return retObj;
	}
	
	// Für Strings und Numbers:
	if((typeof elm)=="string"){
		this.isOneOf = func_isOneOf;
		this.containsOneOf = func_containsOneOf;
		this.isArray = func_retFalse;
		this.isHtmlObj = 0;
		return this;
	}

	// Für HTML-Objekte:
	if(elm.nodeType==1){
		elm.isOneOf = func_isOneOf;
		elm.isHtmlObj = 1;
		elm.isArray = func_retFalse;
		if(!elm.isBoosted)
			boostElement(elm);
		return elm;
	}
		
	// Für sonstige Objekte:
	if((typeof elm)=="object"){
		this.isHtmlObj = 0;
		this.isArray = func_isArray;
		return this;
	}		
}
		
Array.prototype.contains = function(value){
	for(var i=0; i < this.length; i++){
		if(this[i]==value){
			return 1;
		}
	}
	return 0;
}


// Function-Prototypes:

Function.prototype.getHead = function(){
	fkt = this + "";
	return fkt.substring(0,fkt.indexOf('{'));
};

Function.prototype.getBody = function(){
	fkt = this + "";
	return fkt.substring(fkt.indexOf("{")+1, fkt.lastIndexOf("}"));
}

Function.prototype.getName = function(){
	fkt = this + "";
	return trimString(fkt.substring(9, fkt.indexOf("(")));
}

Function.prototype.getParameters = function(){
	fkt = this + "";
	return trimString(fkt.substring(fkt.indexOf("(")+1, fkt.indexOf(")")));
}

Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for( key in this ) {
	temp[key] = this[key];
    }
    return temp;
};


Function.prototype.get = function(varName){
	var r = this[varName];
	delete this[varName];
	return r;
}

Function.prototype.isEmpty = function(){
	return (this.getBody().replace(/ /g, "").length<2);
};

		
loop.exit = function(){
	breakedLoops.push(loop.exit.caller);
}; var breakedLoops = [];

				
function loop(fkt,interv,lapsNumber){
	allLoops.push(fkt);
	var doneLaps = 0;
	if(lapsNumber)
		lapsNumber--;	// Sonst macht er eine Runde zu viel.
	if((typeof interv)=="undefined")
		var interv = 1;	// Wenn kein Intervall angegeben ist, dann nimm 1.
	var schl = function(){
		if(!breakedLoops.contains(fkt)){
			if((typeof lapsNumber)=="undefined" || doneLaps<=lapsNumber)
				setTimeout(fkt,1);
			if(_(lapsNumber) && doneLaps>=lapsNumber){
				schl = "";
				breakedLoops.push(fkt);
			}
			setTimeout(schl,interv);
			doneLaps++;
		}
	}; schl();
} var allLoops = [];

loop.then = function(fkt){
	var lastLoop = allLoops[allLoops.length-1];
	var schleife = function(){
		if(breakedLoops.contains(lastLoop)){
			schleife = "";
			setTimeout(fkt,1);
		}
		setTimeout(schleife,1);
	}; schleife();
}

loop.turbo = function(fkt,acc,lapsNumber){
	// ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ / ¯ \ 
	// Acceleration:
	if((typeof acc)=="undefined"){
		var acc = 1;
	}
	if(_(lapsNumber)){
		var additionalLaps = lapsNumber%(10*acc);
		lapsNumber = lapsNumber / (10*acc);
	} else {
		var additionalLaps = 0;
	}
	var origFkt = fkt;
	fkt = function(){
		for(var i = 0; i < (10*acc); i++){
			if(breakedLoops.contains(origFkt)) break;
			origFkt();
		}
	};
	/* Acceleration (end)
	//\ _ / \ _ / \ _ /\ _ / \ _ / \ _ / \ _ / \ _ / \ _ / \ _ /\ _ / \ _ / \ _ / \ _ /*/
	allLoops.push(origFkt);
	var doneLaps = 0;
	if(lapsNumber)
		lapsNumber--;	// Sonst macht er eine Runde zu viel.
	var schl = function(){
		if(!breakedLoops.contains(origFkt)){
			if((typeof lapsNumber)=="undefined" || doneLaps<=lapsNumber)
				setTimeout(fkt,1);
			if(_(lapsNumber) && doneLaps>=lapsNumber){
				schl = "";
				for(var i = 0; i < additionalLaps+1; i++){
					origFkt();
				}
				breakedLoops.push(fkt);
			}
			setTimeout(schl,1);
			doneLaps++;
		}
	}; schl();
}

	
Object.prototype.tempchange = function(varName, val, msec){ 
	var obj = this;
	if((typeof listeningNumbers[varName])=="undefined")
		listeningNumbers[varName] = 0;
	if((typeof obj[varName+"_origVal"])=="undefined")
		obj[varName+"_origVal"] = obj[varName];
	obj[varName] = val;
	listeningNumbers[varName]++;
	setTimeout(function(){
		if(listeningNumbers[varName]==1){
			obj[varName] = obj[varName+"_origVal"];
		}
		listeningNumbers[varName]--;
	},msec);
}; listeningNumbers = {}; var ieService = {   }; window.tempchange = ieService.tempchange;


function from(list, fnc){
	for(var k in list){ if(keyOk(k)){
		fnc(k);
	}}
};


function keyOk(key){
	if(!(key in Object.prototype) && !(key in Array.prototype) && key!="undefined")
		return 1;
	else
		return 0;
}


//¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\/¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\/¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\/¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\/¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\
//	== I N C L U D E - F E A T U R E ==

	function fireOnReadyHandler(scriptName){
		if((typeof include[scriptName].onready)=="function"){
			setTimeout(function(){
				include[scriptName].onready();
				include[scriptName].onready=function(){};
			},100);
		}
	}

	function include(scriptName, pFnc){

		include[scriptName] = {};

		if((typeof pFnc)=="undefined")
			var fnc = function(){};
		else
			var fnc = function(){ availableIncludes.push(scriptName); pFnc();};
			
		if(includes.contains(scriptName)){
			if(availableIncludes.contains(scriptName)){
				fnc();
			} else {
				loop(function(){
					if(availableIncludes.contains(scriptName))
						loop.exit();
				});
				loop.then(function(){
					fnc();
				});
			}
		} else {
			includes.push(scriptName);
			var scriptElm = document.createElement("script");
			scriptElm.setAttribute("language","JavaScript");
			scriptElm.setAttribute("src",scriptName);
			var bd = document.getElementsByTagName("body")[0];
			bd.appendChild(scriptElm);
			// most browsers
			scriptElm.onload = function(){ fireOnReadyHandler(scriptName); fnc();};
			// IE:
			scriptElm.onreadystatechange = function() {
				if(this.readyState == "complete"){
					fireOnReadyHandler(scriptName); 
					fnc();
				}
				if(this.readyState == "loaded"){
					setTimeout(function(){
						fireOnReadyHandler(scriptName); 
						fnc();
					},1000);
				}
			}
		}
	}; var includes = []; var availableIncludes = [];
	

	include.register = function(){
		var args = include.register.arguments;

		for(var i = 0; i < args.length-1; i++){		// Arbeite übergebene Argumente ab
			var retVal, isReady;

			var file = args[args.length-1];		// Letztes Argument ist der Name der Datei mit den Funktionen.
																			// Für jede Funktion wird ihr scheinbares Vorhandensein vorgekaukelt, ...
			window[args[i]] = function(x){ return function(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19){
				var fncName = args[x];											// ... mit einer namensgleichen Funktion, die in Wirklichkeit nur...
																			// ... die Datei mit den echten Funktionen laden soll. Sobald eine der Scheinfunktionen ...
				if(!include.register.files.contains(file)){
					include.register.files.push(file);
					include(file, function(){											// ... dies getan hat, wird sie beim Laden der Datei durch die echte Funktion ja überschrieben.
						retVal = (window[fncName])(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19);// Die echte wird ausgeführt und ihr Rückgabewert gesichert.
						var c = {};
						for(var j = 0; j < args.length-1; j++){								// Jede andere neu geladene Funktion wird so umgeschrieben, ...
							c[args[j]] = window[args[j]].clone();							// ... dass bei ihrem Aufruf ihren Rückgabewert in ihrer Property '.retVal' selbst speichert ...
							window[args[j]] = function(y){ return function(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19){
								window[args[y]].retVal = c[args[y]](p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19);
								var obj = {};										// ... und ein Alibi-Objekt zurückgibt, um die Fortsetzung des Code-Rests ...
								obj.resume = function(fnc){								// ... in [Funktion].resume(...) zu ermöglichen.
					/* setTimeout(function(){ */ fnc();	//},111);
								};
								return obj;
							};}(j);
						}
						isReady = 1;
					});
					var obj = {};							// Die erste aufgerufene der neuen Funktionen gibt für das resuming auch ein Objekt zurück,...
					obj.resume = function(fnc){					// ... muss aber als einzige mit der Ausführung des Resuming-Codes bis zur Fertigladung der Include-Datei warten,..
						include(file, function(){				//  ... da sie es ist, die "sich" erst aus der Datei laden muss und darum nicht sofort bereit steht. (Die Include-Fkt.
							window[fncName].retVal = retVal;		// ... beinhaltet bereits den Warteprozess.)
							fnc();
						});
					};
					return obj;
				} else {
					// Falls schon beim allerersten Mal versucht wird, zwei oder mehr der ausgelagerten Funktionen direkt hintereinander aufzurufen...
					// dann obige Prozedur verhindern, da sonst jede Funktion mindestens doppelt geklont und evtl. vorherige Rückgabewerte überschreiben löschen würde:
					include(file, function(){ 
						window[fncName](p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19).resume(function(){
							isReady = 1;
							//ooo(window[fncName].retVal);
						});
					
					});
					var obj = {};
					obj.resume = function(fnc){
						include(file, function(){
							fnc();
						});
					};
					return obj;
				}
			};}(i);
		}
	}; include.register.files = [];
	
	
/*
\________________/\_________________/\_________________/\_____________________/\____________________/*/

Array.prototype.getKeyAtPoint = function(ind){
	var c=0;
	for(var i in this){
		if(keyOk(i)){
			if(c==ind)
				return(i);
			c++;
		}
	}
};

function getDigits(value){
	var digits = [];
	value = String(value);
	for(var i=0; i<value.length; i++)
		digits.push(parseInt(value.charAt(i)));
	return digits.reverse();	
}
		
		
function randomTo(max){
	var digits = getDigits(max);
	var result = 0;
	for(var i=0; i<digits.length; i++){
		for(var k=0; k<digits[i]; k++){
			result += Math.round(Math.random()*Math.pow(10,i));
		}
	}
	return result;
}
		
function randomString(c){
	var str = "";
	for(var i = 0; i<c; i++){
		str += String.fromCharCode(randomTo(25)+97);
	}
	return str;
}

var scriptTime = 0;


//¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\/¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\/¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\/¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\/¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\
//	== L O O  P     Q U E U E    F E A T U R E ==


	var loopQueueFunctions = [];
	var loopSlowQueueFunctions = [];

	loop(function(){
		for(var k in loopQueueFunctions){ if(keyOk(k)){
			(loopQueueFunctions[k])();
		}}
		for(var k in loopSlowQueueFunctions){ if(keyOk(k)){
			if(isIE){
				if(scriptTime%(62*20)==0)
					(loopSlowQueueFunctions[k])();
			} else {
				if(scriptTime%(50*20)==0)
					(loopSlowQueueFunctions[k])();
			}
		}}
		
	}, 50);


	loop.timer = {};

	loop.timer.add = function(fnc, fncLabel){
		if((typeof fncLabel)=="undefined")
			fncLabel = randomString(4);
		loopQueueFunctions[fncLabel] = fnc;
	};
	
	
	loop.timer.addSlow = function(fnc, fncLabel){
		if((typeof fncLabel)=="undefined")
			fncLabel = randomString(4);
		loopSlowQueueFunctions[fncLabel] = fnc;		
	};

	
	

	loop.timer.drop = function(fncLabel){
		if(!isNaN(fncLabel))
			fncLabel = loopQueueFunctions.getKeyAtPoint(fncLabel);
		if(!isNaN(fncLabel))
			fncLabel = loopSlowQueueFunctions.getKeyAtPoint(fncLabel);
		
		delete loopSlowQueueFunctions[fncLabel];
		delete loopQueueFunctions[fncLabel];
	};


/* 	L O O  P     Q U E U E    F E A T U R E (end)
\________________/\_________________/\_________________/\_____________________/\____________________/*/

loop.timer.add(function(){
	if(isIE)
		scriptTime+=62;
	else
		scriptTime+=50;
	
});