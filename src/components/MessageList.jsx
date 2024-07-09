import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_MESSAGES } from '../store/actions';
import Message from "./Message";

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
export const MessageList = ({ theme }) => {
  const messages = useSelector((state) => state.chat.messages); // Хук для установки сообщений в чате
  const currentUser = useSelector((state) => state.auth.currentUser.token); // Хук для установки текущего пользователя
  const typing = useSelector((state) => state.chat.typing); // Хук для установки состояния typing
  const lastMessageRef = useRef(null); // Добавляем ref к последнему сообщению в списке

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      getChats(currentUser) // Передаем currentUser в getChats
        .then((res) => { // И если он найден
          if (res) {
            dispatch({ type: SET_MESSAGES, payload: res }); // То показываем историю чата
          }
        })
        .catch((error) => {
          console.log(error); // Либо ошибка
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentUser, dispatch]);

  useLayoutEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <div className={`messageList ${theme}`}>
      <ul>
        {messages?.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            ref={index === messages.length - 1 ? lastMessageRef : null} // Добавляем реф только к последнему элементу списка
            theme={theme}
          />
        ))}
      </ul>
      {typing && <p className={`typing-indicator ${theme}`}>Другой пользователь печатает...</p>}
    </div>
  );
};