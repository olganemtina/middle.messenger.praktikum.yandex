const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// // static serving from /dist/client
app.use(express.static(path.join(__dirname, "dist")));


app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 