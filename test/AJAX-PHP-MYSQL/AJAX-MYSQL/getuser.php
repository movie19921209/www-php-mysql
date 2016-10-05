<?php
$q=$_GET["q"];

$con = mysqli_connect('localhost','root','');
if (!$con)
{
	die('Could not connect: ' . mysqli_error($con));
}

$sql = "CREATE DATABASE IF NOT EXISTS myDB";
if (mysqli_query($con, $sql)) {
    echo "数据库创建成功";
} else {
    echo "Error creating database: " . mysqli_error($con);
}
echo '<br />';

mysqli_select_db($con,'myDB');

//使用 sql 创建数据表
$sql = "CREATE TABLE IF NOT EXISTS MyGuests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP
)";
if (mysqli_query($con, $sql)) {
    echo "数据表 MyGuests 创建成功";
} else {
    echo "创建数据表错误: " . mysqli_error($con);
}
echo '<br />';



// $sql="SELECT * FROM MyGuests WHERE id = '".$q."'";
$sql="SELECT * FROM MyGuests WHERE id = ".$q;

$result = mysqli_query($con,$sql);

echo "<table border='1'>
<tr>
<th>firstname</th>
<th>lastname</th>
<th>email</th>
<th>reg_date</th>

</tr>";

while($row = mysqli_fetch_array($result))
{
	echo "<tr>";
	echo "<td>" . $row['firstname'] . "</td>";
	echo "<td>" . $row['lastname'] . "</td>";
	echo "<td>" . $row['email'] . "</td>";
	echo "<td>" . $row['reg_date'] . "</td>";
	echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>