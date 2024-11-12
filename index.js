let library = document.querySelector(".save")
let hanger = document.querySelector(".hanger")
let sendusernamevalue;
let senddatacheck=true;
let senduserinfovalue;
let request="give four four world trending question";
let boolcheckformiddleimg=true;
bool = true;
let start = 0;
let boolcheckforbarcode = true;
let right=document.querySelector(".right")
library.addEventListener('click', () => {
     (bool == true) ? hanger.style.opacity = 1 : hanger.style.opacity = 0;
     bool = !bool;
})

let submitBtn = document.querySelector("#submit-btn")
let res = document.querySelector("#ai-response");
res.innerText = '';
let userInput = document.querySelector("#user-input")
let globalval;
let currentinputdata = userInput.value;
async function fetchdata() {
     if (userInput.value.trim() == '') {
          return;
     }

     logoandtittlemover();
     //this below condition isvery usefullthis condition actuallydeccidce that in which api it has to send request 
     //means in the chatbot orimg bot or qr code bot
     //according to true or false value

     //whenever data send through input box to screen then fun keep the title and logo to the top 
     //to maintain the structure
     if (boolcheckforbarcode === true && boolcheckformiddleimg === true) {
          let userdatadiv = document.createElement("div");
          userdatadiv.style.color = "black"
          userdatadiv.innerHTML = `${userInput.value.replace(/\n/g, '<br>')}`;
          res.appendChild(userdatadiv);
          right.scrollTop = right.scrollHeight;
     }
     else{
          return;
     }
    

     let responseData;


     //initialising response data in thr top toset loader functionality

    
     let loader = document.createElement("div");
     loader.innerHTML = `<div class="spinner-border" style="width: 2rem; height: 2rem;" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<div class="spinner-grow" style="width: 2rem; height: 2rem;" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
     res.appendChild(loader);
     //this loader contain circular animation 

     setTimeout(() => {
          if (globalval === undefined) {
               loader.innerHTML ="";
               res.appendChild(loader);
               errormssg();
               return;
               
          }
        
     }, 15000);

    // this part is not completed from 74 line to 96 chat gpt se chhaapa hai beech ka check this again whenever you get time
      let sendsaveddata=`{(readonlydata): ${sendusernamevalue}, info:${senduserinfovalue}}  `
       
      
     // const userInputValue = userInput && boolcheckforbarcode === true && boolcheckformiddleimg === true ? userInput.value.trim() : '';


     let userInputValue = userInput.value.trim().toLowerCase();

     let normalizedSavedData = sendsaveddata.toLowerCase();
     
     if (normalizedSavedData.includes(userInputValue)) {
         console.log("hello");
         senddatacheck=true;
     } else {
         console.log("Not found in saved data, fetching from server...");
         senddatacheck=false;
     }

        if(senddatacheck==true)
        {
          userInputValue=`{ ${sendsaveddata}} + ${userInputValue}`;
        }
     console.log(userInputValue)
     if (userInputValue !== '') {

          try {
               const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                         'x-goog-api-key': 'AIzaSyBGaRQYS8RxwtRX4yA3I91WbD4jhpzXm38'
                    },
                    body: JSON.stringify({
                         contents: [
                              {
                                   role: 'user',
                                   parts: [
                                        {
                                             text: userInputValue
                                        }
                                   ]
                              }
                         ]
                    })
               });

               responseData = await response.json();
               loader.innerHTML = "";
               // console.log(responseData.candidates[0].content.parts[0].text); // <--- Add this line to log the response data
               globalval = responseData.candidates[0].content.parts[0].text.replace(/\*/g, " ");

         
               let responsemaindiv = document.createElement("div");
               let newdiv = document.createElement("div");
               let newimg = document.createElement("img");
               newimg.classList.add("responseimg")
               newimg.style.height="30px";
               newimg.style.width="30px";
               newimg.style.marginRight="2rem";
                responsemaindiv.style.display="flex";
                responsemaindiv.style.alignItems="center";
               newdiv.style.width="85%";
                newimg.style.alignSelf="start"
               let responsemain = document.querySelector(".responsemaindiv")
               newdiv.innerText = `${globalval}`;
               newimg.src = "gemini ai logoo.jpg";
               responsemaindiv.appendChild(newimg);
               responsemaindiv.appendChild(newdiv);
              
               res.appendChild(responsemaindiv);
               logoandtittlemover();
          } catch (error) {
               console.error(error);
               errormssg();
          }
     }

}

let emptyinputdata = () => {
     userInput.value = '';
}
let errormssg=()=>{
     let newdiv=document.createElement("div");
     newdiv.innerHTML= `<div class="alert alert-danger d-flex align-items-center" role="alert">
     <svg class="bi flex-shrink-0 me-2" width="20" height="10" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
     <div>
       data not fetched due to server/internet error
     </div>
   </div>`        


   res.appendChild(newdiv);
}

function logoandtittlemover() {
     if (window.innerWidth < 600) {

          return;
     }

     let userinputempty = document.querySelector(".userinputempty");
     userinputempty.style.left = `30%`;
     userinputempty.style.top = `15%`;
     userinputempty.style.display="none"

}
// barcode function is called fromtwoplaces first from the submit btn and secoond from the onkeydownbtn
let barcodecallfun = () => {
     if (boolcheckforbarcode === false) {
          fetchbarcode();
          logoandtittlemover();
          emptyinputdata();
     }
}
let middleimg = () => {
     if (boolcheckformiddleimg === false) {
          imgonthemiddle();
          logoandtittlemover();

     }
}
submitBtn.addEventListener('click',middleimg);
submitBtn.addEventListener('click', barcodecallfun);
submitBtn.addEventListener('click', fetchdata)
submitBtn.addEventListener('click', emptyinputdata)

onkeydown = (event) => {
     // console.log(event.code)
     if (event.code == 'Enter') {
          if (boolcheckforbarcode === false) {
               fetchbarcode();
          }
          if (boolcheckformiddleimg === false) {
               imgonthemiddle();

          }
          if (userInput.value.trim() != '') {
               logoandtittlemover();
               fetchdata();
               emptyinputdata();
          }

     }
}


//  this function for convert speech to text
let recog;
// let mic=ducument.querySelector(".mic");
function speechtotext() {
     recog = new webkitSpeechRecognition();
     recog.lang = "en-US";
     recog.onresult = function (event) {
          // console.log(event.results[0][0].transcript);
          userInput.value = event.results[0][0].transcript;
     }
     // recog.onspeechend = () => {
     //      fetchdata();
     //      userInput.value = '';
     // }

}

speechtotext();

let speech = document.querySelector(".speech");
speech.addEventListener('click', () => {
     recog.start();
})





//this is code for the text to speech
let texttospeek = document.querySelector(".texttospeech")
let speektext;
let cond = true;
function texttospeech(globalval) {
     if (cond == true) {
          speektext = new SpeechSynthesisUtterance();

          speektext.lang = "en-US";
          speektext.text = globalval;

          speechSynthesis.speak(speektext)
          cond = false;
     }
     else {
          speechSynthesis.cancel();
          cond = true;
     }
}
texttospeek.addEventListener('click', (event) => {
     texttospeech(globalval);
})




let imgsource;

let barcode = document.querySelector(".barcode");

userInput.addEventListener('input', () => {
     if (event.target.value[0] === "/") {
          boolcheckforbarcode = false;
     }
     else {
          boolcheckforbarcode = true;
     }
})




//fetch bar code img from the server

async  function fetchbarcode() {
     let barcodesrc;
     let newdiv = document.createElement("div")
     newdiv.innerHTML = `<div class="spinner-grow" role="status">
     <span class="visually-hidden">Loading...</span>
    </div>`
     res.appendChild(newdiv);
     setTimeout(()=>{
          if(barcodesrc===undefined)
          {
               newdiv.innerHTML="";
               res.append(newdiv);
              errormssg();
              return;
          }
     },10000)
     let userinputsplitval = userInput.value.split('/')[1];
     let userdatadiv = document.createElement("div");
     userdatadiv.style.color = "black"


     // console.log(userinputsplitval)
      barcodesrc = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userinputsplitval}`);
     let fetchdata=await barcodesrc.blob();
      let lastqrsrc=  URL.createObjectURL(fetchdata);
     console.log(fetchdata);
          newdiv.innerHTML="";
          res.append(newdiv);
           userdatadiv.innerText = `This is your qr code of this text ${userinputsplitval}`;
     res.appendChild(userdatadiv);
     let newimg = document.createElement('img');
     newimg.src = lastqrsrc;
     res.appendChild(newimg);
}


const apiKeys = 'gLe2qjsTL2z6pZ8eY3F6l7Wgja7yc37n98hVBh8xi4YWI5t4FW97IPWy';

let val;
let imgsources = [];
let fetchimgformiddle = async () => {
     let responsedata;
     let newdiv = document.createElement("div")

     newdiv.innerHTML = `<div class="spinner-grow" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
     res.appendChild(newdiv);

     setTimeout(() => {
          console.log(responsedata)
          if (responsedata === undefined) {
               newdiv.innerHTML = "";
               // newdiv.innerText = `img not fetched this can be internet problem try again letter`
               res.appendChild(newdiv);
               errormssg();
               return;
          }
     }, 10000);
     let URLs = `https://api.pexels.com/v1/search?query=${val}&per_page=6`;
     const response = await fetch(URLs,

          {
               headers: {
                    Authorization: apiKeys
               }
          });

     responsedata = await response.json();
     newdiv.innerHTML = "";

     let userdatadiv = document.createElement("div");
     userdatadiv.style.color = "black"
     userdatadiv.innerText = `These  are your images base on your text "${val}"`
     res.appendChild(userdatadiv);
     // newdiv = document.createElement("div")
     // newdiv.classList.add("imgdiv");
     let itemsclass = document.createElement("div");
     itemsclass.classList.add("items");
     for (let i = 0; i < 6; i++) {
          imgsource = await responsedata.photos[i].src.original;
          // let newimg = document.createElement('img');
          // newimg.src = imgsource;
          // newdiv.appendChild(newimg);

          itemsclass.innerHTML += ` <div class="item" tabindex="0" style="background-image: url(${imgsource})"></div> >`
     }
     let wrapperclass = document.createElement("div");
     wrapperclass.classList.add("wrapper")
     wrapperclass.appendChild(itemsclass)
     res.append(wrapperclass);
     dwnld();
}


userInput.addEventListener('input', () => {
     if (event.target.value[0] === "#") {
          boolcheckformiddleimg = false;
     }
     else {
          boolcheckformiddleimg = true;
     }
})

function imgonthemiddle() {
     val = userInput.value.split('#')[1];
     fetchimgformiddle();
}


//we are using this fun to because if directly select .item so staticallyit does not
//present after searching img you can get this item term so i am calling this fun
//from the fetch imh fun and after creation pog item class divthis is processing
let dwnld = () => {
     let downloadimg = document.querySelectorAll(".item");

     downloadimg.forEach((element, index) => {

          element.addEventListener('dblclick', () => {
               let src = window.getComputedStyle(element).backgroundImage.slice(5, -2);
               const a = document.createElement("a");
               a.href = src;
               a.download = "vishnu's ai.jpg";
               a.click();
          })
     })
}

//left card questionm generate code



async function fetchonloaddata(receaverequest) {      
          let datarequest=receaverequest.trim();
          try {
               const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                         'x-goog-api-key': 'AIzaSyBGaRQYS8RxwtRX4yA3I91WbD4jhpzXm38'
                    },
                    body: JSON.stringify({
                         contents: [
                              {
                                   role: 'user',
                                   parts: [
                                        {
                                             text: datarequest
                                        }
                                   ]
                              }
                         ]
                    })
               });
          
               let returndata;
             returndata = await response.json();
             return returndata;

          } catch (error) {
               console.error(error);
          }
}
let  parts;
let splitval;
window.onload=async function(){
     let request=" give 4 trending question each question contain only 4 words";
     let receave;
      receave=await fetchonloaddata(request);
    let data=receave.candidates[0].content.parts[0].text.replace(/\*/g, " ");
    parts = data.trim().split('\n');
//     const[p1,p2,p3,p4]=parts;    we  can also access like this each part store in seprate block p1 p2....

    let notification=document.querySelectorAll(".notibody");

    notification.forEach((element,index)=>{
        element.innerText=`${parts[index]}`

        element.addEventListener('click',()=>{
          console.log(element.innerText)
          console.log("hello")
          splitval=element.innerText.split(`${index+1}.`)[1]; 
           userInput.value=splitval;
           console.log(userInput.value)
           fetchdata();
     })
    })
     
}



let username=document.querySelector(".user-name input");
let userinfo=document.querySelector(".user-info input");
let usernamebtn=document.querySelector("#user-name-btn");
let userinfobtn=document.querySelector("#user-info-btn");
let usernamebtncheck=true;
usernamebtn.onclick=()=>{
     if(username.value!=='')
     {
          if(usernamebtncheck==true)
          {
               sendusernamevalue=username.value;
               console.log(username.value)
               username.readOnly=true;
               usernamebtn.src="edit.png";
               usernamebtncheck=!usernamebtncheck;
          }
           else{
               console.log(username.value)
               username.readOnly=false;
               usernamebtn.src="bookmark.png";
               usernamebtncheck=!usernamebtncheck;
           }
     }
}
let userinfobtncheck=true;
userinfobtn.onclick=()=>{
     if(userinfo.value!=='')
          {
               if(userinfobtncheck==true)
               {
                    senduserinfovalue=userinfo.value;
                    userinfo.readOnly=true;
                    userinfobtn.src="edit.png";
                    userinfobtncheck=!userinfobtncheck;
               }
                else{
                    console.log(username.value)
                    userinfo.readOnly=false;
                    userinfobtn.src="bookmark.png";
                    userinfobtncheck=!userinfobtncheck;
                }
          }
}