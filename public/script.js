function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    addMessage("user", userInput);
    document.getElementById("userInput").value = "";

    var apiKey = "sk-76ADBqR4Eqsto6K8p8DNVGhlQi5BSQBGIxu8MKv2E6mla1KY"; // Замените YOUR_API_KEY на фактический ключ API

    fetch('https://api.theb.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": userInput
                }
            ],
            "stream": false
        })
    })
    .then(response => response.json())
    .then(data => {
        var message = data.choices[0].text;
        addMessage("chatbot", message);
    })
    .catch(error => console.log(error));
}

function addMessage(role, content) {
    var messagesDiv = document.getElementById("messages");
    var formattedMessage = `<p><strong>${role}: </strong>${content}</p>`;
    messagesDiv.innerHTML += formattedMessage;
}

var sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", sendMessage);
