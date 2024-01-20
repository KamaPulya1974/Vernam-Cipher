var message = (document.getElementById("GET-input")); // обект исходного сообщения
var outputField = document.getElementById("GET-output"); // объект полученного сообщения
var goCryptButton = document.getElementById("goCrypt"); // кнопка шифровки
var goDecryptButton = document.getElementById("goDecrypt"); // кнопка шифровки
var clearButton = document.getElementById("clearButton"); // кнопка очистки
var keyField = document.getElementById("keyField"); // объект поля ключа
var key = []; // ключ

// Функция для преобразования текста в массив чисел
function stringToNumbers(text) {
  const numbers = [];
  for (let i = 0; i < text.length; i++) {
    numbers.push(text.charCodeAt(i));
  }
  return numbers;
}

// Функция для преобразования массива чисел в текст
function numbersToString(numbers) {
  let text = "";
  for (let i = 0; i < numbers.length; i++) {
    text += String.fromCharCode(numbers[i]);
  }
  return text;
}

// Функция для генерации случайного ключа заданной длины
function generateKey(length) {
  const key = [];
  for (let i = 0; i < length; i++) {
    key.push(Math.floor(Math.random() * 256)); // Генерируем случайное число от 0 до 255
  }
  return key;
}

// Функция для шифрования сообщения с использованием ключа
function encrypt(message, key) {
  const encryptedMessage = [];
  for (let i = 0; i < message.length; i++) {
    const encryptedByte = message[i] ^ key[i]; // Вычисляем побитовое XOR для каждого байта сообщения и ключа
    encryptedMessage.push(encryptedByte);
  }
  return encryptedMessage;
}

// Функция для расшифровки зашифрованного сообщения с использованием ключа
function decrypt(encryptedMessage, key) {
  const decryptedMessage = [];
  for (let i = 0; i < encryptedMessage.length; i++) {
    const decryptedByte = encryptedMessage[i] ^ key[i]; // Вычисляем побитовое XOR для каждого зашифрованного байта и ключа
    decryptedMessage.push(decryptedByte);
  }
  return decryptedMessage;
}




// функция шифровки
goCryptButton.onclick = function () {
    // берём сообщение из поля
    var messageText = message.value;
    console.log("сообщение ", messageText)

    // создаём ключ
    key = generateKey(messageText.length);
    keyField.innerHTML = key;

    console.log("ключ ", key);

    // Преобразуем текст сообщения в массив чисел
    const numbers = stringToNumbers(messageText);
    console.log("сообщение в числах", numbers);

    // Шифруем сообщение с использованием ключа
    const encryptedNumbers = encrypt(numbers, key);
    console.log("шифр в числах", encryptedNumbers);

    // конвертируем полученный шифр в строку
    var output = numbersToString(encryptedNumbers);
    console.log("шифр", output)

    // записываем результат в поле
    outputField.innerHTML = output;
}


// функция дешифровки
goDecryptButton.onclick = function () {
    // берём шифр из поля
    var cipher = outputField.innerHTML;
    console.log("шифр ", outputField.innerHTML);

    // ключ оставляем неизменным
    console.log("ключ ", key);

    // преобразуем в числа
    const numbers = stringToNumbers(outputField.innerHTML);
    console.log("шифр в числах", numbers);

    // дешифруем
    var decrypted = decrypt(numbers, key);
    console.log("сообщение в числах", decrypted);

    // преобразуем обратно в строку
    var output = numbersToString(decrypted);
    console.log("сообщение", output);

    // записываем в поле
    outputField.innerHTML = output;

    // в поле сообщения записываем исходный шифр
    message.value = cipher;
}


// функция очистки полей
clearButton.onclick = function () {
    // чистим поле сообщения
    message.value = "";

    // чистим ключ
    keyField.innerHTML = "";
    key = [];

    // чистим шифр
    outputField.innerHTML = "";
}