import torch
import torch.nn as nn
import torchvision.transforms as transforms
from flask import Flask, request, jsonify
from PIL import Image
import io
import base64

# Define CNN Model Class
class CNN(nn.Module):
    def __init__(self, num_classes, image_size=(224, 224)):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, stride=1, padding=1)
        self.relu = nn.ReLU()
        self.maxpool = nn.MaxPool2d(kernel_size=2, stride=2)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        
        # Dynamically calculate the flattened size based on input image size
        flattened_size = 64 * (image_size[0] // 4) * (image_size[1] // 4) 
        self.fc1 = nn.Linear(flattened_size, 512)
        self.fc2 = nn.Linear(512, num_classes)
    
    def forward(self, x):
        x = self.conv1(x)
        x = self.relu(x)
        x = self.maxpool(x)
        
        x = self.conv2(x)
        x = self.relu(x)
        x = self.maxpool(x)
        
        x = x.view(x.size(0), -1) 
        
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        
        return x

app = Flask(__name__)

def load_model():
    model = CNN(num_classes=30)  
    model.load_state_dict(torch.load('models.pth', map_location=torch.device('cpu')))
    model.eval() 
    return model

transform = transforms.Compose([
    transforms.Resize((224, 224)), 
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),  
])

def predict_image(image):
    model = load_model()
    image = transform(image).unsqueeze(0)  
    with torch.no_grad():
        output = model(image)
    _, predicted_class = torch.max(output, 1)
    return predicted_class.item()

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    try:
        image = Image.open(file.stream)
        predicted_class = predict_image(image)
        class_names = ['Aluminium Food Can', 'Aluminium Soda Can', 'Cardboard Boxes', 'Cardboard Packaging', 'Clothing', 'Coffee Grounds', 'Disposable Plastic Cutlery', 'Eggshells', 'Food Waste', 'Beverage Bottles',
                       'Glass Cosmetic Container', ' Glass Food Jars', 'Magazines', 'Newspaper', 'Office Paper', 'Paper Cups', 'Paper Cup Lid', 'Plastic Detergent Bottles', 'Plastic Food Container',
                       'Plastic Shopping Bags', 'Plastic Soda Bottles', 'Straws', 'Trash Bags', 'Water Bottles', 'Shoes', 'Food Cans', 'Strofoam Cups', 'Styrofoam Food Containers', 'Tea Bags', 'class_27', 'class_28',
                       'class_29', 'class_30']  
        predicted_class_name = class_names[predicted_class] 
        return jsonify({'predicted_class': predicted_class_name}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/scan_image', methods=['POST'])
def scan_image():
    if 'image' not in request.json:
        return jsonify({'error': 'No image data'}), 400

    try:
        img_data = request.json['image']  
        img_data = img_data.split(',')[1]
        img_bytes = base64.b64decode(img_data) 
        image = Image.open(io.BytesIO(img_bytes))  
        predicted_class = predict_image(image) 
        class_names = ['Aluminium Food Can', 'Aluminium Soda Can', 'Cardboard Boxes', 'Cardboard Packaging', 'Clothing', 'Coffee Grounds', 'Disposable Plastic Cutlery', 'Eggshells', 'Food Waste', 'Beverage Bottles',
                       'Glass Cosmetic Container', ' Glass Food Jars', 'Magazines', 'Newspaper', 'Office Paper', 'Paper Cups', 'Paper Cup Lid', 'Plastic Detergent Bottles', 'Plastic Food Container',
                       'Plastic Shopping Bags', 'Plastic Soda Bottles', 'Straws', 'Trash Bags', 'Water Bottles', 'Shoes', 'Food Cans', 'Strofoam Cups', 'Styrofoam Food Containers', 'Tea Bags', 'class_27', 'class_28',
                       'class_29', 'class_30']        
        predicted_class_name = class_names[predicted_class]
        return jsonify({'predicted_class': predicted_class_name}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
