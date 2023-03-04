import { useEffect, useState, createContext } from "react";
import { url } from "../global/global";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState({});

  const authUser = async() => {
    //? Sacar datos del usuario identificado del localStorage
    const usuario = localStorage.getItem('usuario');

    if(!usuario || usuario === null || usuario === undefined) { return false; }

    //? Transformar los datos a un objeto de JS
    const usuarioObj = JSON.parse(usuario);

    //? Peticion AJAX al Backend que compruebe el TOKEN y
    //? que me devuela todos los datos del usuario
    const request = await fetch(`${url}/usuario/perfil/${usuarioObj.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if(data.status === "success") {
      //? Settear el estado de auth
      setAuth(data.usuario);
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  return(
    <AuthContext.Provider
      value={{
        auth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;