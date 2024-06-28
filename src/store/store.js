//В этом файле создается хранилище Redux. Хранилище Redux - это объект, который управляет состоянием приложения в целом.
import { createStore, combineReducers } from 'redux'; // используется для создания нового хранилища. Эта функция принимает на вход редуктор и, опционально, начальное состояние приложения
import chatReducer from '../store/chatReducer'; // это редуктор, который был импортирован из другого файла. Редукторы определяют, как будет изменяться состояние приложения в ответ на действия
import authReducer from '../store/authReducer';

const rootReducer = combineReducers({ // Комбинируем редьюсеры
    chat: chatReducer,
    auth: authReducer,  
});

const store = createStore(rootReducer); // Здесь создается новое хранилище Redux с использованием редукторов

export default store; // Store экспортируется, чтобы он мог быть использован в других частях приложения