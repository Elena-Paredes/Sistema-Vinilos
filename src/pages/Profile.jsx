import React from "react";
import "./styles/signup_signin.css";
const UserProfile = ({ userData = {}, profileImage }) => {
    const defaultProfileImage = "https://picsum.photos/150";
 // Imagen de prueba en línea
  
    return (
      <div className="user-profile-page">
        <div className="login-container">
          <div className="login-box">
            {/* Foto de perfil */}
            <div className="profile-image-container">
              <img
                src={profileImage || defaultProfileImage} // Usar imagen proporcionada o predeterminada
                alt="Foto de perfil"
                className="profile-image"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              />
            </div>
            <h3>Información del Usuario</h3>
            <div className="user-info">
              <p>
                <strong>Nombres:</strong> {userData.firstName || "No disponible"}
              </p>
              <p>
                <strong>Apellidos:</strong> {userData.lastName || "No disponible"}
              </p>
              <p>
                <strong>Nombre de Usuario:</strong>{" "}
                {userData.username || "No disponible"}
              </p>
              <p>
                <strong>Correo Electrónico:</strong>{" "}
                {userData.email || "No disponible"}
              </p>
              <p>
                <strong>Teléfono:</strong> {userData.phone || "No disponible"}
              </p>
              <p>
                <strong>Departamento:</strong>{" "}
                {userData.department || "No especificado"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfile;