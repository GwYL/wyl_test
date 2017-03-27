<?php
    header("content-type: text/html; charset=utf-8");

    $phone = $_POST["phone"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    
    // 数据库连接
    $conn = mysql_connect("localhost:3306", "root", "");
    if (!$conn)
        die ("数据库连接失败..");
    mysql_select_db("user");
    // mysql_query("set character set 'utf8'");
    // mysql_query("set names 'utf8'");

    // 发送数据插入
    $sql = "INSERT INTO users VALUES(NULL, '$phone', '$password', '$email')";
    $result = mysql_query($sql, $conn);

    // 处理结果
    if ($result)
        echo '{"status":1, "message":"success"}';
    else {
        echo '{"status":0, "message":"'. mysql_error() .'"}';
    }

    // 关闭数据库连接
    mysql_close($conn);
 ?>
