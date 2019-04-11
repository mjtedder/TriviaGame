//todo: add images after each question is correctly or incorrectly answered
//todo: randomize questions

var quizArea = $('#quiz-area')

var questions = [{
    question: "What city does the show take place?",
    choices: ["Des Moines", "Charlotte", "Albuquerque", "Denver"],
    correct: "Albuquerque"
  },
  {
    question: "What is the name of the first buyer Walter White meets?",
    choices: ["Pancakez", "Junior", "Krazy 8", "Scarface"],
    correct: "Krazy 8"
  }, {
    question: "What was the name of the plant that Walt used to poison Brock",
    choices: ["Lily of the Valley", "Yellow Jessamine", "Palma Christi", "Sunflower"],
    correct: 0,
  }, {
    question: "What is Walt's main car in the series?",
    choices: ["1986 Toyota Tercel", "2004 Pontiac Aztec", "2005 Mazda 3", "2006 Chrysler PT Cruiser"],
    correct: "2004 Pontiac Aztec",
  }, {
    question: "What is the street name for the ultra-pure product that Walt manufacturers?",
    choices: ["Crystal", "Crank", "Ice", "Blue"],
    correct: "Blue",
  }, {
    question: "In Season 2, what is the occupation of Jesse's girlfriend Jane's father?",
    choices: ["Pilot", "Bus Driver", "Police Officer", "Air Traffic Controller"],
    correct: "Air Traffic Controller",
  }, {
    question: "What is the address of the White family?",
    choices: ["290 Wrong Way", "357 Main Street", "400 Azul Blanco Road", "308 Negra Arroya Lane"],
    correct: "308 Negra Arroya Lane",
  }, {
    question: "What is the name of the crooked lawyer Walt & Jesse employs when one of their dealers are arrested?",
    choices: ["Drew Scales", "Phoenix Wright", "Howard Hamlin", "Saul Goodman"],
    correct: "Saul Goodman",
  }, {
    question: "In season 2, how many people died in the plane crash?",
    choices: ["100", "2", "345", "167"],
    correct: "345",
  }, {
    question: "When Jesse wanted out, who does Walt take on as his new sidekick?",
    choices: ["Badger", "Spooge", "Todd", "Gale"],
    correct: "Todd",
  }
];


//Function for asking questions in game.questions array
game.ask = function () {
  if (game.questions[game.current]) {
    $("#timer").html("Time remaining: " + "00:" + game.count + " secs");
    $("#question_div").html(game.questions[game.current].question);
    var choicesArr = game.questions[game.current].choices;
    var buttonsArr = [];
    //Looping through choices in the array and appending to a button element
    for (var i = 0; i < choicesArr.length; i++) {
      var button = $('<button>');
      button.text(choicesArr[i]);
      button.attr('data-id', i);
      $('#choices_div').append(button);
    }
    window.triviaCounter = setInterval(game.timer, 1000);
  } else {
    $('body').append($('<div />', {
      text: 'Unanswered: ' + (
        game.questions.length - (game.answers.correct + game.answers.incorrect)),
      class: 'result'
    }));
    $('#start_button').text('Restart').appendTo('body').show();
  }
};
//Function for timer
game.timer = function () {
  game.count--;
  if (game.count <= 0) {
    setTimeout(function () {
      game.nextQ();
    });
    //Appending time remaining to the timer div in html
  } else {
    $("#timer").html("Time remaining: " + "00:" + game.count + " secs");
  }
};
//Function for switching to next question in array
game.nextQ = function () {
  game.current++;
  clearInterval(window.triviaCounter);
  game.count = 30;
  $('#timer').html("");
  setTimeout(function () {
    game.cleanUp();
    game.ask();
  }, 1000)
};
//Removes previous question, displays score, moves onto next questions
game.cleanUp = function () {
  $('div[id]').each(function (item) {
    $(this).html('');
  });
  //Displays number of correct and incorrect answers
  $('.correct').html('Correct answers: ' + game.answers.correct);
  $('.incorrect').html('Incorrect answers: ' + game.answers.incorrect);
};
game.answer = function (correct) {
  var string = correct ? 'correct' : 'incorrect';
  game.answers[string]++;
  $('.' + string).html(string + ' answers: ' + game.answers[string]);
};
return game;
};
var Trivia;
//Clears previous game results whens start button is clicked
$("#start_button").click(function () {
  $(this).hide();
  $('.result').remove();
  $('div').html('');
  Trivia = new $(window).trivia();
  Trivia.ask();
});

//Function for when user clicks a choice button..
$('#choices_div').on('click', 'button', function () {
  var userPick = $(this).data("id"),
    game = Trivia || $(window).trivia(),
    index = game.questions[game.current].correct,
    correct = game.questions[game.current].choices[index];

  //Conditional statement deciding what happens if choice is correct or incorrect
  if (userPick !== index) {
    $('#choices_div').text("Not even close!!! The correct answer was: " + correct);
    game.answer(false);
  } else {
    $('#choices_div').text("You're goddamn right!!! The correct answer was: " + correct);
    game.answer(true);
    //FYI this is a famous quote that Walt says in the show, just staying true to my theme//
  }
  game.nextQ();
});