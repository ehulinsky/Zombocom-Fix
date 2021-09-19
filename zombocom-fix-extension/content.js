//used to halt execution for a time in milleseconds
//usage: `await sleep(1000)`
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//find the width of a div of class 'signup' when displaying string
//this function is slightly problematic because it adds an element to the DOM every time it is called (but we only use it once right now)
function getTextWidth(string) {
    ghostText = document.createElement("div")
    ghostText.classList.add('signup')
    ghostText.style.position = "absolute"
    ghostText.style.visibility = "hidden"
    ghostText.style.height = "auto"
    ghostText.style.width = "auto"
    ghostText.style.whiteSpace = "nowrap"
    ghostText.innerHTML = signupMessage
    document.querySelector("body").appendChild(ghostText)
    return ghostText.getBoundingClientRect().width
}

//write a message one character at a time into element
//prints capital Z as red
async function typewrite(message,durationMs,element) {
    pauseTimeMs = durationMs/message.length
    element.innerHTML = ""

    for(i=0;i<message.length;i++) {
        if(message[i] === 'Z') {
            element.innerHTML += "<span style='color:red;'>"+message[i]+"</span>"
        }
        else {
            element.innerHTML += message[i]
        }

        await sleep(pauseTimeMs)
    }
}


button = document.querySelector("#button");
audio = document.querySelector("audio");
rotatingImage = document.getElementsByClassName("rotate")[0]


signupMessage="Sign Up For The NewZLetter"
textWidth = getTextWidth(signupMessage)


//create newzletter link and add to DOM
text = document.createElement("div")
text.classList.add('signup');
text.style.display = "none"
document.querySelector("body").appendChild(text)
text.addEventListener("click",function(){window.open("https://zombo.com/join1.htm",'_self',false);})
text.style.marginLeft = (window.innerWidth/2 - textWidth/2)+"px"


//recenter link when window is resized
window.onresize = function() { text.style.marginLeft = (window.innerWidth/2 - textWidth/2)+"px" }

//play music and type out message
//103 second audio, 4 second wait, 1 second draw words, 3 second wait, restart = loop every 111 seconds
async function playSequence() {

    audio.play()
    await sleep(107*1000)

    rotatingImage.style.display = "none"
    text.style.display = "inline"

    typewrite("Sign Up For The NewZLetter",1000,text)

    await sleep(1*1000)
    
    await sleep(3*1000)

    rotatingImage.style.display = "block"
    text.style.display = "none"
}

//start loop when button is clicked
button.addEventListener('click',function() {
    
    //remove button when clicked, so it is not sitting in the corner being distracting
    this.remove();
    
    //audio is set to loop in the html, but we need to pause at the end of it
    audio.loop = false

    playSequence()
    window.setInterval(playSequence, 111*1000)
})