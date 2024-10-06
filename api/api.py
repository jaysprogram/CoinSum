from flask import Flask, request, jsonify
from flask_cors import CORS
from counter import coinCounter
import os

app = Flask(__name__)
CORS(app)

# Define the upload folder for the images
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/api/count', methods=['POST'])
def count():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    
    # If no file is selected
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        # Save the uploaded image to the uploads folder
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        
        # Pass the image to the coinCounter function
        result = coinCounter(file_path)
        
        return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
