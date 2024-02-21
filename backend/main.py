from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)
PORT = int(os.environ.get("PORT", 3000))

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/create_remote', methods=['POST'])
def create_remote():
    data = request.json
    remote_name = data.get('remote_name')

    if not remote_name:
        return jsonify({'error': 'Remote name not provided'}), 400

    try:
        subprocess.run(['rclone', 'config', 'create', remote_name, 'drive'], check=True)
        return jsonify({'message': f'Remote "{remote_name}" created successfully'}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while creating the remote'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT)
