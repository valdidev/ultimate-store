class Stock {
  static async loadLowStockProducts() {
    const loading = document.getElementById("loading-stock");
    const stockList = document.getElementById("stock-list");

    loading.style.display = "block";
    stockList.innerHTML = "";

    try {
      const response = await fetch(`${API_BASE_URL}/low-stock`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        data.data.forEach((product) => {
          const productItem = document.createElement("div");
          productItem.className = "product-item";
          productItem.innerHTML = `
            <span>${product.producto}</span>
            <span class="low-stock">${product.stock} unidades</span>
          `;
          stockList.appendChild(productItem);
        });
      } else {
        stockList.innerHTML = "<p>No hay productos con bajo stock</p>";
      }
    } catch (error) {
      Utils.showMessage(`Error al cargar productos: ${error.message}`, "error");
    } finally {
      loading.style.display = "none";
    }
  }
}
