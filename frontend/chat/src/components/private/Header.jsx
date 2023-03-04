import { IonIcon } from "@ionic/react";
import { chevronBackOutline, logOutOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

const Header = ({ content }) => {

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <div className="header" style={{ position: "sticky", top: "0" }}>
      {
        content === "Usuarios" || content === "Chat" ? (
          <div style={{ display: "flex", gap: ".5rem" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", margin: "0", color: "white" }}>
              <IonIcon icon={chevronBackOutline} style={{ fontSize: "1.25rem" }} />
            </Link>
            <h3>{content}</h3>
          </div>
        ) : (
          <div>
            <h3 className="text-light">{content}</h3>
          </div>
        )
      }
      <div className="logout" onClick={cerrarSesion}>
        <IonIcon className="text-light" icon={logOutOutline} />
      </div>
    </div>
  );
};

export default Header;