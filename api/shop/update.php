<?php

$id = $_GET['Id'];
$name = $_GET['name'];
$price = $_GET['price'];
$num = $_GET['num'];

// 连接数据库
$conn = mysqli_connect('localhost', 'root', '123456', 'userdb');

// 设置编码
mysqli_query($conn, "set charset 'utf8'");
mysqli_query($conn, "set character set 'utf8'");

$sql = "update shop set name='$name',price=$price,num=$num where Id=$id";

$res = mysqli_query($conn, $sql);

if ($res) {
  echo json_encode(array(
    "code" => 200,
    "body" => array(
      "msg" => "修改商品成功"
    )
  ));
} else {
  echo json_encode(array(
    "code" => 205,
    "body" => array(
      "msg" => "网络错误，修改失败"
    )
  ));
}



?>