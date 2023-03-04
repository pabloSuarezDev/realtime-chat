import '../../assets/scss/login/Login.css';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { url } from '../../global/global';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';

const Registro = () => {

  const { form, changed } = useForm({});
  const [logged, setLogged] = useState("not_registered");
  const { auth, setAuth } = useAuth();

  
  const registroUsuario = async (e) => {
    e.preventDefault();
    let usuarioARegistrar = form;
    
    const request = await fetch(`${url}/usuario/registrar`, {
      method: "POST",
      body: JSON.stringify(usuarioARegistrar),
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    const data = await request.json();

    if (data.status === "success") {
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      setLogged("registered");
      setAuth(data.usuario);
      if(Object.keys(auth).length > 0) {
        window.location.href = "/";
      }
    } else {
      setLogged("error");
    }
  };
  
  return (
    <section className="layout__content">
      {
        Object.keys(auth).length <= 0 ? (
          <div className="login">
            <form onSubmit={registroUsuario}>
              <h3>Registrarse</h3>
              {
                logged === "error" ? (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error al registrar usuario</strong>
                    <span className="btn-close" onClick={() => setLogged("not_registered")} aria-label="Close">X</span>
                  </div>
                ) : ""
              }
              <label htmlFor="nombre">Usuario</label>
              <input type="text" name="nombre" onChange={changed} placeholder="Usuario" autoComplete="off" pattern="[a-zA-Z]+" required />
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" onChange={changed} placeholder="Contraseña" autoComplete="off" pattern="[a-zA-Z0-9]+" required />
              <label htmlFor="descripcion">Descripción</label>
              <textarea name="descripcion" onChange={changed} style={{ padding: "1rem .5rem" }} placeholder="Descripción" autoComplete="off" pattern="[a-zA-Z0-9 ]+"></textarea>
              {/* HACER SUBIDA DE IMAGEN DE PERFIL */}
              {/* <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" onChange={changed} placeholder="Contraseña" autoComplete="off" pattern="[a-zA-Z0-9]+" required /> */}
              <button type="submit" style={{ backgroundColor: "rgb(75, 188, 75)", color: "white", marginTop: "2rem" }}>
                Acceder
              </button>
            </form>
          </div>
        ) : <Redirect to="/" />
      }
    </section>
  );
};

export default Registro;