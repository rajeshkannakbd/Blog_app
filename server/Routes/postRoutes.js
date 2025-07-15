const express = require('express')
const router = express.Router();

router.get("/posts", (req, res) => {
  res.send("Hello from posts route");
})

module.exports = router;