<?php
$con= mysqli_connect("bfhteyl6gcdmae50dlpj-mysql.services.clever-cloud.com","uqh80ihrfhpkjyea","CyoWbgdTgo5rAhShIRb6","bfhteyl6gcdmae50dlpj") or die("Error: " . mysqli_error($con));
mysqli_query($con, "SET NAMES 'utf8' ");
error_reporting( error_reporting() & ~E_NOTICE );
date_default_timezone_set('Asia/Bangkok');
?>