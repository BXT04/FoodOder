fetch("http://localhost/addcarts.php", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({user_id: 1, product_id: 2, quantity: 3})
}).then(res => res.json()).then(console.log);

fetch("http://localhost/viewcart.php?user_id=1")
  .then(res => res.json())
  .then(console.log);
  
fetch("http://localhost/checkout.php", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({user_id: 1, address: "123 Hà Nội", payment: "COD"})
}).then(res => res.json()).then(console.log);
