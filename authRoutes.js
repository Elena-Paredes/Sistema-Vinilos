// src/authRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import pool from './db.js'; // Asegúrate de usar la extensión .js en ES Modules

const router = express.Router();

// Ruta para registrar usuarios
router.post('/signup', async (req, res) => {
  const { firstName, lastName, username, email, password, profileImage } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convertir la imagen a un buffer si se envía en base64
    let imagenBuffer = null;
    if (profileImage) {
      try {
        const base64Data = profileImage.split(',')[1]; // Extraer la parte de datos del base64
        imagenBuffer = Buffer.from(base64Data, 'base64');
      } catch (error) {
        console.error('Error al procesar la imagen de perfil:', error);
        return res.status(400).json({ message: 'Formato de imagen no válido' });
      }
    }

    await pool.execute(
      `INSERT INTO usuario (nombre, apellido, username, correo, contrasenia, coins, imagenPerfil, fechaRegistro, ultimoAcceso) 
       VALUES (?, ?, ?, ?, ?, 0, ?, CURDATE(), NOW())`,
      [firstName, lastName, username, email, hashedPassword, imagenBuffer]
    );

    res.json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ message: 'Error registrando usuario' });
  }
});

router.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         usuarioID, 
         nombre, 
         username, 
         correo, 
         fechaRegistro, 
         ultimoAcceso, 
         imagenPerfil
       FROM usuario`
    );

    // Verificar y procesar las imágenes de perfil
    const usuarios = rows.map((user) => {
      let imagenPerfilBase64 = null;
    
      if (user.imagenPerfil) {
        try {
          const mimeType = 'image/jpeg'; // Cambia a image/png si es necesario
          imagenPerfilBase64 = `data:${mimeType};base64,${Buffer.from(user.imagenPerfil).toString('base64')}`;
        } catch (error) {
          console.error('Error al procesar la imagen de perfil:', error.message);
        }
      }
    
      return {
        ...user,
        imagenPerfil: imagenPerfilBase64,
      };
    });
    

    console.log('Usuarios enviados:', usuarios); // Depuración para confirmar los datos enviados
    res.json({ success: true, data: usuarios });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error.message);
    res.status(500).json({ success: false, error: 'Error al obtener los usuarios' });
  }
});




/* Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         usuarioID, 
         nombre, 
         username, 
         correo, 
         fechaRegistro, 
         ultimoAcceso 
       FROM usuario`
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error.message);
    res.status(500).json({ success: false, error: 'Error al obtener los usuarios' });
  }
});*/

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuario WHERE usuarioID = ?', [id]);
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({ success: false, error: 'Error al eliminar usuario' });
  }
});

// Ruta para iniciar sesión
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(`SELECT * FROM usuario WHERE username = ?`, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.contrasenia);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Convertir la imagen a base64 si existe
    let imagenPerfilBase64 = null;
    if (user.imagenPerfil) {
      try {
        const mimeType = 'image/jpeg'; // Cambia esto según el tipo de imagen almacenada (por ejemplo, 'image/png')
        imagenPerfilBase64 = `data:${mimeType};base64,${Buffer.from(user.imagenPerfil).toString('base64')}`;
      } catch (error) {
        console.error('Error al convertir la imagen de perfil:', error.message);
      }
    }

    // Responder con la información del usuario, incluyendo la imagen en formato base64
    res.json({
      success: true,
      user: {
        usuarioID: user.usuarioID,
        username: user.username,
        nombre: user.nombre,
        imagenPerfil: imagenPerfilBase64,
      },
    });
  } catch (error) {
    console.error('Error iniciando sesión:', error.message);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

export default router;

