import '../../assets/scss/buscar/Buscar.css';
import avatar from '../../assets/images/default.jpg';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { url } from '../../global/global';
import useAuth from '../../hooks/useAuth';
import Header from './Header';

const Buscar = ({ chats }) => {

  const { auth } = useAuth();
  const history = useHistory();
  const { id } = JSON.parse(localStorage.getItem("usuario"));

  const [usuarios, setUsuarios] = useState([]);

  const getUsuarios = async () => {
    const usuarios = await fetch(`${url}/usuario/todos`);
    const data = await usuarios.json();

    if (data.status === "success") {
      setUsuarios(data.usuarios);
    }
  };

  const crearChat = async (id_primerUsuario, id_segundoUsuario, emisor, receptor) => {

    //TODO Solucionar los nombres que aparecen en los chatsnpm start
    let nuevoChat = {
      id_primerUsuario,
      id_segundoUsuario,
      emisor,
      receptor
    }

    const chat = await fetch(`${url}/conversacion/crear`, {
      method: "POST",
      body: JSON.stringify(nuevoChat),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await chat.json();

    if (data.status === "success") {
      history.push(`/chat/${data.conversacion.id}`);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <div className="buscar">
      {
        Object.keys(auth).length > 0 ? (
          <>
            <Header content="Usuarios" />
            <div className="warpper">
            {
              usuarios.length > 0 &&
              usuarios.map(usuario => {
                if (usuario.id !== id) {
                  return (
                    <div className="user" key={usuario.id} onClick={() => crearChat(id, usuario.id, auth.nombre, usuario.nombre)}>
                      <div className="left">
                        <img className="profile-pic" src={usuario.imagen === "default.jpg" ? avatar : `../../assets/images/${usuario.imagen}`} alt={`${usuario.nombre}'s profile pic`} />
                      </div>
                      <div className="right">
                        <p className="text-light m-0">{usuario.nombre.charAt(0).toUpperCase() + usuario.nombre.slice(1)}</p>
                        {
                          usuario.descripcion.length > 0 ? (
                            <span style={{ color: "gray", fontSize: "12px", fontStyle: "italic" }}>
                              {usuario.descripcion}
                            </span>
                          ) : false
                        }
                      </div>
                    </div>
                  );
                }
              })
            }
            </div>
          </>
        ) : <Redirect to="/login" />
      }
    </div>
  );
};

export default Buscar;