let app = require('../app');
let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}로 express 실행`);
  console.log(`http://localhost:${port}`);
})