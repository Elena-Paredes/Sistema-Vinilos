// src/pages/SignIn.jsx
import React, { useState } from "react";
import "./styles/signup_signin.css";
import api from './axiosConfig'; // Importar la configuración de Axios
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await api.post("/signin", formData);

      if (res.data.success) {
        setResponse({ message: "Inicio de sesión exitoso" });

        
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirigir a la página principal
        navigate("/Principal");
      } else {
        
        setResponse({ message: res.data.message || "Error desconocido al iniciar sesión" });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

     
      if (error.response) {
        
        setResponse({ message: error.response.data.message || "Error en la respuesta del servidor" });
      } else if (error.request) {
       
        setResponse({ message: "No se recibió respuesta del servidor" });
      } else {
        
        setResponse({ message: "Error al configurar la solicitud" });
      }
    }
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-box'>
          <div className='login-logo'>
            <img src='/comerlat.png' alt='Logo' />
          </div>
          <h2>INICIAR SESIÓN</h2>
          <form onSubmit={handleSubmit}>
            <div className='login-field'>
              <FaUser className='login-icon' />
              <input
                type='text'
                name='username'
                placeholder='Nombre de Usuario'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='login-field'>
              <FaLock className='login-icon' />
              <input
                type='password'
                name='password'
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='signup-link'>
              <p>
                ¿No tienes cuenta?{" "}
                <a href='/signup'>Crea una sesión</a>
              </p>
            </div>
            <button type='submit'>Iniciar Sesión</button>
          </form>
          {response && (
            <div className='response'>
              <h3>{response.message}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
