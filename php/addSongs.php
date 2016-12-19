<?php

//echo 'test!';

//host, user, passs, db
$mysqli = new mysqli("localhost", "root", "", "generator_ksb");
if(!$mysqli->connect_errno) {

   //wymuszam utf8
   $mysqli->query("set names 'utf8'");


   $data = $_POST;
   var_dump ($data);
   $keys = array_keys($data);

   $values_empty = array();
   foreach($keys as $k) {
      $values_empty[] = '?';
   }

   $values = array();
   foreach($data as & $d) {
      $values[] = & $d;
   }

   $types = '';
   foreach($keys as $t) {
      $types .= 's';
   }
   $sql = "INSERT INTO songs(".implode(',', $keys).") VALUES (".implode(',',$values_empty).")";
   //echo $sql;
   $insert = $mysqli->prepare($sql);
   //var_dump($insert);
   $params = array_merge(array($types), $values);
   call_user_func_array(array($insert, "bind_param"), $params);

   if($insert->execute()) {
      echo 'ok';
   } else {
      //   echo 'error';
      var_dump ($_POST);
   }

   $insert->close();
}
