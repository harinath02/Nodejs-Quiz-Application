const express = require('express');
const app = express();
const jsonData = require('./data/ques.json');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


let resultArray = []; 
let result = 0;

app.get('/',(req,res)=>{
    try {
        res.render('quizpage/quiz', {quizData:jsonData.qna});
    } catch(err){
        console.error(err);
        res.status(500).send('Internal Server error');
    }
});

app.post('/submit-answers', (req, res) => {
    try {
        resultArray = req.body.selectedAnswers;
        result = req.body.score;
         // Assuming req.body contains the result array
        res.redirect('http://localhost:5000/feedback'); // Redirect to feedback page
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server error');
    }
});

app.get('/feedback',(req,res)=>{
    res.render('pages/feedback',{quizData:jsonData.qna,result, resultArray});
})

app.listen("5000",()=>{
    console.log("sever is running at 5000");
})