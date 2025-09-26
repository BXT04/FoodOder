<?php
include 'db.php';

// Lấy giỏ hàng của UserID = 1 (test)
$sql = "SELECT ProductName, Price, Quantity, ImageURL 
        FROM CartItems 
        WHERE CartID = 1";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Giỏ hàng</title>
  <link rel="stylesheet" href="giohang.css">
</head>
<body>
<header class="header">
  <div class="logo">Food Order</div>
  <nav class="menu">
    <a href="#">Shop</a>
    <a href="#">Newsstand</a>
    <a href="#">Who we are</a>
    <a href="#">My profile</a>
  </nav>
  <button class="cart-btn">Giỏ Hàng</button>
</header>

<main class="container">
  <h1>Giỏ Hàng</h1>
  <div class="cart-layout">

    <!-- Danh sách sản phẩm -->
    <section class="cart-items">
      <?php
      $subtotal = 0;
      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $total = $row["Price"] * $row["Quantity"];
          $subtotal += $total;

          echo "<div class='cart-item'>
                  <img src='".$row["ImageURL"]."' alt='".$row["ProductName"]."' class='product-img'>
                  <div class='info'>
                    <h3>".$row["ProductName"]."</h3>
                    <p>".number_format($row["Price"], 0, ',', '.')."đ / SP</p>
                    <div>Số lượng: ".$row["Quantity"]."</div>
                  </div>
                  <div class='price'>".number_format($total, 0, ',', '.')."đ</div>
                </div>";
        }
      } else {
        echo "<p>Giỏ hàng trống!</p>";
      }
      ?>
    </section>

    <!-- Tổng cộng -->
    <aside class="summary">
      <h2>Tổng cộng đơn</h2>
      <p>Subtotal: <span><?php echo number_format($subtotal, 0, ',', '.'); ?>đ</span></p>
      <p>Shipping: <span>20.000đ</span></p>
      <p>Tax: <span>10.000đ</span></p>
      <p class="total">Total: 
        <span><?php echo number_format($subtotal + 20000 + 10000, 0, ',', '.'); ?>đ</span>
      </p>
      <button class="checkout-btn">Tiếp Tục Thanh Toán →</button>
    </aside>
  </div>
</main>
</body>
</html>
