var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;



function nextSequence() {

	userClickedPattern = [];
	var randomNumber = Math.floor((Math.random() * 4));
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 

	playSound(randomChosenColor);

	level++;

	$("#level-title").text("Level " + level);

}

// <-----------------   Mouse Events ----------------------->

$(".btn").click(function() {
	
	var userChosenColor = $(this).attr("id");

	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);

	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length - 1);

	// console.log(userClickedPattern);
});

function playSound(name) {

	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	
	$("#" + currentColor).addClass("pressed");

	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100)
}


// <-----------------   Keyboard Events ----------------------->

$(document).keypress(function() {

	if(level === 0) { 

		$("#level-title").text("Level " + level);
		nextSequence();
	}
});


// <-----------------   Mobile-Click Events ----------------------->

$("#mobBtn").click(function() {

	if(level === 0) { 

		$("#level-title").text("Level " + level);
		nextSequence();
	}
});


function checkAnswer(currentLevel) {

	if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
	{
		// console.log("Success");

		if (userClickedPattern.length === gamePattern.length){

	        setTimeout(function () {
	          nextSequence();
	        }, 1000);

	    }
	}
	else
	{
		// console.log("Wrong");

		var audio1 = new Audio("sounds/wrong.mp3");
		audio1.play();

		$("body").addClass("game-over")

		setTimeout(function(){
			$("body").removeClass("game-over")
		}, 200) 

		$("#level-title").text("Game Over, Press Any Key to Restart");
	
		startOver();
	}
}

function startOver() {

	level = 0;
	gamePattern = [];
}