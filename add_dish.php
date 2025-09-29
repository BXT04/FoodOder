<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { http_response_code(200); exit; }

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

  $data = json_decode(file_get_contents("php://input"), true) ?: [];
  $name = trim($data["name"] ?? "");
  $price = isset($data["price"]) ? floatval($data["price"]) : null;
  $category = trim($data["category"] ?? "");
  $status = in_array(($data["status"] ?? "ok"), ["ok","out"]) ? $data["status"] : "ok";
  $image_url = trim($data["image_url"] ?? "");
  $description = trim($data["description"] ?? "");

  if ($name==="" || $price===null || $price<0 || $category==="") {
    http_response_code(422);
    echo json_encode(["error"=>"Validation failed","fields"=>["name","price","category"]]); exit;
  }

  $st = $pdo->prepare("INSERT INTO dishes (name,image_url,description,price,category,status) VALUES (?,?,?,?,?,?)");
  $st->execute([$name,$image_url,$description,$price,$category,$status]);

  $id = (int)$pdo->lastInsertId();
  $st = $pdo->prepare("SELECT * FROM dishes WHERE id=?");
  $st->execute([$id]);
  http_response_code(201);
  echo json_encode($st->fetch(), JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["error"=>$e->getMessage()]);
}
