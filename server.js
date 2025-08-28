const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend from public/
app.use(express.static(path.join(__dirname, "public")));

// Multer storage for uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array("photos", 3);

// Route for form submission
app.post("/submit", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ Text inputs:", req.body);
    console.log("✅ Uploaded files:", req.files);

    res.json({
      message: "Form submitted successfully!",
      textInputs: req.body,
      files: req.files
    });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
