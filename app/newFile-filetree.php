<?php
//$p = $_REQUEST['filePath'];
$name = $_REQUEST['name'];
/*if(is_dir($p) || $p == null){
	$fullname = $p + $name +'.js';
}else{
	$dirName = dirname($p); //find parent directory
	$fullname = $dirName + $name + '.js';
}*/
if (!file_exists($name)) {
	$a = fopen($name, 'w');
	fwrite($a, '');
	fclose($a);
	chmod($name, 0766); //This is necessary to configure the permissions
}
?>