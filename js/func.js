var nro = 0;
var array_user_answers = [];


$('.choice').on('click', function(){
	get_quiz($(this).attr('id'));
	
});

function get_quiz(id){
	
	let api_url = "https://opentdb.com/api.php?amount=10&category=";

	if(id === 'music'){
		full_url = api_url + '12&type=multiple&encode=url3986';

	}	
	else if(id === 'film'){
		full_url = api_url + '11&type=multiple&encode=url3986';
	}
	else if(id === 'games'){
		full_url = api_url + '15&type=multiple&encode=url3986';
	}
	else if(id === 'science'){
		full_url = api_url + '17&type=multiple&encode=url3986';
	}
	else if(id === 'anime'){
		full_url = api_url + '31&type=multiple&encode=url3986';
	}
	else if(id === 'history'){
		full_url = api_url + '23&type=multiple&encode=url3986';
	}
	else if(id === 'celebrities'){
		full_url = api_url + '26&type=multiple&encode=url3986';
	}
	else if(id === 'sports'){
		full_url = api_url + '21&type=multiple&encode=url3986';
	}
	


	set_quiz(full_url);
}


function set_quiz(full_url){
	$('#buttons').empty();


	const api_request = new XMLHttpRequest();
	api_request.open('POST', full_url);

	//var array_user_answers = [];

	api_request.onload = function(){
		var questions = JSON.parse(api_request.responseText);
		

		theQuiz(questions);
		
		
	};
	api_request.send();

}


function theQuiz(quest){
	if(nro < 10){
		var q = decodeURIComponent(quest.results[nro].question);
		var options = [decodeURIComponent(quest.results[nro].correct_answer), 
						decodeURIComponent(quest.results[nro].incorrect_answers[0]),
						decodeURIComponent(quest.results[nro].incorrect_answers[1]),
						decodeURIComponent(quest.results[nro].incorrect_answers[2])];

		//shuffle the options
		for(let i = options.length - 1; i > 0; i--){
			const j = Math.floor(Math.random() * i);
			const temp = options[i];
			options[i] = options[j];
			options[j] = temp;
		}

		renderTemplate(q, options);
	}


	$('.answer_button').on('click', function(){

		array_user_answers.push( $(this).text() );
		nro++;

		if(nro < 10){
			theQuiz(quest);
		}
		else{

			let nCorrect = calcResults(quest);
			nro = 0;
			
			array_user_answers = [];
			$('#quiz_question').empty();

			//show the score screen
			scoreScreen(nCorrect);

			
		}
	});

}


function scoreScreen(nCorrect){
	var text_screen = "";
	var url_gif = "";

	if(nCorrect === 0){
		text_screen = "Stupid test!!!";
		url_gif = 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif';
	}
	else if(nCorrect > 0 && nCorrect <= 3){
		text_screen = "Well, you can try again.. We learn new things all the time!";
		url_gif = 'https://media.giphy.com/media/l22ysLe54hZP0wubek/giphy.gif';
	}
	else if(nCorrect > 3 && nCorrect <= 6){
		text_screen = "This counts as a victory, right?";
		url_gif = 'https://media.giphy.com/media/26xBKlTBLN10xp7oc/giphy.gif';
	}
	else if(nCorrect > 6 && nCorrect <= 9){
		text_screen = "You are good on this!";
		url_gif = 'https://media.giphy.com/media/Kc3FsPX7MWtsQ/giphy.gif';
	}
	else{
		text_screen = "WHAT? We have a GENIUS here!!!";
		url_gif = 'https://media.giphy.com/media/fpXxIjftmkk9y/giphy.gif';
	}

	var newContent = '<div id="scoreScreen">';
	newContent += '<h1 id="score">Correct answers: '+nCorrect+'</h1>';
	newContent += '<figure id="animation_gif">';
	newContent += '<img src='+url_gif+'>';
	newContent += '</figure>';
	newContent += '<p id="text_score">'+text_screen+'<br></p>';
	newContent += '<button id="play_again">Play Again</button>';


	document.getElementById('content').innerHTML = newContent;

	$("#play_again").on('click', function(){
		$('#scoreScreen').empty();
		renderMainMenu();
	});
}


function renderMainMenu(){
	var newContent = '<div id="buttons">';
		newContent +='<button id="film" class="choice">';
		newContent +='<figure class="logos">';
		newContent +='<img src="img/film.png" alt="film" /></figure>';
		newContent +='<figcaption class="caption_logo">Film</figcaption></button>';
		newContent +='<button id="music" class="choice">';
		newContent +='<figure class="logos">';
		newContent +='<img src="img/music.png" alt="music" /></figure>';
		newContent +='<figcaption class="caption_logo">Music</figcaption></button>';
		newContent +='<button id="games" class="choice">';
		newContent +='<figure class="logos">';
		newContent +='<img src="img/game.png" alt="games" /></figure>';
		newContent +='<figcaption class="caption_logo">Games</figcaption></button>';
		newContent +='<button id="science" class="choice">';
		newContent +='<figure class="logos">';
		newContent +='<img src="img/science.png" alt="science" /></figure>';
		newContent +='<figcaption class="caption_logo">Science</figcaption></button>';
		newContent +='<button id="anime" class="choice">';
		newContent +='<figure class="logos">';
		newContent +='<img src="img/tv.png" alt="anime" /></figure>';					
		newContent +='<figcaption class="caption_logo">Anime</figcaption></button>';				
		newContent +='<button id="history" class="choice">';
		newContent +='<figure class="logos">';
		newContent +='<img src="img/history.png" alt="history" /></figure>';
		newContent +='<figcaption class="caption_logo">History</figcaption></button>';
		newContent +='<button id="celebrities" class="choice">';
		newContent +='<figure class="logos">';
		newContent +='<img src="img/star.png" alt="celebrities" /></figure>';
		newContent +='<figcaption class="caption_logo">Celebrities</figcaption></button>';
		newContent +='<button id="sports" class="choice">';
		newContent += '<figure class="logos">';
		newContent += '<img src="img/trophy.png" alt="sports" /></figure>';
		newContent += '<figcaption class="caption_logo">Sports</figcaption></button></div>';

		document.getElementById('content').innerHTML = newContent;

		$('.choice').on('click', function(){
			get_quiz($(this).attr('id'));
	
		});
				
}

function calcResults(quest){
	var correct = 0;

	for(var i = 0; i < 10; i++){
		if(array_user_answers[i] == decodeURIComponent(quest.results[i].correct_answer)){
			correct++;
		}
	}

	return correct;
}


function renderTemplate(theQuestion, options){
	var newContent = '<div id="quiz_question">';
	newContent += '<h2 id="question">' + theQuestion + '</h2>';
	newContent += '<button id="0" class="answer_button">' + options[0] + '</button><br>';
	newContent += '<button id="1" class="answer_button">' + options[1] + '</button><br>';
	newContent += '<button id="2" class="answer_button">' + options[2] + '</button><br>';
	newContent += '<button id="3" class="answer_button">' + options[3] + '</button> </div>';


	if($('#quiz_question').length){
		$('#quiz_question').empty();
	}

	document.getElementById('content').innerHTML = newContent;

}

