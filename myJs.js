let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];//to track of random game pattern
let started = false;
let userClickedPattern = []; //to take track of user click pattern

$(".btn").click(function () {
 
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);//push the current clicked


    playSound(userChosenColour);
    animatePress(userChosenColour);
    
  //after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);

});
// generate nextSequence
function nextSequence() {
  //for next sequence new Arr
  userClickedPattern = [];
 
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  $("#" + randomChosenColour)
    .fadeOut(60)
    .fadeIn(60)
    .fadeOut(60)
    .fadeIn(60);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);

}

function playSound(name) {
  let audioElement = new Audio("sounds/" + name + ".mp3");

  audioElement.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

let level = 0;

//1st key press to start
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//check answer
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

