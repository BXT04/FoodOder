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
  $id = isset($_GET["id"]) ? intval($_GET["id"]) : intval($data["id"] ?? 0);
  if ($id <= 0) { http_response_code(400); echo json_encode(["error"=>"Missing id"]); exit; }

  $st = $pdo->prepare("DELETE FROM dishes WHERE id=?");
  $st->execute([$id]);

  echo json_encode(["deleted"=>$st->rowCount() > 0]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["error"=>$e->getMessage()]);
}
