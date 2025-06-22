from flask import Flask, render_template, request
import os
import gdown
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename
from PIL import Image

app = Flask(__name__)

MODEL_PATH = "whale_emotion_cnn.h5"
DRIVE_URL = "https://drive.google.com/uc?id=1VquvTPH4ipxqqja3x57QQvUK2jZLckM7"

# Auto-download model from Drive if not present
if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    gdown.download(DRIVE_URL, MODEL_PATH, quiet=False)

# Load the model once
model = load_model(MODEL_PATH)
print("Model loaded.")

# Emotion labels (change as per your training)
emotion_labels = ["Happy", "Sad", "Angry", "Calm", "Fear", "Surprised"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return "No file uploaded", 400

    file = request.files["file"]
    filename = secure_filename(file.filename)

    img = Image.open(file).convert("RGB").resize((128, 128))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    prediction = model.predict(img_array)
    predicted_class = emotion_labels[np.argmax(prediction)]

    return render_template("index.html", prediction=predicted_class)

if __name__ == "__main__":
    app.run(debug=True)
