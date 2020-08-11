<?php

$name = $_GET['name'];
$price = $_GET['price'];
$num = $_GET['num'];

// 连接数据库
$conn = mysqli_connect('localhost', 'root', '123456', 'userdb');

// 设置编码
mysqli_query($conn, "set charset 'utf8'");
mysqli_query($conn, "set character set 'utf8'");

$sql = "insert into shop (name,price,num) values ('$name',$price,$num)";

$res = mysqli_query($conn, $sql);

if ($res) {
  echo json_encode(array(
    "code" => 200,
    "body" => array(
      "msg" => "添加成功"
    )
  ));
} else {
  echo json_encode(array(
    "code" => 205,
    "body" => array(
      "msg" => "网络错误，添加失败"
    )
  ));
}

?>