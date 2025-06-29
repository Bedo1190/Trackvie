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

// Firebase Token Verification Middleware
async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid; // Add UID to request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}


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

// Get all saved shows for a specific user
app.get('/users/:userId/savedShows', async (req, res) => {
  const { userId } = req.params;
  try {
    const savedShowsSnapshot = await db
      .collection('Users')
      .doc(userId)
      .collection('savedShows')
      .get();

    const savedShows = [];
    savedShowsSnapshot.forEach(doc => {
      savedShows.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(savedShows);
  } catch (error) {
    console.error('Error fetching saved shows:', error);
    res.status(500).json({ error: 'Failed to fetch saved shows' });
  }
});

// Add a saved show for a specific user
// === POST: Save a show and auto-increment ID ===
// ✅ Save a show for the authenticated user
app.post('/users/:userId/savedShows', authenticateToken, async (req, res) => {
  const uid = req.uid;
  const { url, videoProgress, modifiedUrl, title } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing required field: url' });
  }

  try {
    const userRef = db.collection('Users').doc(uid);

    await db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef);
      if (!userDoc.exists) {
        t.set(userRef, { savedShowCount: 0 });
      }

      let count = userDoc.exists ? userDoc.data().savedShowCount || 0 : 0;
      count += 1;

      const showId = `id-${count}`;
      const savedShowRef = userRef.collection('savedShows').doc(showId);

      t.set(savedShowRef, {
        url: url,
        videoProgress: videoProgress || null,
        timestamp: admin.firestore.Timestamp.now(),
        title: title || 'untitled',
      });

      t.update(userRef, { savedShowCount: count });
    });

    res.status(200).json({ message: 'Show saved successfully!' });
  } catch (error) {
    console.error('Error saving show:', error);
    res.status(500).json({ error: 'Failed to save show' });
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
