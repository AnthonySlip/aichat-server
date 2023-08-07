# AiChat - https://anthonyslip.github.io/aichat/

Это небольшой backend, для приложения "AiChat" (деплой на https://vercel.com/).
Backend написан на платформе nodeJS с использованием фреймворка expressJS.

- Общение с чат-ботом
  Общение с чат-ботом строится на генерация ответов сервером Openai. Тут есть небольшая проблема: поскольку я использую бесплатный тарифный план на https://vercel.com/,
  генерация ответа не должна быть больше 5 секунд, иначе сервер vercel возвращает ошибку 504. Поэтому если Chat GPT генерирует длинный ответ, то он не приходит пользователю.
  НО сам чат-бот работает!
- Регистрация
  При регистрации в базе данных создается документ пользователя. А также документ с access и refresh токенами которые будут перезаписываться/удаляться при изменении состоянии авторизации пользователя.
- Верификация
  Даный сервер генерирует уникальный код и отправляет его на почту, которую указал пользователь при регистрации. На данный момент функция недоступна:  поскольку я использую бесплатный тарифный
  план на https://vercel.com/, генерация ответа не должна быть больше 5 секунд, иначе сервер vercel возвращает ошибку 504. Но сервер для отправки сообщения на почту нужно больше 5 секунд, а так
  функция протестирована и работает на локальном сервере!

В данном приложении используются следующие библиотеки:
- cookie-parser (для работы с куками)
- cors (для реализации cors)
- crypto-js (для хеширования паролей)
- dotenv (для создания переменных окружения)
- express-rate-limit (для установления ограничений на количество запросов)
- googleapis (для реализации OAuth 2, чтобы подключить почту с которой будут отправляться письма для верификации)
- jsonwebtoken (для управления jwt-токенами)
- mongodb и mongoose (для работы с БД MongoDB)
- nodemailer (для генерации и отправки писем)
- uuid (для генерации уникальных значений)


This is a small backend for the "AiChat" application (deploy to https://vercel.com/).
The backend is written on the nodeJS platform using the expressJS framework.

- Communication with the chatbot
   Communication with the chatbot is based on the generation of responses by the Openai server. There is a small problem here: since I am using the free plan at https://vercel.com/,
   response generation should not be longer than 5 seconds, otherwise the vercel server returns a 504 error. Therefore, if Chat GPT generates a long response, then it does not come to the user.
   BUT the chatbot itself works!
- Registration
   When registering in the database, a user document is created. As well as a document with access and refresh tokens that will be overwritten / deleted when the user's authorization state changes.
- Verification
   This server generates a unique code and sends it to the mail that the user specified during registration. Feature not available at the moment: because I'm using a free plan
   plan on https://vercel.com/, the response generation should not be more than 5 seconds, otherwise the vercel server returns a 504 error. But the server needs more than 5 seconds to send a message to the mail, and so
   the function is tested and works on the local server!

This application uses the following libraries:
- cookie-parser (for working with cookies)
- cors (for implementing cors)
- crypto-js (for password hashing)
- dotenv (for creating environment variables)
- express-rate-limit (to set limits on the number of requests)
- googleapis (to implement OAuth 2, to connect the mail from which emails will be sent for verification)
- jsonwebtoken (to manage jwt tokens)
- mongodb and mongoose (for working with the MongoDB database)
- nodemailer (for generating and sending emails)
- uuid (to generate unique values)
