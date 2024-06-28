[На главную](../README.md)

## Описание

В данном приложении APP разработан "Глобальный чат", используя React и Redux. Приложение поддерживает авторизацию пользователей, а также сохранение состояния между перезагрузками страницы..

## Структура проекта

Навигация по важным файлам и директориям проекта:

- `App.jsx` - основной конфигурационный файл приложения, запускаемый при старте приложения.
- `MainPage` - директория, содержащая код и документацию для компонента `MainPage`, который содержит главную страницу с предложением регистрации.
- `Registration` - директория, содержащая код и документацию для компонента `Registration`, который содержит форму регистрации пользователей.
- `Login` - директория, содержащая код и документацию для компонента `Login`, который содержит форму авторизации пользователей.
- `ChatPage` - директория, содержащая код и документацию для компонента `ChatPage`, который содержит компоненты `MessageList` (история сообщений) и `MessageForm` (форма отправки), предназначен для отправки сообщений в чат.
- `store` - директория, содержащая слой Redux приложения, включая действия, редукторы и селекторы.

## Как использовать

Приложение должно быть запущено с помощью `node app.mjs` после выполнения `npm install` для установки всех зависимостей.

## Обзор компонентов и работа с Redux

Все действия в коде компонентов закомментированы. Слои Redux приложения содержат редукторы, используемые при переходе на новое состояние, а также логику извлечения данных. Руководство по использованию этих слоев можно найти в `README.md`, расположенном в папке `store`.

## Список омпонентов:

- [`ChatPage`](./pages/ChatPage.jsx) - страница чата.
- [`Login`](./pages/Login.jsx) - страница авторизации пользователя.
- [`MainPage`](./pages/MainPage.jsx) - главная страница.
- [`Registration`](./pages/Registration.jsx) - страница регистрации пользователя.
- [`Message`](./components/Message.jsx) - компонент сообщения.
- [`MessageForm`](./components/MessageForm.jsx) - форма отправки сообщения.
- [`MessageList`](./components/MessageList.jsx) - история сообщений чата.
- [`PrivateRoute`](./components/PrivateRoute.jsx) - компонент, защищающий маршрут от неавторизованных пользователей.
- [`store`](./store/README.md) - конфигурация Redux, включает селекторы, редукторы и стор для хранения данных.

## Помощь и поддержка

В случае появления проблем или вопросов не стесняйтесь обращаться к нашей службе поддержки.