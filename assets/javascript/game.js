
//Create object for questions with multiple answers that use button clicks to submit answers

var trivia = [
 		{ 	question: 'Where were the Beatles originally formed?',
 			multiAnswers: ['Manchester','London','Liverpool'],
			answer: 2
		},	
 		{	question : 'What was the last song John Lennon played for a paying audience?',
 			multiAnswers : ['I Saw Her Standing There','Imagine','Across the Universe'],
			answer : 0
		},	
 		{	question : 'Which Beatle crossed Abbey Road first?',
 			multiAnswers : ['Paul','John','Ringo'],
			answer : 1
		},
 		{	question : 'Who was the first Beatle to get married?',
 			multiAnswers : ['George','Paul','John'],
			answer : 2
		},
 		{	question : 'Which of the following songs contributed to the rumor that Paul had died?',
 			multiAnswers : ['Strawberry Fields Forever','Yesterday','Hey Jude'],
			answer : 0
		},
 		{	question : 'What Beatles album was Phil Spector brought in to salvage?',
 			multiAnswers : ['White Album','Let It Be','Abbey Road'],
			answer : 1
		},
 		{	question : 'Which album required over 700 hours of recordings?',
 			multiAnswers : ['Abbey Road','Sgt. Pepper\'s Lonely Hearts Club Band','White Album'],
			answer : 1
		},
 		{	question : 'In what Beatles song did George Harrison first play the sitar?',
 			multiAnswers : ['Across the Universe','Norwegian Wood','Within You, Without You'],
			answer : 1
		},
 		{	question : 'What is the only song John Lennon recorded completely by himself during his time with the Beatles?',
 			multiAnswers : ['Julia','In My Life','Only a Northern Song'],
			answer : 0
		},
 		{	question : 'What did John Lennon change his middle name to?',
 			multiAnswers : ['Peace','Winston','Ono'],
			answer : 2
		},
 		{	question : 'The Beatles gave their first live U.S. television performance on what show?',
 			multiAnswers : ['The Ed Sullivan Show','The Dick Van Dyke Show','The Tonight Show'],
			answer : 0
		},
 		{	question : 'What was the Beatles\' first single to sell a million copies?',
 			multiAnswers : ['Can\'t Buy Me Love','Hey Jude','She Loves You'],
			answer : 2
		}];

var currentQuestionIndex = 0,
    unanswered = 0,
    incorrectAnswers = 0,
    correctAnswers = 0;

function getNewQuestion(i){
  var qno = i + 1,
      question = trivia[i].question,
      option0 = trivia[i].multiAnswers[0],
      option1 = trivia[i].multiAnswers[1],
      option2 = trivia[i].multiAnswers[2],
      answerIndex = trivia[i].answer,
      answer = trivia[i].multiAnswers[answerIndex];

  var questionTemplate ='<div class="question-container question-container-'+ qno +'">'+
    '<div class="question-label">Question <span class="question-number">'+ qno +'</span>:</div>'+
    '<div class="question-area">'+ question +'</div>'+
    '<div class="question-options">'+
      '<div class="option-1">'+ option0 +'</div>'+
      '<div class="option-2">'+ option1 +'</div>'+
      '<div class="option-3">'+ option2 +'</div>'+
    '</div>'+
  '</div>';
  
  $('.question-container-wrap').html(questionTemplate);
}

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.text(seconds);

    if (--timer < 0) {
      timer = duration;
      nextQuestion('timedOut');
    }
  }, 1000);
  
}

// 
$(function () {
  startTimer(59, $('.time'));
  getNewQuestion(0);
  var correctOption = trivia[currentQuestionIndex].answer;
  $('.question-options').children().eq(correctOption).addClass('option-correct');
});


$('.question-container-wrap').delegate('.question-options div', 'click', function(){
  if($(this).hasClass('option-correct')) {
    nextQuestion('correct');
  } else {
    nextQuestion('incorrect');
  }
});


function nextQuestion(prevResult){

  if (prevResult === 'correct') {
    $('.correct').removeClass('hidden');
    $('body').addClass('covered');
    console.log('correct');
    correctAnswers++;
  }

  if (prevResult === 'incorrect'){
    $('.wrong').removeClass('hidden');
    $('.wrong').find('.result-answer').text(trivia[currentQuestionIndex].multiAnswers[trivia[currentQuestionIndex].answer]);
    $('body').addClass('covered');
    incorrectAnswers++;
  }

  if (prevResult === 'timedOut'){
    $('.times-up').find('.result-answer').text(trivia[currentQuestionIndex].multiAnswers[trivia[currentQuestionIndex].answer]);
    $('.times-up').removeClass('hidden');
    $('body').addClass('covered');
    unanswered++;
  }
  
  clearInterval(timerInterval);
  setTimeout(function(){
    currentQuestionIndex++;
    $('.result').addClass('hidden');
    $('body').removeClass('covered');
	if (currentQuestionIndex <= trivia.length) {
	    getNewQuestion(currentQuestionIndex);
	} else {
		showFinal();
	}
    
    var correctOption = trivia[currentQuestionIndex].answer;
    $('.question-options').children().eq(correctOption).addClass('option-correct');
    startTimer(59, $('.time'));
  }, 2000);
  
}


//After last question's score is incremented display "Totals"
//display a button click "Start Over"


function showFinal(){
     $('.final').find('.result-answer').text("<h3>Total Correct: " + correctAnswers + "</h3>");
     $('.final').find('.result-answer').text("<h3>Total Incorrect: " + incorrectAnswers + "</h3>");
     $('.final').find('.result-answer').text("<h3>Total Unanswered: " + unanswered + "</h3>");
     $('.start-over').removeClass("hidden");

     startTimer(59, $('.time'));
  	 getNewQuestion(0);
  	 var correctOption = trivia[currentQuestionIndex].answer;
  	 $('.question-options').children().eq(correctOption).addClass('option-correct');
}

//When "Start Over" button is clicked, reset game without page reload, clear out totals to previous game

