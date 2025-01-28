const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");
const router = express.Router();

// Shorten a URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!originalUrl) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json({ shortUrl: `${baseUrl}/${url.shortId}` });
    }

    const shortId = shortid.generate();
    const newUrl = new Url({ originalUrl, shortId });
    await newUrl.save();

    res.json({ shortUrl: `${baseUrl}/${shortId}` });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Redirect to the original URL
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
