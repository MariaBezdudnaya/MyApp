import { useEffect } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_CURRENTUSER } from './store/actions';
import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/ChatPage";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";

const router = createBrowserRouter( 
  createRoutesFromElements( 
    <> 
      {/* Главная страница */}
      <Route 
        index element={<MainPage />}
      />

      {/* Страница регистрации */}
      <Route 
        path="registration" 
        element={<Registration />} 
      />

      {/* Страница авторизации */}
      <Route 
        path="login" 
        element={<Login />} 
      />

      {/* Cтраница с чатом */}
      <Route
        path="chat" 	        
        element={     
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>   
        }   
      /> 
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user'); 
    if (user) { 
      const userData = JSON.parse(user); 
      if (userData.token) { 
        dispatch({ type: SET_CURRENTUSER, payload: userData }); 
      }
    }

  }, [dispatch]);

  return  <RouterProvider router={router} />;
}

export default App;