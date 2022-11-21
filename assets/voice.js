const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var textbox=$("#textarea");
var instructions = $('.instructions');
var content='';
recognition.continuous=true;
recognition.onstart=function(){
    instructions.text("Voice recognition is On");
}

recognition.onend = () => {
    instructions.text("Start");
}
recognition.onerror=function(){
    instructions.text("Try again");
}
recognition.onresult=function(event){
    var current=event.resultIndex;
    var transcript= event.results[current][0].transcript;
    content+=transcript;
    textbox.val(content);
}
$(".voice-on").click(function(event){
    if(content.length){
        content += ''
    }
    $("button").removeClass("voice-on").addClass("voice-off");
    recognition.start();
})
$(".voice-off").click(function(event){
    $("button").removeClass("voice-off").addClass("voice-on");
    recognition.stop();  
})
$(".send-btn").click(function(event){
    content='';
})
textbox.on('input',function(){
    content=$(this).val();
})