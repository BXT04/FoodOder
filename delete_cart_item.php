<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$cartItemId = $data['cart_item_id'];

$sql = "DELETE FROM CartItems WHERE CartItemID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $cartItemId);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
