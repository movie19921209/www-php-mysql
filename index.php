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

/*选取数据库*/
mysqli_select_db($conn,'myDB');
// 创建数据库
/*
$sql = "CREATE DATABASE IF NOT EXISTS myDB";
if (mysqli_query($conn, $sql)) {
    echo "数据库创建成功";
} else {
    echo "Error creating database: " . mysqli_error($conn);
}
*/



/*
$sql = 'DROP DATABASE myDB';
$retval = mysqli_query($conn, $sql);
if(! $retval )
{
  die('删除数据库失败: ' . mysqli_error());
}
echo "数据库 RUNOOB 删除成功\n";
*/
mysqli_close($conn);
?>
</body>
</html>