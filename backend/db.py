from flask import Flask, jsonify, request
import sqlite3
import os

app = Flask(__name__)

DATABASE = os.path.join(os.path.dirname(__file__), 'data.db')

def get_db():
    """Connect to the database and set row factory for dict-like access."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize database and create tables if they do not exist
@app.before_first_request
def initialize_db():
    conn = get_db()
    cursor = conn.cursor()

    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    # Create images table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            filepath TEXT NOT NULL,
            uploaded_by INTEGER NOT NULL,
            FOREIGN KEY (uploaded_by) REFERENCES users (id)
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def home():
    return jsonify({"message": "Welcome to EcoCycle with Image and User Management!"})

# User Management Endpoints
@app.route('/register', methods=['POST'])
def register_user():
    """Register a new user."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists!"}), 400
    finally:
        conn.close()

@app.route('/login', methods=['POST'])
def login_user():
    """Authenticate a user."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login successful!", "user_id": user['id']}), 200
    else:
        return jsonify({"error": "Invalid username or password!"}), 401

# Image Management Endpoints
@app.route('/upload_image', methods=['POST'])
def upload_image():
    """Save image information to the database."""
    data = request.get_json()
    filename = data.get('filename')
    filepath = data.get('filepath')
    uploaded_by = data.get('uploaded_by')  # User ID of the uploader

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO images (filename, filepath, uploaded_by) VALUES (?, ?, ?)",
                   (filename, filepath, uploaded_by))
    conn.commit()
    conn.close()

    return jsonify({"message": "Image uploaded successfully!"}), 201

@app.route('/get_images', methods=['GET'])
def get_images():
    """Fetch all uploaded images."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM images")
    rows = cursor.fetchall()
    conn.close()

    images = [{"id": row["id"], "filename": row["filename"], "filepath": row["filepath"], "uploaded_by": row["uploaded_by"]} for row in rows]

    return jsonify(images)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2341)
