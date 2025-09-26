<?php
include "db.php";

$userId = $_GET["user_id"] ?? 1;

$sql = "SELECT ci.CartItemID, p.Name, p.Price, ci.Quantity, (p.Price * ci.Quantity) AS Total
        FROM CartItems ci
        JOIN Carts c ON ci.CartID = c.CartID
        JOIN Products p ON ci.ProductID = p.ProductID
        WHERE c.UserID = $userId";

$result = $conn->query($sql);

$cart = [];
while ($row = $result->fetch_assoc()) {
    $cart[] = $row;
}

echo json_encode($cart);
?>
