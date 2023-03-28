// create express app the loads static files from the public folder
const express = require('express');
const app = express();

app.use(express.static('public'));

// app.use("/static/plugins/plugin1", express.static('../reactjs/main-app-plugin/dist'));
// app.use("/static/plugins/plugin1", express.static('../reactjs/main-app-plugin/build/static'));
app.use("/static/plugins/plugin1", express.static('../reactjs/main-app-plugin2/dist'));

// start the server
const port = 3009;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});