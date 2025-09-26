<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data["user_id"] ?? 1; 
$productId = $data["product_id"] ?? 0;
$quantity = $data["quantity"] ?? 1;

if (!$productId) {
    echo json_encode(["error" => "Thiếu product_id"]);
    exit();
}

// Kiểm tra giỏ
$result = $conn->query("SELECT CartID FROM Carts WHERE UserID = $userId");
if ($result->num_rows > 0) {
    $cartId = $result->fetch_assoc()["CartID"];
} else {
    $conn->query("INSERT INTO Carts (UserID) VALUES ($userId)");
    $cartId = $conn->insert_id;
}

// Thêm/Update sản phẩm
$result = $conn->query("SELECT * FROM CartItems WHERE CartID = $cartId AND ProductID = $productId");
if ($result->num_rows > 0) {
    $conn->query("UPDATE CartItems SET Quantity = Quantity + $quantity WHERE CartID = $cartId AND ProductID = $productId");
} else {
    $conn->query("INSERT INTO CartItems (CartID, ProductID, Quantity) VALUES ($cartId, $productId, $quantity)");
}

echo json_encode(["message" => "Thêm sản phẩm thành công", "cart_id" => $cartId]);
?>
