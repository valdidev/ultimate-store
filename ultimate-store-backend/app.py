from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from routes import init_routes

load_dotenv()

app = Flask(__name__)
CORS(app)

# Inicializar las rutas
init_routes(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)