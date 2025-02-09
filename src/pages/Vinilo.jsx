// src/vinilo.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosConfig";
import "./styles/vinilo.css";

const VinylInfo = () => {
  const { id } = useParams(); // Capturar el ID del vinilo desde la URL
  const [vinylData, setVinylData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portadaFile, setPortadaFile] = useState(null);
  const [muestraMusicaFile, setMuestraMusicaFile] = useState(null);
  const [unboxingVideoFile, setUnboxingVideoFile] = useState(null);

  useEffect(() => {
    const fetchVinylData = async () => {
      try {
        const response = await axiosInstance.get(`/vinilos/${id}`);
        if (response.data.success) {
          setVinylData(response.data.data);
        } else {
          setError("No se pudo obtener la información del vinilo.");
        }
      } catch (err) {
        setError(err.response?.data?.error || "Error al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVinylData();
  }, [id]);

  const handleSave = async () => {
    const formData = new FormData();
    if (portadaFile) formData.append("portada", portadaFile);
    if (muestraMusicaFile) formData.append("muestraMusica", muestraMusicaFile);
    if (unboxingVideoFile) formData.append("unboxingVideo", unboxingVideoFile);

    try {
      const response = await axiosInstance.put(`/vinilos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Datos actualizados correctamente");
        // Actualizar los datos en la vista
        setVinylData(response.data.data);
      } else {
        alert("Error al guardar los datos.");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al actualizar los datos.");
    }
  };

  if (loading) {
    return <p>Cargando información del vinilo...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  const {
    portada,
    descripcion,
    precioInicial,
    muestraMusica,
    unboxingVideo,
  } = vinylData;

  const defaultVinylImage = "https://via.placeholder.com/300";

  return (
    <div className="vinyl-info-page">
      <div className="login-container">
        <div className="login-box">
          {/* Portada */}
          <div className="vinyl-image-container">
            <img
              src={portada || defaultVinylImage}
              alt="Portada del vinilo"
              className="vinyl-image"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPortadaFile(e.target.files[0])}
            />
          </div>
          <h2>Información del Vinilo</h2>
          {/* Descripción y precio */}
          <div className="vinyl-info">
            <p>
              <strong>Descripción:</strong> {descripcion || "No disponible"}
            </p>
            <p>
              <strong>Precio Inicial:</strong> $
              {precioInicial || "No disponible"}
            </p>
          </div>
          {/* Muestra de música */}
          <div className="music-section">
            <h3>Muestra de Música</h3>
            {muestraMusica ? (
              <audio controls>
                <source src={muestraMusica} type="audio/mp3" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            ) : (
              <p>No disponible</p>
            )}
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setMuestraMusicaFile(e.target.files[0])}
            />
          </div>
          {/* Unboxing Video */}
          <div className="video-section">
            <h3>Unboxing Video</h3>
            {unboxingVideo ? (
              <video controls style={{ width: "100%" }}>
                <source src={unboxingVideo} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            ) : (
              <p>No disponible</p>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setUnboxingVideoFile(e.target.files[0])}
            />
          </div>
          {/* Botón Guardar */}
          <button onClick={handleSave} className="btn btn-primary mt-3">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VinylInfo;

