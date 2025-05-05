class Orders {
  static async loadOrderDetails() {
    const loading = document.getElementById("loading-orders");
    const tableBody = document.querySelector("#orders-table tbody");

    loading.style.display = "block";
    tableBody.innerHTML = "";

    try {
      const response = await fetch(`${API_BASE_URL}/order-details`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        data.data.forEach((order) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${order.pedido}</td>
            <td>${order.cliente}</td>
            <td>${Utils.formatDate(order.fecha_pedido)}</td>
            <td class="${Utils.getStatusClass(order.estado)}">${
            order.estado.charAt(0).toUpperCase() + order.estado.slice(1)
          }</td>
            <td>${order.producto}</td>
            <td>${order.cantidad}</td>
            <td>${Utils.formatCurrency(order.total)}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        const row = document.createElement("tr");
        row.innerHTML = '<td colspan="7">No hay pedidos registrados</td>';
        tableBody.appendChild(row);
      }
    } catch (error) {
      Utils.showMessage(`Error al cargar pedidos: ${error.message}`, "error");
    } finally {
      loading.style.display = "none";
    }
  }

  static async updateOrderStatus(orderId, newStatus) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        Utils.showMessage(data.message || "Estado actualizado correctamente");
        Orders.loadOrderDetails(); // Reload order details
      } else {
        throw new Error(data.error || "Error al actualizar el estado");
      }
    } catch (error) {
      Utils.showMessage(error.message, "error");
    }
  }

  static async addProductToOrder(orderId, productId, quantity) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          product_id: productId,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Utils.showMessage(data.message || "Producto añadido correctamente");
        Orders.loadOrderDetails(); // Reload order details
        Products.loadAllProducts(); // Reload product list
      } else {
        throw new Error(data.error || "Error al añadir el producto");
      }
    } catch (error) {
      Utils.showMessage(error.message, "error");
    }
  }
}
