<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$cartItemId = $data['cart_item_id'];
$quantity = $data['quantity'];

$sql = "UPDATE CartItems SET Quantity = ? WHERE CartItemID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $quantity, $cartItemId);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
