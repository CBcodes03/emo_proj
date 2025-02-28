from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import base64
from io import BytesIO
from PIL import Image
import time
import ana

app = Flask(__name__, static_folder='demopage/dist', static_url_path='/')
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def save_image_from_base64(base64_data, filename):
    image_data = base64.b64decode(base64_data)
    image = Image.open(BytesIO(image_data))
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

@app.route('/', methods=['GET'])
def home():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/upload-image', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'GET':
        
        return jsonify({"message": "Send a POST request to upload an image."}), 200
    
    if request.method == 'POST':
        # Get image data from request
        image_data = request.json['image']
        image_data_bytes = base64.b64decode(image_data)
        image_bytes = BytesIO(image_data_bytes)
        result = ana.analyze_emotion_from_image(image_bytes)
        # Return the result
        print(result)
        return jsonify({
            "message": "Image uploaded and processed successfully!",
            "filename": filename,
            "result": result['dominant_emotion']
        }), 200

if __name__ == "__main__":
    app.run(debug=True)
