import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MESSAGE } from '../store/actions'

export const MessageForm = ({ theme }) => {
  const [message, setMessage] = useState(""); // Хук, позволяющий установить сообщение для отправки.
  const currentUser = useSelector((state) => state.auth.currentUser); // Хук, позволяющий установить текущего пользователя. Также с помощью селектора устанавливается текущий пользователь.

  const dispatch = useDispatch(); // Хук, позволяющий отправить состояние

  const sendMessageToServer = async (message) => { // Функция для отправки сообщения на сервер
    const res = await fetch('http://91.186.197.33:3001/chats', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({ username: currentUser.username, body: message }),
    });

    if (res.ok) {
      console.log(currentUser)
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = async (event) => { // При нажатии на кнопку Send
    event.preventDefault();

    const messageSent = await sendMessageToServer(message);
    
    if(messageSent) { // Если функция выполняется, то отправляется сообщение с адресантом
      dispatch({ type: ADD_MESSAGE, payload: { username: currentUser.username, body: message } });
      setMessage("");
    } else {
      alert("Message sending failed"); //Либо ошибка
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`messageContainer ${theme}`}>     
        <div className={`messageContainerInput ${theme}`}>
            <input
                className={`message-input ${theme}`}
                type="text"
                placeholder={`${currentUser.username}, enter your message...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
        </div>
        <div>
          <button className={`chat-button ${theme}`} type="submit">Send</button>
        </div>
      </div>
    </form>
  );
};
