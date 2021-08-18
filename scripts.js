async function quiz(){
    const response = await fetch("https://opentdb.com/api.php?amount=2&category=18&difficulty=easy&type=multiple");
    var data = await response.json()
    var content = await data.results;
    segregation(content)
}


var score = document.getElementById('score')
var score_fail = document.getElementById('score-fail')

var input = document.getElementById("quiz-part");
var question = document.getElementById("question")
var answersElement = document.getElementById("answer-buttons")
var nextbtn = document.getElementById("next-btn")
var main = document.getElementById("main");
var fail = document.getElementById("fail")
var pass = document.getElementById("pass")
var download = document.getElementById("download")
var top = document.getElementById("top")
var rules = document.getElementById('rules')
var no = document.getElementById("number")
var strt = document.getElementById("strt")
var timer = document.getElementById("count")
var cnt = document.getElementById("cnt")
var sub = document.getElementById("sub")
var reviewpart = document.getElementById("reviewpart")
var testpart = document.getElementById("testpart")

sub.addEventListener("click",(() =>{
    reviewpart.classList.add("hide");
}))


strt.addEventListener('click',(() => {
    rules.classList.add("hide");
    main.classList.remove('hide')
    showtimer()
}))
download.addEventListener("click",(()=>{
    window.location = "https://mohan2002.github.io/QH-TASK2/"
}))

var time = 60
function showtimer(){
    timer.innerText = time;
    time--;

    if(time < 1){
        count++;
        if(count<items.length){
            resetState()
            showQuestion(items[count])
            
        }
        
    }
    setTimeout(function(){
        showtimer()
    },1000)
}
var per;

nextbtn.addEventListener('click',(()=>{
    count++;
    if(count<items.length){
        resetState()
        showQuestion(items[count])
        
    }
    else if(count == items.length) {
        var d = points/(items.length*10)
        per = d*100 
        if(per >= 50){
            main.classList.add('hide')
            cnt.classList.add('hide')
            pass.classList.remove("hide")
            score.innerText = per + "%"
            console.log(per);
        }
        else{
            main.classList.add('hide')
            fail.classList.remove("hide")
            score_fail.innerText = per + '%'
        }
    }
}))


var points = 0;
var oldpoints = 0;
var questions;
var ans;
var wrong_ans ;
var choices = [];
var items = []

var crct_ans;
var count = 0
function segregation(content){
    
    content.map(con => {
        questions = con.question;
        ans = con.correct_answer;
        wrong_ans = con.incorrect_answers;
        choices = [...wrong_ans]
        choices.push(ans)
        shuffleArray(choices)
        var temp = {
            question:questions,
            options:choices,
            answer:ans
        }
        items.push(temp)
        
    })
  showQuestion(items[count])
}
  
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
    
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }


function showQuestion(items){
    nextbtn.classList.add("hide")
    question.innerText = (count+1) + ". " + items.question;
    crct_ans = items.answer;
    items.options.forEach(opt =>{
        const button = document.createElement('button')
        button.innerText = opt
        button.classList.add('btn1')
        button.addEventListener('click',selectAnswer)
        answersElement.appendChild(button)
    })
    no.innerText = " " + count + "/30"
   
}

// let showtimer = () =>{
//     time--;
//     timer.innerText = time
// }

function selectAnswer(e){
    const selectedButton = e.target.innerText
    // console.log(items[count]);
    oldpoints = points
    nextbtn.classList.remove('hide')
    var dummy =  items[count].answer
    if(selectedButton === dummy){
        oldpoints = 10
        points = oldpoints + points
        console.log(points);
    }
    else{
        oldpoints = oldpoints - 10
        console.log("bye");
    }
}


function resetState(){
    while(answersElement.firstChild){
        answersElement.removeChild(answersElement.firstChild)
    }
    time = 60;
}



quiz()
