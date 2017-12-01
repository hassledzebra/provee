<?php
$p = $_REQUEST['filePath'];
if( (!is_dir($p)) && ($p != null)){
	$contents = file_get_contents($p);
	//echo json_encode($contents);
	echo json_encode('tt');
}
?>