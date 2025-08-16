# 🎬 TrackVie – Track Your Shows Anywhere

**TrackVie** is a productivity tool that helps you seamlessly continue watching videos across platforms and devices.  

It consists of:  
- **🔌 Chrome Extension** – captures the currently open tab’s URL, progress (watch time), and title.  
- **💻 React Web App** – displays saved videos as clickable cards, allowing you to resume where you left off.  
- **🔥 Firebase Backend** – used for authentication, real-time data sync, and storage.  

---

## 🚀 Features
- ⏱️ **Track watch progress** – stores video time and URL and lets you continue on supported sites.
  - Can also be used to save URLs to visit again later  
- 🔗 **Cross-device sync** – watch on your laptop, continue later on your phone.  
- 🔒 **Secure login** with Firebase Authentication.  
- 📊 **User dashboard** with video cards (title, thumbnail, progress).  
- 🌐 **Lightweight Chrome Extension** integrated with Firebase.  

---

## ⚙️ Tech Stack
### Frontend (Web)
- React.js  
- CSS  
- Firebase Authentication + Firestore  

### Browser Extension
- JavaScript (Vanilla)  
- Chrome Extension API  
- Firebase SDK  

### Backend
- Express.js & Node.js  

---

## 🔑 Prerequisites
- [Node.js](https://nodejs.org/) (>= 18)  
- npm or yarn  
- Firebase project with Authentication + Firestore enabled  
- Google Chrome (for the extension)  

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Bedo1190/Trackvie.git
cd Trackvie
```
### 2. Setup Firebase

1. Create a Firebase project in Firebase Console.

2. Enable Authentication (Email/Password, Google Sign-In, etc.).

3. Create a Firestore Database.

4. Get your Firebase config from project settings and update it in:

```Extension/permissions.json```

```Web/src/context/firebase.js```
- Or create a .env file

### 3. Run the Web App
```bash
cd Web
npm install
npm start
```


- The app will run at: ```http://localhost:3000```

### 4. Load the Extension

1. Open Chrome → go to chrome://extensions/

2. Enable Developer Mode (top right).

3. Click Load unpacked.

4. Select the Extension/ folder.

- The TrackVie extension will appear in your browser toolbar.

📖 Usage

Log in to the web app with your Firebase account.

Browse videos (e.g., YouTube). The extension will automatically capture the video URL + progress.

Open the web dashboard → see saved videos as cards.

Click a card to resume watching from where you left off.
-

 
<img width="1440" alt="Ekran Resmi 2025-06-07 19 14 59" src="https://github.com/user-attachments/assets/86396155-7d5d-42a3-91df-857a166d8d0b" />


<img width="1440" alt="Ekran Resmi 2025-06-07 19 15 45" src="https://github.com/user-attachments/assets/d76b3ba3-d382-46e6-9f0f-a48e6c44d3b9" />


<img width="1440" alt="Ekran Resmi 2025-06-07 19 15 14" src="https://github.com/user-attachments/assets/74f83d50-4d6a-4fc9-8f7a-ff9eb378b957" />


<img width="1440" alt="Ekran Resmi 2025-06-07 19 15 21" src="https://github.com/user-attachments/assets/e31aca90-d5bc-4d2a-99ed-f28177d438ed" />


<img width="324" alt="Ekran Resmi 2025-06-07 19 21 14" src="https://github.com/user-attachments/assets/f8432dbd-3db7-4e30-a904-32bf0f55fca8" />


<img width="324" alt="Ekran Resmi 2025-06-07 19 22 15" src="https://github.com/user-attachments/assets/ff287f96-b656-4615-917f-0ecec8fc99b0" />
