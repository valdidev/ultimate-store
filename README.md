# Ultimate Store Backend

El proyecto **Ultimate Store** es una aplicación web que gestiona pedidos, productos y usuarios para una tienda en línea. Este repositorio contiene el backend, implementado con **Flask**, que se conecta a una base de datos MySQL alojada en un servidor externo. El backend proporciona una API RESTful para interactuar con los datos de la tienda, incluyendo ventas, inventario, pedidos y detalles de pedidos.

## Especificaciones Técnicas

### Tecnologías Utilizadas
- **Lenguaje**: Python 3.13
- **Framework**: Flask 3.0.3
- **Base de Datos**: MySQL (alojada en un servidor externo)
- **Dependencias**:
  - `flask`: Framework web para crear la API.
  - `flask-cors`: Manejo de CORS para permitir solicitudes desde el frontend.
  - `mysql-connector-python`: Conector para interactuar con MySQL.
  - `python-dotenv`: Carga de variables de entorno desde un archivo `.env`.
- **Entorno**: Entorno virtual de Python (`venv`) para aislar dependencias.
- **Sistema Operativo**: Probado en Windows (compatible con macOS y Linux con ajustes mínimos).

### Estructura de la Base de Datos
La base de datos `ultimate_store` contiene las siguientes tablas, vistas y procedimientos almacenados:

#### Tablas
- **users**: Almacena información de los usuarios.
  - `id` (PK, auto-incremental)
  - `name` (VARCHAR)
- **products**: Almacena información de los productos.
  - `id` (PK, auto-incremental)
  - `name` (VARCHAR)
  - `price` (DECIMAL)
  - `stock` (INT)
- **orders**: Almacena los pedidos.
  - `id` (PK, auto-incremental)
  - `user_id` (FK a `users.id`)
  - `order_date` (DATETIME)
  - `status` (VARCHAR)
- **order_details**: Detalles de los pedidos.
  - `id` (PK, auto-incremental)
  - `pedido` (INT, referencia a `orders.id`)
  - `cliente` (VARCHAR)
  - `fecha_pedido` (DATETIME)
  - `estado` (VARCHAR)
  - `producto` (VARCHAR)
  - `cantidad` (INT)
  - `total` (DECIMAL)
- **order_products**: Relación muchos-a-muchos entre pedidos y productos.
  - `order_id` (FK a `orders.id`)
  - `product_id` (FK a `products.id`)
  - `quantity` (INT)

#### Vistas
- **sales_by_user**: Agrupa las ventas totales por usuario.
- **low_stock_products**: Lista los productos con stock menor a 10.

#### Procedimientos Almacenados
- **UpdateOrderStatus**: Actualiza el estado de un pedido y sus detalles.
- **AddProductToOrder**: Añade un producto a un pedido, actualiza el stock y registra los detalles.

### Endpoints de la API
La API está disponible en `http://localhost:5000/api` cuando se ejecuta localmente. Los endpoints principales son:

- **GET /api/sales**: Obtiene las ventas totales por usuario (vista `sales_by_user`).
- **GET /api/low-stock**: Lista los productos con bajo stock (vista `low_stock_products`).
- **GET /api/products**: Lista todos los productos.
- **GET /api/orders**: Lista todos los pedidos.
- **GET /api/order-details**: Obtiene los detalles de todos los pedidos.
- **GET /api/order-details/<order_id>**: Obtiene los detalles de un pedido específico.
- **PUT /api/orders/<order_id>/status**: Actualiza el estado de un pedido.
- **POST /api/orders/add-product**: Añade un producto a un pedido.
- **GET /api/users**: Lista todos los usuarios.

## Requisitos Previos
- **Python 3.13**: Instalado y añadido al `PATH` (descargar desde [python.org](https://www.python.org/downloads/)).
- **MySQL**: Acceso a un servidor MySQL externo con la base de datos `ultimate_store` configurada.
- **Git** (opcional): Para clonar el repositorio.
- **Cliente HTTP** (recomendado): Postman o `curl` para probar los endpoints.

## Instrucciones de Configuración

### 1. Clonar el Repositorio
Si el proyecto está en un repositorio Git, clónalo:
```bash
git clone <url-del-repositorio>
cd ultimate-store-backend
```
Alternativamente, crea una carpeta y copia los archivos manualmente:
```bash
mkdir ultimate-store-backend
cd ultimate-store-backend
```

### 2. Crear y Activar un Entorno Virtual
```bash
python -m venv venv
.\venv\Scripts\activate  # En Windows
# source venv/bin/activate  # En macOS/Linux
```
Deberías ver `(venv)` en la terminal.

### 3. Instalar Dependencias
Con el entorno virtual activado, instala las dependencias:
```bash
pip install flask flask-cors mysql-connector-python python-dotenv
```

### 4. Configurar las Credenciales de la Base de Datos
1. Crea un archivo `.env` en la carpeta `ultimate-store-backend` con las credenciales de tu servidor MySQL externo:
   ```
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_HOST=tu_host
   DB_NAME=ultimate_store
   DB_PORT=3306
   ```
   Reemplaza `tu_usuario`, `tu_contraseña`, `tu_host`, y `3306` con los valores reales.

2. Asegúrate de que `app.py` carga estas variables:
   ```python
   from dotenv import load_dotenv
   import os

   load_dotenv()

   db_config = {
       'user': os.getenv('DB_USER'),
       'password': os.getenv('DB_PASSWORD'),
       'host': os.getenv('DB_HOST'),
       'database': os.getenv('DB_NAME'),
       'port': int(os.getenv('DB_PORT', 3306)),
       'raise_on_warnings': True
   }
   ```

### 5. Configurar la Base de Datos
1. **Conectar al servidor MySQL externo**:
   ```bash
   mysql -h tu_host -u tu_usuario -p
   ```

2. **Crear la base de datos** (si no existe):
   ```sql
   CREATE DATABASE IF NOT EXISTS ultimate_store;
   ```

3. **Crear tablas, vistas, y procedimientos**:
   Ejecuta el siguiente script SQL en el servidor MySQL:
   ```sql
   USE ultimate_store;

   -- Tabla de usuarios
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL
   );

   -- Tabla de productos
   CREATE TABLE products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       price DECIMAL(10,2) NOT NULL,
       stock INT NOT NULL
   );

   -- Tabla de pedidos
   CREATE TABLE orders (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       order_date DATETIME,
       status VARCHAR(50),
       FOREIGN KEY (user_id) REFERENCES users(id)
   );

   -- Tabla de detalles de pedidos
   CREATE TABLE order_details (
       id INT AUTO_INCREMENT PRIMARY KEY,
       pedido INT,
       cliente VARCHAR(255),
       fecha_pedido DATETIME,
       estado VARCHAR(50),
       producto VARCHAR(255),
       cantidad INT,
       total DECIMAL(10,2)
   );

   -- Tabla de relación entre pedidos y productos
   CREATE TABLE order_products (
       order_id INT,
       product_id INT,
       quantity INT,
       FOREIGN KEY (order_id) REFERENCES orders(id),
       FOREIGN KEY (product_id) REFERENCES products(id)
   );

   -- Vista para ventas por usuario
   CREATE VIEW sales_by_user AS
   SELECT u.name AS usuario, SUM(od.total) AS total_ventas
   FROM users u
   JOIN orders o ON u.id = o.user_id
   JOIN order_details od ON o.id = od.pedido
   GROUP BY u.name;

   -- Vista para productos con bajo stock
   CREATE VIEW low_stock_products AS
   SELECT name AS producto, stock
   FROM products
   WHERE stock < 10;

   -- Procedimiento almacenado para actualizar estado de pedido
   DELIMITER //
   CREATE PROCEDURE UpdateOrderStatus(IN orderId INT, IN newStatus VARCHAR(50))
   BEGIN
       UPDATE orders
       SET status = newStatus
       WHERE id = orderId;
       UPDATE order_details
       SET estado = newStatus
       WHERE pedido = orderId;
   END //
   DELIMITER ;

   -- Procedimiento almacenado para añadir producto a pedido
   DELIMITER //
   CREATE PROCEDURE AddProductToOrder(IN orderId INT, IN productId INT, IN qty INT)
   BEGIN
       DECLARE productName VARCHAR(255);
       DECLARE productPrice DECIMAL(10,2);
       DECLARE userName VARCHAR(255);
       DECLARE orderDate DATETIME;

       -- Obtener información del producto
       SELECT name, price INTO productName, productPrice
       FROM products
       WHERE id = productId;

       -- Obtener información del pedido
       SELECT u.name, o.order_date INTO userName, orderDate
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = orderId;

       -- Insertar en order_products
       INSERT INTO order_products (order_id, product_id, quantity)
       VALUES (orderId, productId, qty);

       -- Insertar en order_details
       INSERT INTO order_details (pedido, cliente, fecha_pedido, estado, producto, cantidad, total)
       VALUES (orderId, userName, orderDate, (SELECT status FROM orders WHERE id = orderId), productName, qty, productPrice * qty);

       -- Actualizar stock
       UPDATE products
       SET stock = stock - qty
       WHERE id = productId;
   END //
   DELIMITER ;
   ```

4. **Insertar datos de prueba**:
   ```sql
   INSERT INTO users (name) VALUES ('Juan Pérez'), ('María García');
   INSERT INTO products (name, price, stock) VALUES ('Laptop', 999.99, 5), ('Teléfono', 499.99, 15);
   INSERT INTO orders (user_id, order_date, status) VALUES (1, NOW(), 'pendiente');
   INSERT INTO order_details (pedido, cliente, fecha_pedido, estado, producto, cantidad, total)
   VALUES (1, 'Juan Pérez', NOW(), 'pendiente', 'Laptop', 1, 999.99);
   INSERT INTO order_products (order_id, product_id, quantity) VALUES (1, 1, 1);
   ```

5. **Configurar permisos**:
   Asegúrate de que el servidor permita conexiones desde tu IP:
   ```sql
   GRANT ALL PRIVILEGES ON ultimate_store.* TO 'tu_usuario'@'%' IDENTIFIED BY 'tu_contraseña';
   FLUSH PRIVILEGES;
   ```

### 6. Ejecutar el Backend
1. Con el entorno virtual activado, ejecuta:
   ```bash
   python app.py
   ```
2. El servidor se iniciará en `http://localhost:5000`. Verás:
   ```
   * Serving Flask app 'app'
   * Debug mode: on
   * Running on http://127.0.0.1:5000
   * Running on http://<tu-ip-local>:5000
   ```

### 7. Probar los Endpoints
Usa un navegador, Postman, o `curl` para probar los endpoints:
- **GET** `http://localhost:5000/api/sales`
- **GET** `http://localhost:5000/api/low-stock`
- **GET** `http://localhost:5000/api/products`
- **GET** `http://localhost:5000/api/order-details`
- **PUT** `http://localhost:5000/api/orders/1/status` (body: `{"new_status": "procesando"}`)
- **POST** `http://localhost:5000/api/orders/add-product` (body: `{"order_id": 1, "product_id": 1, "quantity": 1}`)

Ejemplo con `curl`:
```bash
curl http://localhost:5000/api/sales
```

### 8. Configurar el Frontend (Opcional)
Si tienes un frontend (por ejemplo, `index.html`, `style.css`, `script.js`):
1. Asegúrate de que el archivo `script.js` apunte al backend local:
   ```javascript
   const API_BASE_URL = "http://localhost:5000/api";
   ```
2. Sirve el frontend usando un servidor local (por ejemplo, con `http-server` o Visual Studio Code Live Server).

## Solución de Problemas
- **Error: "ModuleNotFoundError: No module named 'flask'"**:
  - Asegúrate de que el entorno virtual está activado y las dependencias están instaladas (`pip install flask flask-cors mysql-connector-python python-dotenv`).
- **Error: "Database connection failed"**:
  - Verifica las credenciales en `.env`.
  - Confirma que el servidor MySQL permite conexiones desde tu IP.
  - Prueba la conexión: `mysql -h tu_host -u tu_usuario -p`.
- **Error: "Table/View does not exist"**:
  - Ejecuta el script SQL para crear tablas y vistas.
- **Puerto ocupado**:
  - Cambia el puerto en `app.py`:
    ```python
    app.run(host='0.0.0.0', port=5001, debug=True)
    ```

## Contribuciones
Para contribuir:
1. Clona el repositorio.
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m "Descripción"`.
4. Envía un pull request.

## Licencia
Este proyecto está bajo la licencia MIT (o la que prefieras).