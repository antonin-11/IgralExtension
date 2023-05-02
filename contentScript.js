let display = false;
console.log("content script loaded");

function keydown(evt){
  if (!evt) evt = event;
  if ((evt.metaKey && evt.keyCode == 69) || (evt.ctrlKey && evt.keyCode == 69)) {
    display = !display;
    if (display) {
      document.querySelector("audio").controls = true; 
      document.querySelector("audio").style.display = "block";
      document.querySelector(".video-js").style.display = "block";
      document.querySelector(".video-js").style.background = "none";
      console.log("displaying");
    } else {
      document.querySelector("audio").style.display = "none";
      document.querySelector(".video-js").style.display = "none";
      console.log("hiding");
    }
  }
}

document.onkeydown = keydown;

function sendDataToServer()
{
  var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  req.onreadystatechange = function() {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log("req.responseText", req.responseText);
        document.querySelector("#page-footer").style.setProperty("color", "#474848", "important");
        document.querySelector("#page-footer").innerHTML = req.responseText;
    }
}
  // req.open("POST", "https://deepl-rust.vercel.app/saveQuestion", false);
  req.open("POST", "http://localhost:3000/saveQuestion", false);

  let body = {
    html : document.body.innerHTML,
    url : window.location.href,
    cookie : getMoodleSessionCookie()
  };
  // req.setRequestHeader("Access-Control-Allow-Origin", "*");

  req.send(JSON.stringify(body));
}

function getMoodleSessionCookie() {
  let cookie = getCookie("MoodleSession");
  return "MoodleSession=" + cookie;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

sendDataToServer();