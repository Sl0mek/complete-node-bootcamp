const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
