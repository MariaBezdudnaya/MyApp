// Кнопка на главной странице, которая перенаправляет на страницу с фильмами
import { NavLink } from "react-router-dom"; 

export const LinkButton = ({ title, to, onClick, ...props }) => {
  return (
    <NavLink  // это специальный тип <Link> , позволяющий определять стили для активного состояния ссылки
      to={to}
      className="button"
      onClick={onClick}
      {...props}

    >
      {title}
    </NavLink>
  );
};