<?php

$name = $_REQUEST['name'];

if (!file_exists($name)) {
    mkdir($name, 0755, true);
}

?>