class Products {
  static async loadAllProducts() {
    const loading = document.getElementById("loading-products");
    const productsList = document.getElementById("products-list");

    loading.style.display = "block";
    productsList.innerHTML = "";

    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        data.data.forEach((product) => {
          const productItem = document.createElement("div");
          productItem.className = "product-item";
          productItem.innerHTML = `
            <span>${product.name}</span>
            <span>${Utils.formatCurrency(product.price)} (${
            product.stock
          } unidades)</span>
          `;
          productsList.appendChild(productItem);
        });
      } else {
        productsList.innerHTML = "<p>No hay productos disponibles</p>";
      }
    } catch (error) {
      Utils.showMessage(`Error al cargar productos: ${error.message}`, "error");
    } finally {
      loading.style.display = "none";
    }
  }
}
