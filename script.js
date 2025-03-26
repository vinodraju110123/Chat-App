let chatHistories = {}; 
let currentUser = null; 

document.addEventListener("DOMContentLoaded", function () {
    let firstUser = document.querySelector("#users .userslist");
    if (firstUser) {
        openChat(firstUser); 
    }
});

function openChat(element) {

    document.querySelectorAll(".userslist").forEach(user => {
        user.classList.remove("active");
    });

    // Add 'active' class to the clicked user
    element.classList.add("active");

    let imgSrc = element.querySelector("img").src;
    let userName = element.querySelector("h6").textContent;
    let content = element.querySelector("span").textContent;
    
    let image = document.getElementById('chat-image');
    let name = document.getElementById('chat-name');
    let innerContent = document.getElementById('chat-role');
    let chatBox = document.getElementById('chatBox');

    image.src = imgSrc;
    name.textContent = userName;
    innerContent.textContent = content;

   
    currentUser = userName;

    
    if (!chatHistories[currentUser]) {
        chatHistories[currentUser] = [];
    }

    chatBox.innerHTML = chatHistories[currentUser].join('');
}

function sendMessage() {
    if (!currentUser) {
        alert("Please select a user to chat with.");
        return;
    }

    let messageInput = document.getElementById('message');
    let chatBox = document.getElementById('chatBox');
    let value = messageInput.value.trim();

    if (value === "") return;

    let messageHTML = `<div class="inner-message">${value}</div>`;

    chatHistories[currentUser].push(messageHTML);

    chatBox.innerHTML += messageHTML;

    messageInput.value = "";
    updateMessageStats();
}

document.getElementById("menu").addEventListener("click", function () {
    let options = document.getElementById("options");
    options.classList.toggle("hidden"); 
});

document.addEventListener("click", function (event) {
    let menu = document.getElementById("menu");
    let options = document.getElementById("options");

    if (!menu.contains(event.target) && !options.contains(event.target)) {
        options.classList.add("hidden");
    }
});

function selectTheme(e){
  console.log(e.target.value);
  let header = document.querySelectorAll('.header');
 header.forEach(element => {
    element.style.backgroundColor = e.target.value;
 });
 let send = document.getElementById('send-message');
    send.style.backgroundColor = e.target.value;
    let chat = document.querySelectorAll('.inner-message');
    chat.forEach(element => {
        element.style.backgroundColor = e.target.value;
    });
    let messageStats = document.getElementById('message-stats');
    messageStats.style.color = e.target.value;
    let menu = document.getElementById('menu');
    menu.style.backgroundColor = e.target.value;
}

function changeBg(event) {
    let chatBox = document.getElementById("chatBox");
    let selectedImage = event.target.value;
    
    if (selectedImage) {
        chatBox.style.backgroundImage = `url(${selectedImage})`;
    }
}

function filterUsers() {
    let searchInput = document.getElementById("search").value.toLowerCase();
    let users = document.querySelectorAll("#users .userslist");

    users.forEach(user => {
        let name = user.querySelector("h6").innerText.toLowerCase();
        if (name.includes(searchInput)) {
            user.style.display = "flex";  // Show user
        } else {
            user.style.display = "none";  // Hide user completely
        }
    });
}

function updateMessageStats() {
    let messageInput = document.getElementById("message").value;
    let charCount = messageInput.length;
    let wordCount = messageInput.trim() ? messageInput.trim().split(/\s+/).length : 0;
    document.getElementById("message-stats").textContent = `Characters: ${charCount} | Words: ${wordCount}`;

}
