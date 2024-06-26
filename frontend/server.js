import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3221;

// Serve static files
app.use(express.static("public"));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
