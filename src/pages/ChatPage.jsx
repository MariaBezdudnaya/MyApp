import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MessageForm } from "../components/MessageForm";
import { MessageList } from "../components/MessageList";
import io from 'socket.io-client';

export const UserCount = ({ socket }) => { //Количество активных пользователей
  const [userCount, setUserCount] = useState(0);
  const [userList, setUserList] = useState([]);

  useEffect(() => { 
    socket.on("user connected", () => {
      setUserCount(userCount + 1);
    });

    socket.on("user disconnected", () => {
      setUserCount(userCount - 1);
    });

    return () => {
      socket.off("user connected");
      socket.off("user disconnected");
    };
  }, []);

  return <div>{userCount} users online</div>;
}

export const ChatPage = () => { // Страница с чатом
  const [storedUser, setStoredUser] = useState(null);
  const navigation = useNavigate();
  const [active, setActive] = useState(true); // Сменена темы
  const [theme, setTheme] = useState('light'); // Сменена темы
  const socket = io('https://89.223.125.166:3001/login'); // Подключение к серверу Socket.IO
  
  useEffect(() => { // Если пользователь существует, при перезагрузке страницы, вместо авторизации остаётся на ней
    const user = localStorage.getItem('user'); 
    if (user) { 
      const userData = JSON.parse(user);
      if (userData.token) { // Если пользователь не авторизован, остаётся на странице с логином
        setStoredUser(JSON.parse(user))
        navigation('/chat'); 
      }
    } else {
      navigation('/chat'); // Если существует, то переходит к чатам
    }
  }, [navigation]);


  const handleThemeToggle = () => { // Смена темы
    setActive(!active);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => { //Выход из учётной записи
    localStorage.removeItem('user'); // Удаляем из localStorage пользователя
    navigation('/login');
  }

  return (
  <div className={`chat-page ${theme}`} >
    <div className="chat-wrapper">
      <div className="title-container">
        <div className="toggle-container">
          <div className="change-text"> {theme} mode </div>
          <div>
            <label className="switch">
              <input type="checkbox" checked={!active} onChange={handleThemeToggle}  />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div><h1 className={`title ${theme}`}>Global Chat</h1></div>
        
        <button className="log-out_button" onClick={handleLogout}>Log Out</button>
      </div>

      <div className="main-container">
        {storedUser && <div className={`user-list ${theme}`}>
          <p><UserCount socket={socket} /></p>
          <hr style={{opacity: "60%"}}/>
          <p>{storedUser.username}</p>
        </div>}

        <div className="message-list">
          <MessageList theme={theme} />

          <div className="messageFormContainer">   
            <MessageForm theme={theme} />
          </div>
        </div>
      </div>
    </div>
  </div> 
  );
};