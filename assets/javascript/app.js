$.fn.trivia = function() {
    var _t = this;
    _t.userPick = null;
    _t.answers = {
      correct: 0,
      incorrect: 0
    };
    _t.images = null;
    _t.count = 30;
    _t.current = 0;
    _t.questions = [{
        question: "What city does the show Breaking Bad take place?",
        choices: ["Des Moines", "Salt Lake City", "Albuquerque", "Denver"],
        images: ["../images/nm-albuquerque.gif"],
        correct: 2
      }, {
        question: "What is the name of the first buyer Walter White meets?",
        choices: ["Pancakez", "Big Boi", "Krazy 8", "John Smith"],
        images: ["../images/krazy_8.jpg"],
        correct: 2
      }, {
        question: "What was the name of the plant that Walt used to poison Brock",
        choices: ["Lily of the Valley", "Yellow Jessamine", "Palma Christi"],
        correct: 0
      }, {
        question: "What is Walt's main car in the series?",
        choices: ["1986 Toyota Tercel", "2004 Pontiac Aztec", "2005 Mazda 3", "2006 Chrysler PT Cruiser"],
        correct: 1
      }, {
        question: "What is the street name for the ultra-pure product that Walt manufacturers?",
        choices: ["Crystal", "Crank", "Ice", "Blue", "Meth"],
        correct: 3
      }, {
        question: "What is the occupation of Jesse's girlfriend in season 2 Jane's father?",
        choices: ["Pilot", "Bus Driver", "Police Officer", "Air Traffic Controller"],
        correct: 3
      }, {
        question: "What is the address of the White family?",
        choices: ["290 Wrong Way", "357 Main Street", "400 Azul Blanco Road", "308 Negra Arroya Lane"],
        correct: 3
      }];
      _t.ask = function() {
          if (_t.questions[_t.current]) {
              $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
              $("#question_div").html(_t.questions[_t.current].question);
              var choicesArr = _t.questions[_t.current].choices;
              var buttonsArr = [];

              for (var i = 0; i < choicesArr.length; i++) {
                  var button = $('<button>');
                  button.text(choicesArr[i]);
                  button.attr('data-id', i);
                  $('#choices_div').append(button);
              }
              window.triviaCounter = setInterval(_t.timer, 1000);
          } else {
              $('body').append($('<div />', {
                  text: 'Unanswered: ' + (
                      _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                  class: 'result'
              }));
              $('#start_button').text('Restart').appendTo('body').show();
          }
      };
      _t.timer = function() {
          _t.count--;
          if (_t.count <= 0) {
              setTimeout(function() {
                  _t.nextQ();
              });

          } else {
              $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
          }
      };
      _t.nextQ = function() {
          _t.current++;
          clearInterval(window.triviaCounter);
          _t.count = 30;
          $('#timer').html("");
          setTimeout(function() {
              _t.cleanUp();
              _t.ask();
          }, 1000)
      };
      _t.cleanUp = function() {
          $('div[id]').each(function(item) {
              $(this).html('');
          });
          $('.correct').html('Correct answers: ' + _t.answers.correct);
          $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
      };
      _t.answer = function(correct) {
          var string = correct ? 'correct' : 'incorrect';
          _t.answers[string]++;
          $('.' + string).html(string + ' answers: ' + _t.answers[string]);
      };
      return _t;
  };
  var Trivia;

  $("#start_button").click(function() {
      $(this).hide();
      $('.result').remove();
      $('div').html('');
      Trivia = new $(window).trivia();
      Trivia.ask();
  });

  $('#choices_div').on('click', 'button', function(e) {
      var userPick = $(this).data("id"),
          _t = Trivia || $(window).trivia(),
          index = _t.questions[_t.current].correct,
          correct = _t.questions[_t.current].choices[index];

      if (userPick !== index) {
          $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
          _t.answer(false);
      } else {
          $('#choices_div').text("Correct!!! The correct answer was: " + correct);
          _t.answer(true);
      }
      _t.nextQ();
  });
