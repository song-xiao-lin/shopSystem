<?php
  //获取前端传过来的值
  $name = $_POST['name'];
  $pwd = $_POST['pwd'];
  //链接数据库
  $conn = mysqli_connect('localhost', 'root', '123456', 'userdb');
  //设置字符集
  mysqli_query($conn, "set charset 'utf8'");
  mysqli_query($conn, "set charactor set 'utf8'");
  //编写sql
  $sql = "select * from user where username='$name' and password='$pwd'";
  //执行sql
  $res = mysqli_query($conn, $sql);
  //计算查找的条数
  $count = mysqli_num_rows($res);
  if($count != 0) {
    echo json_encode(array(
      "code" => 200,
      "body" => array(
        "msg" => "登录成功"
      )
    ));
  } else {
    echo json_encode(array(
      "code" => 202,
      "body" => array(
        "msg" => "用户名或密码错误"
      )
    ));
  }
?>