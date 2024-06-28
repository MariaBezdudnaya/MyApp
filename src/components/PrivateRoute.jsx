// С помощью этого компонента защищаем маршрут, чтобы обеспечить доступ к странице чата только авторизованным пользователям
import React from "react";
import { useSelector } from "react-redux"; // Хук для доступа к состоянию Redux.
import { Navigate } from "react-router-dom"; // Компоненты для управления маршрутизацией.

export const PrivateRoute = ({ children, ...rest }) => {
  const currentUser = useSelector((state) => state.auth.currentUser); // См. селекторы в store/README.md

  if (!currentUser) { // если пользователь не авторизован - перенаправим пользователя на роут “/login”
    return <Navigate to="/login" />;
  }
  return children; // если  авторизован, то отрисуем то, что окажется внутри компонента PrivateRoute (т.е. children)
};
   
