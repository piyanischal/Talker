
//Taking Speech API
let speech = window.speechSynthesis;

//Grab all the element necessary
let textForm = document.querySelector('form');
let textInput = document.querySelector('#inputText');
let selectVoice = document.querySelector('#language');
let pitch = document.querySelector('#pitch');
let pitchValue = document.querySelector('#pitch-value');
let textBox = document.getElementById('textbox');
let recordStart = document.getElementById('record');
let stopRecord = document.getElementById('stop');



let i;
//Array of Voices to store from API
let voices = [];
//To add voices to the option in dropdown
function addVoices(){
	voices = speech.getVoices();
	//Populating voie
	for(i = 0; i < voices.length;i++){
		//Create option for each voice
		let option = document.createElement('option');

		option.textContent = voices[i].name+ " ("+voices[i].lang+")";
		option.setAttribute('data-lang', voices[i].lang);
		option.setAttribute('data-name', voices[i].name);
		selectVoice.appendChild(option);
	}
	// console.log(voices);
}

addVoices();
//Check if the voice option is not null
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = addVoices;
}


function onSubmit(evt){
	evt.preventDefault();
	let speakWord = new SpeechSynthesisUtterance(textInput.value);
	//speechSynthesisUtterance to speak the value from text field
	let optionSelected = selectVoice.selectedOptions[0].getAttribute('data-name');
		//Check for the voices in the voice list
		for(i = 0; i < voices.length ; i++) {
			if(voices[i].name === optionSelected) {
				speakWord.voice = voices[i];
				}
		}
		speakWord.pitch = pitch.value;
		pitchValue.textContent = pitch.value;
			speech.speak(speakWord);



}

function onLangChange(evt){
	speech.speak(speakWord);
}




//On changing the language it chages the accent

//------------------Speech Recognition ---------------------//
let recordVoice = new webkitSpeechRecognition() || new SpeechRecognition();
let interimResults;
let continuous;
let isFinal;
let myText;

let maxAlternatives;
recordVoice.lang = 'en-US';

//interimResults is changing the rate of response to be typed
recordVoice.interimResults = true;

//continuous  -- to make the recording continuous
recordVoice.continuous = true;

//to check if the the recording is done
recordVoice.isFinal = false;


//Starts listening to the user's voice.
function onRecord(evt){
	alert("Voice Recognition Activated!");
	recordVoice.start(continuous,interimResults);
	recordVoice.onresult = showResult;
	console.log(recordVoice);

}

//Display the speech text
function showResult(evt){
	console.log(evt.results);
		textBox.value = evt.results[0][0].transcript;

}


//Deactivates the voice recognition
function stopRecording(evt){
	alert("Voice recognition Deactivated!")
	recordVoice.stop();

}

//Speaks the word
textForm.addEventListener('submit',onSubmit);
//On voice change
selectVoice.addEventListener('change',onLangChange);
//On pitch change changes the intensity of the sound.
pitch.addEventListener('change', onSubmit);

recordStart.addEventListener('click', onRecord);
stopRecord.addEventListener('click', stopRecording);
