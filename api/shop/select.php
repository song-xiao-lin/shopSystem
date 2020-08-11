<?php

// 查询所有数据返回给前端
// 连接数据库
$conn = mysqli_connect('localhost', 'root', '123456', 'userdb');

// 设置编码
mysqli_query($conn, "set charset 'utf8'");
mysqli_query($conn, "set character set 'utf8'");

// 书写sql语句
$sql = "select * from shop order by Id";

$res = mysqli_query($conn, $sql);

$list = array();
while ($row = mysqli_fetch_assoc($res)) {
  array_push($list, $row);
}

echo json_encode(array(
  "code" => 200,
  "body" => array(
    "list" => $list
  )
));

?>