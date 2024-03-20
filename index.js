const express = require("express");

const route = require("./routes/index.route");

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

// Routes
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});