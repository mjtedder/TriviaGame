//todo: add images after each question is correctly or incorrectly answered
//todo: randomize questions

// WHERE GAME APPEARS IN HTML
var quizArea = $('#question-div')
countStartNumber = 120

// QUESTIONS ARRAY OF OBJECTS
var questions = [{
    question: "What city does the show take place?",
    choices: ["Des Moines", "Charlotte", "Albuquerque", "Denver"],
    correct: "Albuquerque"
  },
  {
    question: "What is the name of the first buyer Walter White meets?",
    choices: ["Pancakez", "Junior", "Krazy 8", "Scarface"],
    correct: "Krazy 8"
  },
  {
    question: "What was the name of the plant that Walt used to poison Brock",
    choices: ["Lily of the Valley", "Yellow Jessamine", "Palma Christi", "Sunflower"],
    correct: "Lily of the Valley",
  },
  {
    question: "What is Walt's main car in the series?",
    choices: ["1986 Toyota Tercel", "2004 Pontiac Aztec", "2005 Mazda 3", "2006 Chrysler PT Cruiser"],
    correct: "2004 Pontiac Aztec",
  },
  {
    question: "What is the street name for the ultra-pure product that Walt manufacturers?",
    choices: ["Crystal", "Crank", "Ice", "Blue"],
    correct: "Blue",
  },
  {
    question: "In Season 2, what is the occupation of Jesse's girlfriend Jane's father?",
    choices: ["Pilot", "Bus Driver", "Police Officer", "Air Traffic Controller"],
    correct: "Air Traffic Controller",
  },
  {
    question: "What is the address of the White family?",
    choices: ["290 Wrong Way", "357 Main Street", "400 Azul Blanco Road", "308 Negra Arroya Lane"],
    correct: "308 Negra Arroya Lane",
  },
  {
    question: "What is the name of the crooked lawyer Walt & Jesse employs when one of their dealers are arrested?",
    choices: ["Drew Scales", "Phoenix Wright", "Howard Hamlin", "Saul Goodman"],
    correct: "Saul Goodman",
  },
  {
    question: "In season 2, how many people died in the plane crash?",
    choices: ["100", "2", "345", "167"],
    correct: "345",
  },
  {
    question: "When Jesse wanted out, who does Walt take on as his new sidekick?",
    choices: ["Badger", "Spooge", "Todd", "Gale"],
    correct: "Todd",
  }
];

// VARIABLE TO HOLD JS SETINTERVAL METHOD
var timer;

// GAME OBJECT CONTAINING VARIABLES AND METHODS NEEDED TO PLAY
var game = {
  correct: 0,
  incorrect: 0,
  counter: 12,
  // Decrements timer and displays in HTML, ends game if counter reaches 0
  // Starts timer
  start: function () {
    $('#start').hide();
    $('#submit').show();
    timer = setInterval(game.countdown, 1000);
    game.countdown();
    for (var i = 0; i < questions.length; i++) {
      $('#questions').append('<h2>' + questions[i].question + '</h2>');
      for (var j = 0; j < questions[i].choices.length; j++) {
        $('#questions').append("<input type='radio' name='question-" + i + "' value='" + questions[i].choices[j] + "''>" + "     " + questions[i].choices[j] + "    ");
      }
    }
    $('#questions').removeClass('d-none');
    $('#questions').css('color', 'white');
  },
  countdown: function () {
    game.counter--;
    // console.log(game.counter);
    $('#timer').html('<h1>' + game.counter + '</h1>');
    $('#timer').removeClass('d-none');
    if (game.counter === 0) {
      game.done();
    }
  },
  done: function () {
    clearInterval(timer);
    $.each($('input[name="question-0"]:checked'), function () {
      if ($(this).val() === questions[0].correct) {
        console.log("CORRECT!");
        game.correct++;
      } else {
        game.incorrect++;
      }
    })
    $.each($('input[name="question-1"]:checked'), function() {
      if($(this).val() === questions[1].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    $.each($('input[name="question-2"]:checked'), function() {
      if($(this).val() === questions[2].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    $.each($('input[name="question-3"]:checked'), function() {
      if($(this).val() === questions[3].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    $.each($('input[name="question-4"]:checked'), function() {
      if($(this).val() === questions[4].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    $.each($('input[name="question-5"]:checked'), function() {
      if($(this).val() === questions[5].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    $.each($('input[name="question-6"]:checked'), function() {
      if($(this).val() === questions[6].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    $.each($('input[name="question-7"]:checked'), function() {
      if($(this).val() === questions[7].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    $.each($('input[name="question-8"]:checked'), function() {
      if($(this).val() === questions[8].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    $.each($('input[name="question-9"]:checked'), function() {
      if($(this).val() === questions[9].correct) {
        game.correct++;
      } else {
        console.log("INCORRECT!");
        game.incorrect++;
      }
    })
    game.result();
  },
  result: function () {
    $('.modal-body').append('<h1>CORRECT: ' + game.correct + '</h1><br><h1>INCORRECT: ' + game.incorrect + '</h1>')
    $('#resultModal').modal('show');
  }
}

// CLICK EVENTS
$('#start').click(function () {
  game.start();
})

$('#submit').click(function() {
  game.done();
})

$('#restart').click(function() {
  location.reload();
})