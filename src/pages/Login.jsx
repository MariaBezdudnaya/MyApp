import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_CURRENTUSER } from '../store/actions';

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

const useForm = () => {  
    const nagitation = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const dispatch = useDispatch();

    const validateForm = () => { // Валидация формы
        const newError = {};
        if (!username) { // Если не заполнены поля
            newError.username = 'Name is required';
        } else if (password.length < 5 || !password.match(/[0-9!@#$%^&*]/)) { // Если пароль меньше пяти символов и не содержит цифры и спец символы
            newError.password = 'Password should be at least 5 characters and contain numbers or special characters';
        } 
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const onSubmitHandle = async (event) => { // действия при нажатии на кнопку LogIn
        event.preventDefault();
        if (!validateForm()) { //Если валидация не прошла, либо пользователь не зарегистрирован 
            return; // остаёмся и читаем ошибки
        }

        const newError = {};

        loginAction({ username, password }) //Вызываем функцию loginAction, которая отправляет запрос на авторизацию на сервер с именем пользователя и паролем
            .then((res) => { // Если запрос прошел успешно (т.е. сервер ответил кодом состояния 200), то выполняется этот блок кода, res - это ответ от сервера, который содержит данные (токен)
                if (res.token) { // Проверяем, существует ли поле token в ответе res. Если токен существует, значит, пользователь успешно авторизовался

                    const user = {
                        username,
                        token: res.token,
                    };

                    // localStorage.setItem('token', res.token); // Сохраняем token в локальное хранилище
                    localStorage.setItem('user', JSON.stringify({ username, token: res.token })); // Сохраняем user в локальное хранилище
                    
                    dispatch({ type: SET_CURRENTUSER, payload: user }); // Диспатчим user в состояние currentUser
                    nagitation('/chat');
                    return res.json();
                } 
            })
            .catch ((error) => { // Если пользователь не существует, то выдаёт сообщение с ошибкой
                if (error === 400) {
                    newError.login = 'Username or password is incorrect. Please check your data or :';
                }
                setError(newError);
            })  
    };

    return { username, setUserName, password, setPassword, error, onSubmitHandle };
};

export const Login = () => { //Компонент с авторизацией
    const { username, setUserName, password, setPassword, error, onSubmitHandle } = useForm();

    return (
        <div className="wrapper">
            <div className="form-container">
                <h1 className="title">LOG IN!</h1>
                <form onSubmit={onSubmitHandle}> 
                    <div className="form-container_item">
                        <input type="text" name="username" placeholder="Enter your login" className="input"
                            onChange={(e) => setUserName(e.target.value)} value={username}/>
                        {error.username && <div className="error-message">{error.username}</div>}
                    </div>

                    <div className="form-container_item">
                        <input type="password" name="password" placeholder="Password" className="input"
                            onChange={(e) => setPassword(e.target.value)} value={password}/>
                        {error.password && <div className="error-message">{error.password}</div>}
                    </div>

                    <button className="button" type="submit">Log in</button>

                    {/* Пользователь не найден */}
                    {error.login && <div className="error-message">
                        {error.login} 
                    </div>}

                    <span>⇠ <a href="/registration">Create an account</a></span>
                </form>
            </div>
        </div>
    );
};