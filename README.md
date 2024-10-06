
# Coin Counter Application
Welcome to the Coin Counter Application! This README provides a step-by-step guide on how to set up and run the application.

Prerequisites
Before you begin, ensure you have the following installed on your machine:

- Node.js (for the frontend)
- npm (Node Package Manager)
- Python (for the backend)
- pip (Python Package Installer)
- Expo Go app (for scanning QR code)
  
Getting Started
Step 1: Set Up the Frontend
- Open a terminal and navigate to the frontend directory of your application.

Install dependencies:

- npm install

Start the application:
- npm start

Once the application is running, a QR code will appear in the terminal. Make sure the QR code is in Expo Go mode.

Scan the QR code using the Expo Go app on your mobile device to launch the frontend.

Step 2: Set Up the Backend

Open a second terminal and navigate to the API folder:
- cd path/to/api

Set up a virtual environment (replace venv with your preferred name):
- python -m venv venv
Activate the virtual environment:

On Windows:
- venv\Scripts\activate

On macOS/Linux:
- source venv/bin/activate

Install the required Python packages:
- pip install -r requirements.txt

Install the React Native vector icons (if not already installed):
- npm install react-native-vector-icons

Run the Flask server:
- flask run --host=0.0.0.0 --port=4000

Summary
You now have both the frontend and backend running. The frontend should be accessible via the Expo Go app on your mobile device, and the backend is running on port 4000.
