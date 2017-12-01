///////////////////////
/* TEST
var a = ones(128,128);
console.log(a)
*/
//////////////////////


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