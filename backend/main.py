import subprocess

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/create_config', methods=['POST'])
def create_config():
    remote_name = request.json['remote_name']
    remote_type = request.json['remote_type']

    if remote_name == '':
        return jsonify({'message': 'Remote name cannot be empty.'}), 400

    if remote_type == '':
            return jsonify({'message': 'Remote type cannot be empty.'}), 400

    try:
        subprocess.run(['rclone', 'config', 'create', f'{remote_name}', remote_type], check=True)
    except subprocess.CalledProcessError as e:
        return jsonify({'message': f'Failed to create config: {e.stderr.decode()}'}), 500

    return jsonify({'message': 'Successfully created config.'}), 200
    
@app.route('/delete_remote', methods=['POST'])
def delete_remote():
    remote_name = request.json['remote_name']

    if remote_name == '':
        return jsonify({'message': 'Remote name cannot be empty.'}), 400

    try:
        subprocess.run(['rclone', 'config', 'delete', f'{remote_name}'], check=True)
    except subprocess.CalledProcessError as e:
        return jsonify({'message': f'Failed to delete remote: {e.stderr.decode()}'}), 500

    return jsonify({'message': 'Successfully deleted remote.'}), 200

if __name__ == '__main__':
    app.run(debug=True)

