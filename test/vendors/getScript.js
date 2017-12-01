/*function getScript(url){
    //rl = "hassledzebra.com/creativeImaging/test/" + url;
    var output='';
        $.get(url,function(data){
       output = data;
       status_printToConsole("success");
    },'html')
    .fail(function(){error_printToConsole("cannot get script content");})
    .done(function(){return output;});
}
*/
// doesn't work because of async issue
jQuery.extend({
    getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'html',
            async: false,
            success: function(data) {
                result = data;
            }
        });
       return result;
    }
});
