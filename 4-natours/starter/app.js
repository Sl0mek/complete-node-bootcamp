const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Hello from the server side',
    app: 'Natours',
  });
});

app.post('/', (req, res) => {
  res.status(404).json({
    message: 'You can POST on this endpoint',
    app: 'Natours',
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
