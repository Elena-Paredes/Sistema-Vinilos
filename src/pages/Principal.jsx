import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import './styles/index.css';
import './styles/tabla.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '/comerlat.png';
import { FaTrash } from 'react-icons/fa';

const Principal = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false);
  const [vinilos, setVinilos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);
  const toggleTable = () => setShowTable(!showTable);
  const toggleUserTable = () => setShowUserTable(!showUserTable);

  // Obtener la información del usuario 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Usuario obtenido de localStorage:", parsedUser);
      setUser(parsedUser);
  
      if (parsedUser.imagenPerfil) {
        const base64Prefix = "data:image/jpeg;base64,";
        const imageSrc = base64Prefix + parsedUser.imagenPerfil;
        console.log("URL de la imagen generada:", imageSrc);
        setUserImage(imageSrc);
      }
    }
  }, []);
  
  

  // Cargar datos de vinilos
  useEffect(() => {
    const fetchVinilos = async () => {
      try {
        const response = await axiosInstance.get('/vinilos');
        setVinilos(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVinilos();
  }, []);

  // Cargar datos de eventos
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axiosInstance.get('/eventos');
        setEventos(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEventos();
  }, []);

  // Cargar datos de usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axiosInstance.get('/usuarios');
        if (response.data.success) {
          setUsuarios(response.data.data);
          console.log('Usuarios obtenidos:', response.data.data); // Depurar los datos obtenidos
        } else {
          setError(response.data.error);
        }
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchUsuarios();
  }, []);
  

  const handlePujarClick = (evento) => {
    setSelectedEvento(evento);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setBidAmount('');
  };

  const handleBidSubmit = async () => {
    const precioInicial = selectedEvento.precioInicial;
    const bid = parseFloat(bidAmount);
  
    if (isNaN(bid) || bid <= precioInicial) {
      alert('Cantidad menor o igual al precio inicial');
      return;
    }
  
    try {
      const response = await axiosInstance.put(`/vinilos/${selectedEvento.viniloID}`, {
        precioInicial: bid,
      });
  
      if (response.data.success) {
        alert('Puja aceptada');
        setEventos((prevEventos) =>
          prevEventos.map((evento) =>
            evento.viniloID === selectedEvento.viniloID
              ? { ...evento, precioInicial: bid }
              : evento
          )
        );
        handleModalClose();
      } else {
        alert('No se pudo actualizar la puja: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al realizar la puja:', error.message);
      alert('Error al realizar la puja');
    }
  };
  

  const handleDeleteVinilo = async (viniloID) => {
    try {
      await axiosInstance.delete(`/vinilos/${viniloID}`);
      setVinilos(vinilos.filter(vinilo => vinilo.viniloID !== viniloID));
      alert('Vinilo eliminado correctamente');
    } catch (error) {
      alert('Error al eliminar el vinilo');
      console.error('Error al eliminar el vinilo:', error.message);
    }
  };

  const handleDeleteUsuario = async (usuarioID) => {
    if (!usuarioID) {
      alert('ID del usuario no válido');
      return;
    }
    try {
      await axiosInstance.delete(`/usuarios/${usuarioID}`);
      setUsuarios(usuarios.filter(usuario => usuario.usuarioID !== usuarioID));
      alert('Usuario eliminado correctamente');
    } catch (error) {
      alert('Error al eliminar el usuario');
      console.error('Error al eliminar el usuario:', error.message);
    }
  };

  return (
    <div>
       <header>
        <nav>
          <div className="nav-logo">
            <img src={logo} alt="Logo de la empresa" className="logo" />
          </div>
          <ul>
            <li><a href="/principal">Eventos</a></li>
            <li><a href="/principal">Vinilos</a></li>
          </ul>
          <div className="user-profile" onMouseLeave={closeMenu}>
            {userImage ? (
              <img
                src={userImage}
                alt="Usuario"
                className="user-image"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                onClick={toggleMenu}
              />
            ) : (
              <img
                src="/user-image.png"
                alt="Usuario predeterminado"
                className="user-image"
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                onClick={toggleMenu}
              />
            )}
            {menuVisible && (
              <div className="dropdown-menu">
                <ul>
                  <li><a href="/profile">Perfil</a></li>
                  <li><a href="/logout">Salir</a></li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>

      <section className="services">
      <h2>EVENTOS RECIENTES</h2>
      <div className="services-container">
        {eventos.length > 0 ? (
          eventos.map((evento, index) => (
            <div className="service-item" key={index}>
              <h3>{evento.nombreEvento}</h3>
              <p>{evento.descripcionEvento}</p>
              <p><strong>Vinilo:</strong> {evento.titulo}</p>
              <p><strong>Inicia:</strong> {new Date(evento.fechaInicio).toLocaleString()}</p>
              <p><strong>Termina:</strong> {new Date(evento.fechaTermino).toLocaleString()}</p>
              <p><strong>Precio inicial:</strong> ${Number(evento.precioInicial).toFixed(2)}</p>
              <div className="service-icon">
                {evento.portada ? (
                  <img
                    src={evento.portada}
                    alt="Portada del vinilo"
                    className="rounded-circle"
                    style={{ width: '100px', height: '100px' }}
                  />
                ) : (
                  <p>No hay imagen disponible</p>
                )}
              </div>
              <button className="btn btn-primary mt-2" onClick={() => handlePujarClick(evento)}>Pujar</button>
            </div>
          ))
        ) : (
          <p>{error ? `Error: ${error}` : 'Cargando eventos...'}</p>
        )}
      </div>
    </section>

      {/* Modal de Pujar */}
      {modalVisible && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pujar por: {selectedEvento.nombreEvento}</h5>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Precio inicial: ${Number(selectedEvento.precioInicial).toFixed(2)}</p>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Ingrese su puja"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleBidSubmit}>Pujar</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Tabla de Vinilos */}
      <section className="table-section">
        <h2>Vinilos</h2>
        <button className="btn btn-primary mb-3" onClick={toggleTable}>
          {showTable ? 'Ocultar Registros' : 'Mostrar Registros'}
        </button>
        {showTable && (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Portada</th>
                  <th>Título</th>
                  <th>Año</th>
                  <th>Precio inicial</th>
                  <th>Artista</th>
                  <th>Género</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {vinilos.length > 0 ? (
                  vinilos.map((vinilo, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={vinilo.portada}
                          alt="Portada"
                          style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                        />
                      </td>
                      <td>{vinilo.titulo}</td>
                      <td>{vinilo.anioLanzamiento}</td>
                      <td>${vinilo.precioInicial}</td>
                      <td>{vinilo.artista}</td>
                      <td>{vinilo.genero}</td>
                      <td>{vinilo.estatus}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => window.location.href = `/vinilo/${vinilo.viniloID}`}
                        >
                          Más información
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteVinilo(vinilo.viniloID)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center' }}>
                      {error ? `Error: ${error}` : 'No se encontraron registros.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Tabla de Usuarios */}
      <section className="table-section">
  <h2>Usuarios Registrados</h2>
  <button className="btn btn-secondary mb-3" onClick={toggleUserTable}>
    {showUserTable ? 'Ocultar Usuarios' : 'Mostrar Usuarios'}
  </button>
  {showUserTable && (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Foto de Perfil</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Fecha de Registro</th>
            <th>Último Acceso</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
  {usuarios.length > 0 ? usuarios.map((usuario, index) => {
    console.log(`Usuario #${index + 1}:`, usuario); // Verificar los datos del usuario
    return (
      <tr key={index}>
        <td>
          {usuario.imagenPerfil ? (
            <>
              {console.log('URL de imagen del usuario:', usuario.imagenPerfil)} {/* Verificar URL de la imagen */}
              <img
                src={usuario.imagenPerfil}
                alt="Foto de perfil"
                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
              />
            </>
          ) : (
            <img
              src="/user-image.png" // Imagen predeterminada
              alt="Usuario predeterminado"
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
            />
          )}
        </td>
        <td>{usuario.nombre}</td>
        <td>{usuario.username}</td>
        <td>{usuario.correo}</td>
        <td>{new Date(usuario.fechaRegistro).toLocaleDateString()}</td>
        <td>{new Date(usuario.ultimoAcceso).toLocaleString()}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteUsuario(usuario.usuarioID)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  }) : (
    <tr>
      <td colSpan="7" style={{ textAlign: 'center' }}>
        {error ? `Error: ${error}` : 'No se encontraron registros.'}
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  )}
</section>

      <footer className="footer">
        <div className="footer-container"></div>
      </footer>
    </div>
  );
};

export default Principal;




