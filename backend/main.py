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
    remote_type = data.get('remote_type')

    if not remote_name:
        return jsonify({'error': 'Remote name not provided'}), 400
    if not remote_type:
        return jsonify({'error': 'Remote type not provided'}), 400

    try:
        subprocess.run(['rclone', 'config', 'create', remote_name, remote_type], check=True)
        return jsonify({'message': f'Remote "{remote_name}" created successfully'}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while creating the remote'}), 500

@app.route('/list_remote', methods=['POST'])
def list_remote():
    data = request.json
    remote_name = data.get('remote_name')

    if not remote_name:
        return jsonify({'error': 'Remote name not provided'}), 400

    try:
        result = subprocess.run(['rclone', 'lsf', f'{remote_name}:'], capture_output=True, text=True)
        files_and_folders = result.stdout.splitlines()
        return jsonify({'files_and_folders': files_and_folders}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while listing the remote files and folders'}), 500

@app.route('/list_directory', methods=['POST'])
def list_directory():
    data = request.json
    remote_name = data.get('remote_name')
    directory = data.get('file_name')

    if not remote_name:
        return jsonify({'error': 'Remote name not provided'}), 400
    if not directory:
            return jsonify({'error': 'Directory not provided'}), 400
    
    try:
        result = subprocess.run(['rclone', 'lsf', f'{remote_name}:{directory}'], capture_output=True, text=True)
        files_and_folders = result.stdout.splitlines()
        return jsonify({'files_and_folders': files_and_folders}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while listing the remote files and folders'}), 500

@app.route('/delete_remote', methods=['POST'])
def delete_remote():
    data = request.json
    remote_name = data.get('remote_name')

    if not remote_name:
        return jsonify({'error': 'Remote name not provided'}), 400

    try:
        subprocess.run(['rclone', 'config', 'delete', remote_name], check=True)
        return jsonify({'message': f'Remote "{remote_name}" deleted successfully'}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while deleting the remote'}), 500

@app.route('/move_file', methods=['POST'])
def move_file():
    data = request.json
    source_remote = data.get('source_remote')
    source_path = data.get('source_path')
    destination_remote = data.get('destination_remote')
    destination_path = data.get('destination_path')

    if not source_remote or not source_path:
        return jsonify({'error': 'Source remote and path not provided'}), 400
    if not destination_remote or not destination_path:
        return jsonify({'error': 'Destination remote and path not provided'}), 400

    try:
        subprocess.run(['rclone', 'move', f'{source_remote}:{source_path}', f'{destination_remote}:{destination_path}'], check=True)
        return jsonify({'message': f'File moved successfully from {source_remote}:{source_path} to {destination_remote}:{destination_path}'}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while moving the file'}), 500

@app.route('/copy_file', methods=['POST'])
def copy_file():
    data = request.json
    source_remote = data.get('source_remote')
    source_path = data.get('source_path')
    destination_remote = data.get('destination_remote')
    destination_path = data.get('destination_path')

    if not source_remote or not source_path:
        return jsonify({'error': 'Source remote and path not provided'}), 400
    if not destination_remote or not destination_path:
        return jsonify({'error': 'Destination remote and path not provided'}), 400

    try:
        subprocess.run(['rclone', 'copy', f'{source_remote}:{source_path}', f'{destination_remote}:{destination_path}'], check=True)
        return jsonify({'message': f'File copied successfully from {source_remote}:{source_path} to {destination_remote}:{destination_path}'}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while copying the file'}), 500

@app.route('/subdir/move_file', methods=['POST'])
def move_file_subdir():
    data = request.json
    remote_name = data.get('remote_name')
    file_name = data.get('file_name')
    selected_file = data.get('selected_file')
    destination_remote = data.get('destination_remote')
    destination_path = data.get('destination_path')

    if not remote_name or not file_name or not selected_file:
        return jsonify({'error': 'Remote name, file name, and selected file not provided'}), 400
    if not destination_remote:
        return jsonify({'error': 'Destination remote not provided'}), 400

    try:
        destination = f'{destination_remote}:{destination_path}' if destination_path else f'{destination_remote}:'
        subprocess.run(['rclone', 'move', f'{remote_name}:{file_name}/{selected_file}', destination], check=True)
        return jsonify({'message': f'File moved successfully to {destination}'}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while moving the file'}), 500

@app.route('/subdir/copy_file', methods=['POST'])
def copy_file_subdir():
    data = request.json
    remote_name = data.get('remote_name')
    file_name = data.get('file_name')
    selected_file = data.get('selected_file')
    destination_remote = data.get('destination_remote')
    destination_path = data.get('destination_path')

    if not remote_name or not file_name or not selected_file:
        return jsonify({'error': 'Remote name, file name, and selected file not provided'}), 400
    if not destination_remote:
        return jsonify({'error': 'Destination remote not provided'}), 400

    try:
        destination = f'{destination_remote}:{destination_path}' if destination_path else f'{destination_remote}:'
        subprocess.run(['rclone', 'copy', f'{remote_name}:{file_name}/{selected_file}', destination], check=True)
        return jsonify({'message': f'File copied successfully to {destination}'}), 200
    except subprocess.CalledProcessError as e:
        print('Error executing rclone command:', e)
        return jsonify({'error': 'An error occurred while copying the file'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT)
