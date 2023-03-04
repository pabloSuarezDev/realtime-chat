import '../../assets/scss/login/Login.css';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { url } from '../../global/global';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { Link } from 'react-router-dom';

const Login = () => {

  const { form, changed } = useForm({});
  const [logged, setLogged] = useState("not_logged");
  const { auth, setAuth } = useAuth();

  const loginUsuario = async (e) => {
    e.preventDefault();
    let usuarioALoggear = form;

    const request = await fetch(`${url}/usuario/login`, {
      method: "POST",
      body: JSON.stringify(usuarioALoggear),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status === "success") {
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      
      setLogged("logged");
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
            <form onSubmit={loginUsuario}>
              <h3>Iniciar sesión</h3>
              {
                logged === "error" ? (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error al identificar usuario</strong>
                    <span className="btn-close" onClick={() => setLogged("not_logged")} aria-label="Close">X</span>
                  </div>
                ) : ""
              }
              <label htmlFor="nombre">Usuario</label>
              <input type="text" name="nombre" onChange={changed} placeholder="Usuario" autoComplete="off" pattern="[a-zA-Z]+" required />
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" onChange={changed} placeholder="Contraseña" autoComplete="off" pattern="[a-zA-Z0-9]+" required />
              <button type="submit" style={{ backgroundColor: "rgb(75, 188, 75)", color: "white", marginTop: "2rem" }}>
                Acceder
              </button>
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
              <Link to="/registro" style={{ color: "#0d6efd" }}>Registrar una cuenta</Link>
              </p>
            </form>
          </div>
        ) : <Redirect to="/" />
      }
    </section>
  );
};

export default Login;