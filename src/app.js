const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
app.set('port', process.env.PORT || 3001);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(app.get('port'), () => {
  console.log(`the Server is Run in port ${app.get('port')}`);
});
