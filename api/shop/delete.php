<?php

$id = $_GET['id'];

// 从所有商品从数据库里取出来响应给前端
$con = mysqli_connect('localhost', 'root', '123456', 'userdb');

// 设置编码
mysqli_query($con, "set charset 'utf8'");
mysqli_query($con, "set character set 'utf8'");

$sql = "delete from shop where Id=$id";

$res = mysqli_query($con, $sql);

if ($res) {
  // 删除成功
  echo json_encode(array(
    "code" => 200,
    "body" => array(
      "msg" => "删除商品成功"
    )
  ));
} else {
  echo json_encode(array(
    "code" => 0,
    "body" => array(
      "msg" => "网络错误，请重试"
    )
  ));
}

?>