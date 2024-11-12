async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;
    if (!message) return;
  
    // Kullanıcı mesajını ekrana ekleyin
    const chatBox = document.getElementById('chat-box');
    const userMessageElem = document.createElement('div');
    userMessageElem.className = 'user-message';
    userMessageElem.innerText = `Kullanıcı: ${message}`;
    chatBox.appendChild(userMessageElem);
  
    // Mesajı sunucuya gönderin
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
  
    // API yanıtını alın ve ekrana ekleyin
    const data = await response.json();
    const botReplyElem = document.createElement('div');
    botReplyElem.className = 'bot-reply';
    botReplyElem.innerText = `Bot: ${data.reply}`;
    chatBox.appendChild(botReplyElem);
  
    // Giriş alanını temizleyin
    userInput.value = '';
  }
  