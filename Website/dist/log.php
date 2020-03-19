<?php

$db = new SQLite3('./data.db');
$inp = file_get_contents('php://input');
$data = json_decode($inp, true);


// Filter out missing values
$data = array_filter($data, function($value) {
  return ($value !== null && $value !== '');
});
// Replace arrays with strings
foreach ($data as $k => $v) {
  if(is_array($v)) {
    $data[$k] = json_encode($v);
  }
}

// Save to database
$which_form = $data["form"];
unset($data["form"]);
$data["ip"] = $_SERVER['REMOTE_ADDR'];
$keys = '`' . implode('`, `', array_keys($data)) . '`';
$values = "'" . implode("', '", array_values($data)) . "'";

$insert_query = "INSERT INTO $which_form ($keys) VALUES ($values);";
echo $insert_query;
$res = $db->exec($insert_query);
if(!$res){
  echo $db->lastErrorMsg();
  printf("<br><br>\n\nError message: %s\n", mysqli_error($conn));
} else {
  echo "Data logged";
}
?>
