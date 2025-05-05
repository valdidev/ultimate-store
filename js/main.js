// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  Sales.loadSalesData();
  Stock.loadLowStockProducts();
  Orders.loadOrderDetails();
  Products.loadAllProducts();

  // Event listener for updating order status
  document
    .getElementById("update-status-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const orderId = document.getElementById("order-id").value;
      const newStatus = document.getElementById("new-status").value;
      Orders.updateOrderStatus(orderId, newStatus);
      this.reset();
    });

  // Event listener for adding a product to an order
  document
    .getElementById("add-product-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const orderId = document.getElementById("add-order-id").value;
      const productId = document.getElementById("product-id").value;
      const quantity = document.getElementById("quantity").value;
      Orders.addProductToOrder(orderId, productId, quantity);
      this.reset();
    });
});
