function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


button = document.querySelector("#button");
audio = document.querySelector("audio");
imageDiv = document.getElementsByClassName("animate-flicker")[0]
rotatingImage = document.getElementsByClassName("rotate")[0]


signupMessage="Sign Up For The NewZLetter"



ghostText = document.createElement("div")
ghostText.classList.add('signup')
ghostText.style.position = "absolute"
ghostText.style.visibility = "hidden"
ghostText.style.height = "auto"
ghostText.style.width = "auto"
ghostText.style.whiteSpace = "nowrap"
ghostText.innerHTML = signupMessage
document.querySelector("body").appendChild(ghostText)
textWidth = ghostText.getBoundingClientRect().width

text = document.createElement("div")
text.classList.add('signup');
text.style.display = "none"
document.querySelector("body").appendChild(text)
text.addEventListener("click",function(){window.open("https://zombo.com/join1.htm",'_self',false);})
console.log(textWidth)
text.style.marginLeft = (window.innerWidth/2 - textWidth/2)+"px"


window.onresize = function() { text.style.marginLeft = (window.innerWidth/2 - textWidth/2)+"px" }

//write a message one character at a time into the element
//prints capital Z as red
async function typewrite(message,durationMs,element) {
    pauseTimeMs = durationMs/message.length
    element.innerHTML = ""

    for(i=0;i<message.length;i++) {
        if(message[i] === 'Z') {
            element.innerHTML += "<div style='color:red;display:inline-block;'>"+message[i]+"</div>"
        }
        else {
            element.innerHTML += message[i]
        }

        await sleep(pauseTimeMs)
    }
}

//play music, type out message, show message, and then restart
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



button.addEventListener('click',function() {
    
    //remove button when clicked, so it is not sitting in the corner being distracting
    this.remove();
    
    //audio loops by default but we need to pause at the end of it
    audio.loop = false

    //103 second audio, 4 second wait, 1 second draw words, 3 second wait, restart = loop every 111 seconds
    playSequence()
    window.setInterval(playSequence, 111*1000)
})



