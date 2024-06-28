import {
    SET_CURRENTUSER
} from './actions';

const initialState = { // Изначально пользователь не аутентифицирован
    currentUser: null, 
};
  
const authReducer = (state = initialState, action) => { // это функция, которая принимает текущее состояние и выполняет действие, чтобы вернуть новое состояние. Её задача - обрабатывать все изменения состояния, связанные с идентификацией пользователя 
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

export default authReducer; // экспортируется как модуль по умолчанию.