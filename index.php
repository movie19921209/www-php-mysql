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

$sql = "CREATE DATABASE IF NOT EXISTS myDB";
if (mysqli_query($conn, $sql)) {
    echo "数据库创建成功";
} else {
    echo "Error creating database: " . mysqli_error($conn);
}
echo '<br />';



//使用 sql 创建数据表
$sql = "CREATE TABLE IF NOT EXISTS MyGuests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP
)";
if (mysqli_query($conn, $sql)) {
    echo "数据表 MyGuests 创建成功";
} else {
    echo "创建数据表错误: " . mysqli_error($conn);
}
echo '<br />';
/*
//插入单条数据
$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John', 'Doe', 'john@example.com')";
if (mysqli_query($conn, $sql)) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
//插入多条数据
$sql = "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('John1', 'Doe', 'john@example.com');";
$sql .= "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('Mary', 'Moe', 'mary@example.com');";
$sql .= "INSERT INTO MyGuests (firstname, lastname, email)
VALUES ('Julie', 'Dooley', 'julie@example.com')";
if (mysqli_multi_query($conn, $sql)) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
*/

/*
$result = mysqli_query($conn,"SELECT * FROM MyGuests
WHERE firstname='Mary'");
while($row = mysqli_fetch_array($result))
{
	echo $row['firstname'] . " " . $row['lastname'];
	echo "<br>";
}
*/
/*
$result = mysqli_query($conn,"SELECT * FROM MyGuests ORDER BY id");
while($row = mysqli_fetch_array($result))
{
	echo $row['firstname'];
	echo " " . $row['lastname'];
	echo " " . $row['email'];
	echo "<br>";
}
*/

mysqli_query($conn,"UPDATE MyGuests SET email='233nid'
WHERE firstname='Julie' AND lastname='Dooley'");

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