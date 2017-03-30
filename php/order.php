<?php
    header("content-type: text/html; charset=utf-8");

    $username = $_POST["username"];
    $area = $_POST["area"];
    $province = $_POST["province"];
    $city = $_POST["city"];
    $district = $_POST["district"];
    $tel = $_POST["tel"];

    // 数据库连接
    $conn = mysql_connect("localhost:3306", "root", "");
    if (!$conn)
        die ("数据库连接失败..");
    mysql_select_db("user");
    mysql_query("set character set 'utf8'");
    mysql_query("set names 'utf8'");

    // 发送数据插入
    $sql = "INSERT INTO address VALUES(NULL, default, '$username', '$area', '$province', '$city', '$district', '$tel')";
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
