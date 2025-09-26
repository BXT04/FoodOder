<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data["user_id"] ?? 1;
$address = $data["address"] ?? "Địa chỉ chưa nhập";
$payment = $data["payment"] ?? "COD";

// Lấy giỏ hàng
$sql = "SELECT ci.ProductID, ci.Quantity, p.Price 
        FROM CartItems ci
        JOIN Carts c ON ci.CartID = c.CartID
        JOIN Products p ON ci.ProductID = p.ProductID
        WHERE c.UserID = $userId";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo json_encode(["error" => "Giỏ hàng trống"]);
    exit();
}

$subtotal = 0;
$orderItems = [];
while ($row = $result->fetch_assoc()) {
    $lineTotal = $row['Price'] * $row['Quantity'];
    $subtotal += $lineTotal;
    $orderItems[] = $row;
}

$shipping = 20000;
$tax = $subtotal * 0.05;
$total = $subtotal + $shipping + $tax;

// Tạo đơn hàng
$conn->query("INSERT INTO Orders (UserID, Subtotal, Shipping, Tax, Total, DeliveryAddress, PaymentMethod)
              VALUES ($userId, $subtotal, $shipping, $tax, $total, '$address', '$payment')");
$orderId = $conn->insert_id;

// Thêm chi tiết đơn hàng
foreach ($orderItems as $item) {
    $pid = $item['ProductID'];
    $qty = $item['Quantity'];
    $price = $item['Price'];
    $lineTotal = $price * $qty;
    $conn->query("INSERT INTO OrderItems (OrderID, ProductID, Quantity, UnitPrice, LineTotal)
                  VALUES ($orderId, $pid, $qty, $price, $lineTotal)");
}

// Xóa giỏ
$conn->query("DELETE ci FROM CartItems ci 
              JOIN Carts c ON ci.CartID = c.CartID 
              WHERE c.UserID = $userId");

echo json_encode(["message" => "Đặt hàng thành công", "order_id" => $orderId, "total" => $total]);
?>
