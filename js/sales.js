class Sales {
  static async loadSalesData() {
    const loading = document.getElementById("loading-sales");
    const tableBody = document.querySelector("#sales-table tbody");

    loading.style.display = "block";
    tableBody.innerHTML = "";

    try {
      const response = await fetch(`${API_BASE_URL}/sales`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        data.data.forEach((sale) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${sale.usuario}</td>
            <td>${Utils.formatCurrency(sale.total_ventas)}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        const row = document.createElement("tr");
        row.innerHTML = '<td colspan="2">No hay datos disponibles</td>';
        tableBody.appendChild(row);
      }
    } catch (error) {
      Utils.showMessage(`Error al cargar ventas: ${error.message}`, "error");
    } finally {
      loading.style.display = "none";
    }
  }
}
