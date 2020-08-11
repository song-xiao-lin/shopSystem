<?php
  //获取前端传过来的name和pwd
  $name = $_POST['name'];
  $pwd = $_POST['pwd'];
  $conn = mysqli_connect('localhost', 'root', '123456', 'userdb');
  mysqli_query($conn, "set charset 'utf8");
  mysqli_query($conn, "set charactor set 'utf8");
  $sql = "insert into user (username,password) values ('$name','$pwd')";
  $res = mysqli_query($conn, $sql);
  if ($res) {
    echo json_encode(array(
      "code" => 200,
      "body" => array(
        "msg" => "注册成功"
      )
    ));
  } else {
    echo json_encode(array(
      "code" => 202,
      "body" => array(
        "msg" => "注册失败"
      )
    ));
  }
?>