import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()

# Configuración de la base de datos
db_config = {
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'port': int(os.getenv('DB_PORT', 3306)),
    'raise_on_warnings': True
}

def get_db_connection():
    """
    Establece una conexión con la base de datos MySQL.
    Retorna la conexión si es exitosa, None si falla.
    """
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def convert_to_float(data_list, fields):
    """
    Convierte campos específicos a float si existen y no son None.
    Args:
        data_list: Lista de diccionarios con los datos.
        fields: Lista de nombres de campos a convertir.
    Returns:
        Lista de diccionarios con los campos convertidos.
    """
    for row in data_list:
        for field in fields:
            if field in row and row[field] is not None:
                row[field] = float(row[field])
    return data_list