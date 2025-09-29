<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$host = "127.0.0.1";
$db   = "food_db";
$user = "root";
$pass = "";
$charset = "utf8mb4";
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
  $pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  ]);
  $stmt = $pdo->query("SELECT * FROM dishes ORDER BY id DESC");
  echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["error"=>$e->getMessage()]);
}
