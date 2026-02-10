
let user=null, currentFriend=null;

function login(){
  user=document.getElementById('username').value;
  if(!user) return;
  localStorage.setItem('sq1_user',user);
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('chat').classList.remove('hidden');
  loadFriends();
}

function addFriend(){
  let f=document.getElementById('friendName').value;
  if(!f) return;
  let fs=JSON.parse(localStorage.getItem(user+'_friends')||'[]');
  if(!fs.includes(f)) fs.push(f);
  localStorage.setItem(user+'_friends',JSON.stringify(fs));
  loadFriends();
}

function loadFriends(){
  let list=document.getElementById('friends');
  list.innerHTML='';
  let fs=JSON.parse(localStorage.getItem(user+'_friends')||'[]');
  fs.forEach(f=>{
    let li=document.createElement('li');
    li.innerText=f;
    li.onclick=()=>openChat(f);
    list.appendChild(li);
  });
}

function openChat(f){
  currentFriend=f;
  document.getElementById('chatWith').innerText='Chat with '+f;
  loadMsgs();
}

function sendMsg(){
  let m=document.getElementById('msgInput').value;
  if(!m||!currentFriend) return;
  let key=user+'_'+currentFriend;
  let msgs=JSON.parse(localStorage.getItem(key)||'[]');
  msgs.push(user+': '+m);
  localStorage.setItem(key,JSON.stringify(msgs));
  document.getElementById('msgInput').value='';
  loadMsgs();
}

function loadMsgs(){
  let box=document.getElementById('msgs');
  box.innerHTML='';
  let key=user+'_'+currentFriend;
  let msgs=JSON.parse(localStorage.getItem(key)||'[]');
  msgs.forEach(m=>{
    let d=document.createElement('div');
    d.innerText=m;
    box.appendChild(d);
  });
}
