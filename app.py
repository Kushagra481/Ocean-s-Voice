from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)
model = load_model('whale_emotion_cnn.h5')

# Define your class labels (edit as per your dataset)
class_labels = ['Happy', 'Sad', 'Angry', 'Fear', 'Calm']

@app.route('/')
def home():
    return render_template('index.html', prediction=None)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return render_template('index.html', prediction="No file uploaded")

    file = request.files['file']
    if file.filename == '':
        return render_template('index.html', prediction="No file selected")

    if file:
        filepath = os.path.join('static', file.filename)
        file.save(filepath)

        img = image.load_img(filepath, target_size=(128, 128))  # change size to match your model
        img_tensor = image.img_to_array(img) / 255.0
        img_tensor = np.expand_dims(img_tensor, axis=0)

        prediction = model.predict(img_tensor)
        predicted_label = class_labels[np.argmax(prediction)]

        return render_template('index.html', prediction=predicted_label, img_path=filepath)

    return render_template('index.html', prediction="Error during prediction")

if __name__ == '__main__':
    app.run(debug=True)
