from flask import Flask, jsonify, request
import sqlite3
import os

app = Flask(__name__)

DATABASE = os.path.join(os.path.dirname(__file__), 'data.db')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    return jsonify({"message": "Welcome to EcoCycle!"})

@app.route('/create_table', methods=['POST'])
def create_table():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS waste
                      (id INTEGER PRIMARY KEY, type TEXT, description TEXT)''')
    conn.commit()
    conn.close()
    return jsonify({"message": "Table created!"})

@app.route('/add_waste', methods=['POST'])
def add_waste():
    data = request.get_json()
    type_of_waste = data.get('type')
    description = data.get('description')

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO waste (type, description) VALUES (?, ?)", 
                   (type_of_waste, description))
    conn.commit()
    conn.close()

    return jsonify({"message": "Waste added successfully!"})

@app.route('/get_waste', methods=['GET'])
def get_waste():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM waste")
    rows = cursor.fetchall()
    conn.close()

    waste_list = []
    for row in rows:
        waste_list.append({"id": row["id"], "type": row["type"], "description": row["description"]})

    return jsonify(waste_list)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2341)
