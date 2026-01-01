const socket = io();
const key = "mysecretkey123"; // Replace with a secure key

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function sendMessage() {
  const input = document.getElementById('m');
  const encrypted = encrypt(input.value);
  socket.emit('chat message', encrypted);
  addMessage(`You: ${input.value}`);
  input.value = '';
}

socket.on('chat message', msg => {
  const decrypted = decrypt(msg);
  addMessage(`Friend: ${decrypted}`);
});

function addMessage(text) {
  const li = document.createElement('li');
  li.textContent = text;
  document.getElementById('messages').appendChild(li);
}
