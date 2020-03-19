<?php
/* echo get_current_user();*/
$db = new SQLite3('./data.db');
$query = file_get_contents("setup.sql");
$res = $db->exec($query);
if($res){
  echo 'Database created, or already exists.<br>';
} else {
    echo 'Something went wrong';
}
?>
