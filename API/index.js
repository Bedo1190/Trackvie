const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const port = 4000;

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); // Enable JSON body parsing

const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// === READ documents from a collection ===
app.get('/TestUrls', async (req, res) => {
  try {
    const snapshot = await db.collection('TestUrls').get();
    const videos = [];

    snapshot.forEach(doc => {
      videos.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// === READ specific documents from a collection ===
app.get('/TestUrls/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('TestUrls').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// === WRITE data to Firestore ===
app.post('/save', async (req, res) => {
  try {
    const { collection, docId, data } = req.body;

    if (!collection || !docId || !data) {
      return res.status(400).json({ error: "Missing required fields: 'collection', 'docId', or 'data'" });
    }

    await db.collection(collection).doc(docId).set(data);

    return res.status(200).json({ message: 'Document successfully written!' });
  } catch (error) {
    console.error("Error writing document:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// === Root test endpoint ===
app.get('/', (req, res) => {
  res.send('API is running');
});

// === Start server ===
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
