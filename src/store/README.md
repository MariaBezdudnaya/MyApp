[На главную](../../../README.md)

## Содержание

- [Redux Store](#Redux-Store)
- [Actions](#Actions)
- [Reducers](#Reducers)
- [Redux Thunk](#Редакс-Thunk)
- [Redux Selectors](#Redux-Selectors)


# Redux Store

В данной документации описана конфигурация Redux хранилища с использованием нашего существующего votingReducer.

---

## Redux Store:

#### store

В функции `store` мы передаем наш `rootReducer` который будет обрабатывать все соответствующие экшены и возвращать обновленное состояние. `rootReducer` комбинирует редьюсеры чатов и аутентификации.
`createStore` это функция принимает на вход редуктор и, опционально, начальное состояние приложения, используется для создания нового хранилища. 

```javascript
import { createStore, combineReducers } from 'redux';
import chatReducer from '../store/chatReducer';
import authReducer from '../store/authReducer';

const rootReducer = combineReducers({ 
    chat: chatReducer,
    auth: authReducer,  
});

const store = createStore(rootReducer);

export default store;
```

#### Использование:

Для использования этого хранилища в нашем приложении `React`, мы должны обернуть наше приложение в компонент `Provider` из `react-redux` и передать наше хранилище в качестве свойства.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>,
);
```


# Actions

В данной документации экспортируеются константы, которые представляют различные типы действий, а также функции экшенов, которые возвращают объект действия с заданными параметрами.

## ADD_MESSAGE
Используется для добавления нового сообщения в существующий массив сообщений в состоянии Redux.

```javascript
export const ADD_MESSAGE = "ADD_MESSAGE"; 
```
---

## SET_MESSAGES
Используется для установки всего массива сообщений в состоянии Redux.

```javascript
export const SET_MESSAGES = "SET_MESSAGES";
```
---

## SET_CURRENTUSER
Используется для установки текущего пользователя в состоянии Redux. 

```javascript
export const SET_CURRENTUSER = "SET_CURRENTUSER";
```


# Reducers

В данной документации описаны редьюсеры `authReducer` и `chatReducer`, использованный в коде. Это функции, которая принимают текущее состояние и выполняют действие, чтобы вернуть новое состояние. Их задача - обрабатывать все изменения состояния, связанные с идентификацией пользователя. 

## chatReducer

`chatReducer` является частью состояния (state) в Redux, которая отвечает за идентификацию пользователя. 

### Общее описание

Сначала экспортируются actions.

```javascript
import {
    SET_CURRENTUSER
} from './actions';
```

Затем задаётся `initialState`, который описывает начальное состояние.

```javascript
const initialState = { // Изначально пользователь не аутентифицирован
    currentUser: null, 
  };
```

Далее создаётся сам `authReducer`.

```javascript
const authReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_CURRENTUSER:
        return {
            ...state, // Принимается текущее состояние
            currentUser:  action.payload, // Обновляем currentUser при успешном входе
        };

        default: // В зависимости от `action.type`, `authReducer` изменяет различные аспекты состояния. Если тип действия неизвестен, редуктор вернет текущее состояние без изменений.
        return state;
    }
};
```
---

## chatReducer

`chatReducer` является частью состояния (state) в Redux, которая отвечает за модуль "MessageList".

### Общее описание

Сначала задаётся `initialState`, который описывает начальное состояние.

```javascript
const initialState = {
    messages: [],
};
```

Далее создаётся сам `chatReducer`.

```javascript
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
        return {
            ...state, // Принимается текущее состояние
            messages: [...state.messages, action.payload], // Обновляем messages при добавлении сообщений
        };

        case SET_MESSAGES:
        return {
            ...state,
            messages: action.payload, // Обновляем messages при загрузке сообщений в историю
        };

        default: // В зависимости от `action.type`, `chatReducer` изменяет различные аспекты состояния. Если тип действия неизвестен, редуктор вернет текущее состояние без изменений.
        return state;
    }
};
```

# Редакс Thunk

В данной документации описаны все Redux функции из данного файла. Все перечисленные функции являются асинхронными thunk функциями, основными действиями которых является запрос к API, обработка ответа и делегирование данных в функции-редьюсеры.

---

## registrationAction

Функция для отправки данных, заполненных пользователем в форме регистрации. Принимает `data` (логин и пароль), которые должны быть отправлены. на сервер.

```javascript
const registrationAction = async (username, password) => { // Отправляем запрос на сервер
    
    const data = {
        username,
        password
    };

    const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return res.json();
    } else {
        return await Promise.reject(res.status);
    }
};
```

---

## loginAction

Функция для отправки данных, заполненных пользователем в форме авторизации. Принимает `data` (логин и пароль), которые должны быть отправлены. на сервер

```javascript
const loginAction = async (data) => { // Функция для отправки запроса на авторизацию на сервер
    const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (res.ok) {
        return res.json();
    } else {
        return await Promise.reject(res.status);
    }
};
```

---

## getChats

Функция для получения всех сообщений из истории чата.

```javascript
const getChats = async (currentUser) => {
  // Загрузить историю сообщений с сервера
  const res = await fetch('http://localhost:3001/chats', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser}`, // токен
    },
  });
  // Извлечь данные из ответа
  const data = await res.json();
  if (res.ok) {
    console.log(data);
    return data;
  } else {
    return await Promise.reject(res.status);
  }
};
```

---

## sendMessageToServer

Функция для отправки сообщения на сервер. Принимает `message` авторизованного пользователя, чтобы отправить его в историю сообщений.

```javascript
const sendMessageToServer = async (message) => {
const res = await fetch('http://localhost:3001/chats', {
    method: "POST",
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${currentUser.token}`,
    },
    body: JSON.stringify({ username: currentUser.username, body: message }),
});
}
```

# Redux Selectors

Селекторы позволяют выбирать некоторые данные из хранилища Redux и использовать их в React компонентах.

---

### messages

Функция в компоненте `MessageList` для получения списка сообщений из истории чата.

```javascript
const messages = useSelector((state) => state.chat.messages);
```

### currentUser

Функция в компоненте `MessageForm` для передачи данных текущего пользователя.

```javascript
const currentUser = useSelector((state) => state.auth.currentUser);
```

---
При возникновении вопросов или проблем, пожалуйста, обратитесь в поддержку.

## Обратите внимание

Все API-запросы в этом компоненте направлены на `http://localhost:3001/api/**`. Если ваш сервер работает на другом домене или порту, вам будет необходимо обновить эту настройку.