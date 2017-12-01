<?php
function deleteDir($dirPath) {
	//chmod ($dirPath, 0766);
	$handle = opendir($dirpath);
    if (! is_dir($dirPath)) {
        throw new InvalidArgumentException("$dirPath must be a directory");
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            self:deleteDir($file);
        } else {
            unlink($file);
        }
    }
	unset($files);
	closedir($handle);
    rmdir($dirPath);
}
$p = $_REQUEST['filePath'];
$root = '../test/';
//chmod ($root,0766); //change the root mode but rooot 
//$last_char = substr($p,-1);
//debug_to_console($last_char);
if(is_dir($p)){
	deleteDir($p);
	}
else{ unlink($p);}
/*
function debug_to_console($data) {
    if(is_array($data) || is_object($data))
	{
		echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
	} else {
		echo("<script>console.log('PHP: ".$data."');</script>");
	}
}
*/


?>