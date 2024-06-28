import {
    ADD_MESSAGE,
    SET_MESSAGES,
    MESSAGE_TYPING
} from './actions';

const initialState = {
    messages: [],
};
  
const chatReducer = (state = initialState, action) => { // это функция, которая принимает текущее состояние и выполняет действие, чтобы вернуть новое состояние. Её задача - обрабатывать все изменения состояния, связанные с чатами. 
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

        case MESSAGE_TYPING:
            return {
                ...state, // Принимается текущее состояние
                messages: [...state.messages, action.payload], // Обновляем при добавлении сообщений
            };

        default: // В зависимости от `action.type`, `chatReducer` изменяет различные аспекты состояния. Если тип действия неизвестен, редуктор вернет текущее состояние без изменений.
        return state;
    }
};

export default chatReducer; // экспортируется как модуль по умолчанию.