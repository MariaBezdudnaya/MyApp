//Message:
import React from "react";
import { useSelector } from "react-redux";

const Message = React.forwardRef(({ message, theme }, ref) => {  // ref позволяет устанавливать фокус на отправленном сообщении.
  const currentUser = useSelector((state) => state.auth.currentUser.username);
  
  if (message.username === currentUser) {
    return (
      <div className="message-user" ref={ref} >
        <p>{message.username}: {message.body}</p>
      </div>
    );
  }
  
  return (
    <div className={`message ${theme}`} ref={ref}>
      <p>{message.username}: {message.body}</p>
    </div>
  );
});

export default Message;