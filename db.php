<?php
$servername = "localhost";
$username = "root";   // mặc định của XAMPP
$password = "";       // để trống
$dbname = "FoodOrder";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
?>
