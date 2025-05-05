// Utility class for common functions
class Utils {
  // Show a message to the user
  static showMessage(message, type = "success") {
    const messageContainer = document.getElementById("message-container");
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    messageContainer.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }

  // Format a date string
  static formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }

  // Format a currency value
  static formatCurrency(amount) {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  }

  // Get CSS class for a status
  static getStatusClass(status) {
    return `status-${status.toLowerCase()}`;
  }
}
