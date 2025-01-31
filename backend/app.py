from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import os
import base64
from io import BytesIO
from PIL import Image
import time
import ana

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def save_image_from_base64(base64_data, filename):
    image_data = base64.b64decode(base64_data)
    image = Image.open(BytesIO(image_data))
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

@app.route('/', methods=['GET'])
def home():
    return redirect("/upload-image")

@app.route('/upload-image', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'GET':
        
        return jsonify({"message": "Send a POST request to upload an image."}), 200
    
    if request.method == 'POST':
        # Get image data from request
        image_data = request.json['image']
        filename = "image_" + str(int(time.time())) + ".png"
        save_image_from_base64(image_data, filename)
        
        # Process the image using your analyze_emotion_from_image function
        path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        result = ana.analyze_emotion_from_image(path)
        
        os.remove(path)
        
        # Return the result
        print(result)
        return jsonify({
            "message": "Image uploaded and processed successfully!",
            "filename": filename,
            "result": result['dominant_emotion']
        }), 200

if __name__ == "__main__":
    app.run(debug=True)
