const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send(
      [
      {
      "id": 1,
      "image": "http://placeimg.com/64/64/1",
      "name": "일일일",
      "birthday": "123456",
      "gender": "남자",
      "job": "중학생"
    }, {
      "id": 2,
      "image": "http://placeimg.com/64/64/2",
      "name": "이이이",
      "birthday": "123456",
      "gender": "남자",
      "job": "고등학생"
    }, {
      "id": 3,
      "image": "http://placeimg.com/64/64/3",
      "name": "삼삼삼",
      "birthday": "123456",
      "gender": "여자",
      "job": "대학생"
    }]
       
    );

});

app.listen(port, () => console.log(`Listening on port ${port}`));