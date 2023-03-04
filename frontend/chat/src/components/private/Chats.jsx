import '../../assets/scss/chats/Chats.css';
import avatar from '../../assets/images/default.jpg';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add, alert, trashOutline } from 'ionicons/icons';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { ip, url } from '../../global/global';
import useAuth from '../../hooks/useAuth';
import Header from './Header';
import { useEffect, useState } from 'react';
import io from "socket.io-client";
const socket = io(`http://${ip}:3900`);

const Chats = ({ chats, setChats }) => {

  const { auth } = useAuth();
  const history = useHistory();
  const [chatName, setChatName] = useState("");

  const getConversaciones = async () => {
    const conversaciones = await fetch(`${url}/conversacion/todas/${auth.id}`);
    const data = await conversaciones.json();

    if (data.status === "success") {
      setChats(data.conversaciones);
    }
  };

  const borrarChat = async (chatId) => {
    const request = await fetch(`${url}/conversacion/borrar/${chatId}`, { method: "DELETE" });
    const data = await request.json();

    if (data.status === "success") {
      let chatsFiltrados = chats.filter(chat => chat.id !== chatId);
      setChats(chatsFiltrados);
    }
  };

  const irAlChat = async(chatId) => {
    history.push(`/chat/${chatId}`);

    let data = { id_conversacion: chatId };
    
    const change = await fetch(`http://${ip}:3900/api/v1/conversacion/quitar-nuevo-mensaje`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  useEffect(() => {
    getConversaciones();
  }, []);

  return (
    <div className="conversaciones">
      {
        Object.keys(auth).length > 0 ? (
          <>
            <Header content="Chats" />
            <div className="container p-0">
              {
                chats.length > 0 &&
                // TODO Traer la imagen del usuario y mensajes
                chats.map(chat => {
                  return (
                    <div className="chat" key={chat.id}>
                      <div className="left" style={{ width: "80%" }} onClick={() => irAlChat(chat.id)}>
                        {/* Poner condición para que comprobar que la imagen sea o no la default */}
                        <img
                          className="profile-pic"
                          src={avatar}
                          alt="default"
                        />
                        <span className="text-light">
                          {
                            chat.emisor === auth.nombre ? (
                              chat.receptor.charAt(0).toUpperCase() + chat.receptor.slice(1)
                            ) : (
                              chat.emisor.charAt(0).toUpperCase() + chat.emisor.slice(1)
                            )
                          }
                        </span>
                      </div>
                      <div className="right" style={{ display: "flex", alignItems: "center" }}>
                        { chat.nuevo_mensaje === 1 ? <span><IonIcon icon={alert} /></span> : "" }
                        <span onClick={() => borrarChat(chat.id)} style={{ color: "white", background: "none", display: "flex", alignItems: "center" }}>
                          <IonIcon icon={trashOutline} style={{ fontSize: "1.5rem" }} />
                        </span>
                      </div>
                    </div>
                  );
                })
              }
              <Link to="/buscar">
                <IonFab className="add__btn">
                  <IonFabButton color="success">
                    <IonIcon icon={add} style={{ color: "white" }}></IonIcon>
                  </IonFabButton>
                </IonFab>
              </Link>
            </div>
          </>
        ) : <Redirect to="/login" />
      }
    </div>
  );
};

export default Chats;