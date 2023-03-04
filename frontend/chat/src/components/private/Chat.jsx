import "../../assets/scss/chat/chat.css";
import { Redirect, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import Header from "./Header";
import { ip, url } from "../../global/global";
import { useEffect, useState } from "react";
import avatar from '../../assets/images/default.jpg';
import io from "socket.io-client";
import { IonIcon } from "@ionic/react";
import { send } from "ionicons/icons";
const socket = io(`http://${ip}:3900`);

const Chat = () => {

  const { auth } = useAuth();
  const { id } = useParams();
  const [mensajes, setMensajes] = useState([]);

  const getMensajes = async () => {

    const request = await fetch(`${url}/mensaje/todos/${id}`);

    const data = await request.json();

    if (data.status === "success") {
      setMensajes(data.mensajes);
    }
  };

  const sendMessage = async(e) => {
    e.preventDefault();
    let messageData = {
      cuerpo: e.target.message.value,
      id_usuario: auth.id,
      id_conversacion: id,
      nombre_usuario: auth.nombre
    };

    socket.emit('mensajes', messageData);
    document.getElementById("message").value = "";
  };

  useEffect(() => {
    if (mensajes.length <= 0) {
      getMensajes();
    }

    socket.on('mensajes', () => {
      getMensajes();
    });
  }, []);

  return (
    <div className="chat-box">
      {
        Object.keys(auth).length > 0 ? (
          <>
            <Header content="Chat" />
            <div className="chat-messages">
              {
                mensajes.length > 0 &&
                mensajes.map((mensaje, index) => {
                  if (mensaje.id_usuario === auth.id) {
                    return (
                      <div className="message from-me" key={index}>
                        {mensaje.cuerpo}
                      </div>
                    );
                  } else {
                    return (
                      <div className="message from-them" key={index}>
                        {mensaje.cuerpo}
                      </div>
                    );
                  }
                })
              }
            </div>
            {/* <br /> */}
            <form onSubmit={e => sendMessage(e)} className="chat-input">
              <input type="text" name="message" id="message" placeholder="Escribe un mensaje..." />
              <button type="sumbit" style={{ background: "#3B3B3B" }}>
                <IonIcon icon={send} />
              </button>
            </form>
          </>
        ) : <Redirect to="/login" />
      }
    </div>
  );
};

export default Chat;