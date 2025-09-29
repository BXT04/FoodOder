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

  // id có thể truyền qua ?id= hoặc trong JSON
  $id = isset($_GET["id"]) ? intval($_GET["id"]) : 0;
  $data = json_decode(file_get_contents("php://input"), true) ?: [];
  if (!$id && isset($data["id"])) $id = intval($data["id"]);
  if ($id <= 0) { http_response_code(400); echo json_encode(["error"=>"Missing id"]); exit; }

  // kiểm tra tồn tại
  $chk = $pdo->prepare("SELECT id FROM dishes WHERE id=?");
  $chk->execute([$id]);
  if (!$chk->fetch()) { http_response_code(404); echo json_encode(["error"=>"Not found"]); exit; }

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

  $st = $pdo->prepare("UPDATE dishes SET name=?, image_url=?, description=?, price=?, category=?, status=? WHERE id=?");
  $st->execute([$name,$image_url,$description,$price,$category,$status,$id]);

  $st = $pdo->prepare("SELECT * FROM dishes WHERE id=?");
  $st->execute([$id]);
  echo json_encode($st->fetch(), JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["error"=>$e->getMessage()]);
}
