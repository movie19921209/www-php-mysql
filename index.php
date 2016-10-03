<html>
<head>
<meta charset="utf-8"> 
<title>创建 MySQL 数据库</title>
</head>
<body>
<?php
$servername = "localhost";
$username = "root";
$password = "";

// 创建连接
$conn = mysqli_connect($servername, $username, $password);
// 检测连接
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
echo "connect successful!";
echo '连接成功<br />';
// 创建数据库
$sql = "CREATE DATABASE IF NOT EXISTS myDB";
if (mysqli_query($conn, $sql)) {
    echo "数据库创建成功";
} else {
    echo "Error creating database: " . mysqli_error($conn);
}


mysqli_close($conn);
?>
</body>
</html>