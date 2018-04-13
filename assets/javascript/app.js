//todo: add images after each question is correctly or incorrectly answered
//todo: randomize questions

//Method that allows extending jQuery with own functions
$.fn.trivia = function() {
var game = this;
game.userPick = null;
game.answers = {
  correct: 0,
  incorrect: 0
};
game.images = null;
game.count = 30;
game.current = 0;
game.questions = [{
  question: "What city does the show Breaking Bad take place?",
  choices: ["Des Moines", "Charlotte", "Albuquerque", "Denver"],
  correct: 2
}, {
  question: "What is the name of the first buyer Walter White meets?",
  choices: ["Pancakez", "Junior", "Krazy 8", "Scarface"],
  correct: 2,
}, {
  question: "What was the name of the plant that Walt used to poison Brock",
  choices: ["Lily of the Valley", "Yellow Jessamine", "Palma Christi", "Sunflower"],
  correct: 0,
}, {
  question: "What is Walt's main car in the series?",
  choices: ["1986 Toyota Tercel", "2004 Pontiac Aztec", "2005 Mazda 3", "2006 Chrysler PT Cruiser"],
  correct: 1,
}, {
  question: "What is the street name for the ultra-pure product that Walt manufacturers?",
  choices: ["Crystal", "Crank", "Ice", "Blue"],
  correct: 3,
}, {
  question: "In Season 2, what is the occupation of Jesse's girlfriend Jane's father?",
  choices: ["Pilot", "Bus Driver", "Police Officer", "Air Traffic Controller"],
  correct: 3,
}, {
  question: "What is the address of the White family?",
  choices: ["290 Wrong Way", "357 Main Street", "400 Azul Blanco Road", "308 Negra Arroya Lane"],
  correct: 3,
}, {
  question: "What is the name of the crooked lawyer Walt & Jesse employs when one of their dealers are arrested?",
  choices: ["Drew Scales", "Phoenix Wright", "Howard Hamlin", "Saul Goodman"],
  correct: 3,
}];

//Function for asking questions in game.questions array
game.ask = function() {
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
game.timer = function() {
  game.count--;
  if (game.count <= 0) {
    setTimeout(function() {
      game.nextQ();
    });
    //Appending time remaining to a div in html
  } else {
    $("#timer").html("Time remaining: " + "00:" + game.count + " secs");
  }
};
//Function for switching to next question in array
game.nextQ = function() {
  game.current++;
  clearInterval(window.triviaCounter);
  game.count = 30;
  $('#timer').html("");
  setTimeout(function() {
    game.cleanUp();
    game.ask();
  }, 1000)
};
//Removes previous question, displays score, moves onto next questions
game.cleanUp = function() {
  $('div[id]').each(function(item) {
    $(this).html('');
  });
  //Displays number of correct and incorrect answers
  $('.correct').html('Correct answers: ' + game.answers.correct);
  $('.incorrect').html('Incorrect answers: ' + game.answers.incorrect);
};
game.answer = function(correct) {
  var string = correct ? 'correct' : 'incorrect';
  game.answers[string]++;
  $('.' + string).html(string + ' answers: ' + game.answers[string]);
};
return game;
};
var Trivia;

$("#start_button").click(function() {
  $(this).hide();
  $('.result').remove();
  $('div').html('');
  Trivia = new $(window).trivia();
  Trivia.ask();
});

//Function for when user clicks a choice button..
$('#choices_div').on('click', 'button', function() {
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
  }
  game.nextQ();
});
