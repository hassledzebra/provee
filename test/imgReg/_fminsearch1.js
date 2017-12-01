fminsearch=function(fun,Parm0,x,y,Opt){// fun = function(x,Parm)
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
        var i = 0;
        var loopfun = function(){
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
                                if(count < 10){
                                    count +=1;
                                }else{
                                    var message = '\nfminsearch finished by reaching minimum!'; 
                                    status_printToConsole(message);
                                    
                                    clearInterval(Interval);
                                    
                                    return P0;
                                }
                                
                        }       
                }
                //if(Opt.display){if(i>(Opt.maxIter-10)){console.log(i+1,funParm(P0),P0)}}
                if(Opt.display){
                    //if(i>(Opt.maxIter-10)){
                        var message1 = '\nstep ' + (i+1) + ': '+ funParm(P0)+ ' '+P0; 
                        status_printToConsole(message1);
                        
                }
                i ++;
                if(i>=Opt.maxIter){
                    clearInterval(Interval);
                }
        };
        // silly multi-univariate screening
        // to do looping using setInterval
        var Interval = setInterval(loopfun,50);
        
        
        /* to do looping using turboid
        loop(loopfun, 50, maxIter);
        loop.then(function(){
            var message2 = '\nfminsearch finished by reaching maxIter!'; 
            status_printToConsole(message2);
        })
        */
        return P0;
};