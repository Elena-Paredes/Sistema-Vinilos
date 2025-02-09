import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import "./styles/signup_signin.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null); // Estado para la imagen de perfil
  const [message, setMessage] = useState(""); // Mensaje de respuesta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSizeInBytes) {
        setMessage("La imagen es demasiado grande. El tamaño máximo es de 5 MB.");
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Guardar la imagen como una URL en base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, profileImage }), // Incluir la imagen en el envío
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        setProfileImage(null);
      } else {
        setMessage(result.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setMessage("Error de conexión con el servidor");
    }
  };

  return (
    <div className="register-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <img src="/comerlat.png" alt="Logo" />
          </div>
          <h2>REGISTRO</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <input
                type="text"
                name="firstName"
                placeholder="Nombres"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-field">
              <input
                type="text"
                name="lastName"
                placeholder="Apellidos"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-field">
              <input
                type="text"
                name="username"
                placeholder="Nombre de Usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-field">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-field">
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-field">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Sección de imagen de perfil */}
            <div className="login-field">
              <label htmlFor="profileImage">Imagen de perfil:</label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
              {profileImage && (
                <div className="image-preview">
                  <img
                    src={profileImage}
                    alt="Vista previa"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}
            </div>
            <button type="submit">Registrar</button>
          </form>
          {message && <p className="response-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;


