import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const registrationAction = async (username, password) => { // Отправляем запрос на сервер
    
    const data = {
        username,
        password
    };

    const res = await fetch('https://89.223.125.166:3001/register', { // Отправляем заполненные данные пользователя на сервер
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

const useForm = () => {  // Пользовательский хук
    const nagitation = useNavigate(); // Хук для навигации на другую страницу
    const [username, setUserName] = useState(''); // Хук, устанавливающий текущего пользователя
    const [password, setPassword] = useState(''); // Хук, устанавливающий пароль

    const [error, setError] = useState({}); // Хук, позволяющий отправить состояние

    const validateForm = () => { 
        const newError = {};
        if (!username) { // Если не заполнены поля
            newError.username = 'Name is required';
        } else if (password.length < 5 || !password.match(/[0-9!@#$%^&*]/)) { // Если пароль меньше пяти символов и не содержит цифры и спец символы
            newError.password = 'Password should be at least 5 characters and contain numbers or special characters';
        } 
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const onSubmitHandle = (event) => {
        event.preventDefault(); // Отмена перезагрузки
        if (!validateForm()) { // Если валидация не прошла
          return; // остаёмся и читаем ошибки
        }
      
        registrationAction(username, password) //Вызываем функцию loginAction, которая отправляет запрос на авторизацию на сервер с именем пользователя и паролем
            .then((res) => { // Если запрос прошел успешно (т.е. сервер ответил кодом состояния 200), то выполняется этот блок кода, res - это ответ от сервера, который содержит данные (токен)
                if (res.message === 'Registered successfully') { // Проверяем, если пользователь зарегистрарован и код ошибки 201 (см. userHandlers в homework-backend), значит, пользователь успешно авторизовался
                    nagitation('/login'); // И перенаправляемся на страницу авторизации
                } 
            })
            .catch ((error) => { //если ошибка, выводим её в консоль
                if (error === 400) {
                    alert("User already exist. Please log in!"); // Если пользователь уже существует, то перенаправляемся на страницу авторизации
                    nagitation('/login');
                }
            }); 
      };
      

    return { username, setUserName, password, setPassword, error, onSubmitHandle };
};

export const Registration = ({ theme }) => { //Компонент с регистрацией
    const { username, setUserName, password, setPassword, error, onSubmitHandle } = useForm();

    return (
        <div className="wrapper">
            <div className="form-container">
                <h1 className={`title ${theme}`}>Please register to start!</h1>
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

                    <button className="button" type="submit">To register</button>
                    <a href="/login">Already have an account? Log in!</a>
                </form>
            </div>
        </div>
    );
};

