// src/vinylRoutes.jsx
import express from 'express';
import db from './db.js'; // Asegúrate de que esta conexión exista
import multer from 'multer';

const storage = multer.memoryStorage(); // Guardar archivos en memoria
const upload = multer({ storage }); // Middleware para manejar uploads

const router = express.Router();

// Ruta para obtener todos los vinilos
router.get('/vinilos', async (req, res) => {
    try {
      const query = `
        SELECT
          vinilo.viniloID,
          vinilo.portada,
          vinilo.titulo,
          vinilo.anioLanzamiento,
          vinilo.precioInicial,
          artista.nombreArtista AS artista,
          genero.nombreGenero AS genero,
          estatus_vinilo.nombreEstatusVinilo AS estatus
        FROM vinilo
        JOIN artista ON vinilo.artistaID = artista.artistaID
        JOIN genero ON vinilo.generoID = genero.generoID
        JOIN estatus_vinilo ON vinilo.estatusViniloID = estatus_vinilo.estatusViniloID
      `;
      const [rows] = await db.query(query);
  
      // Convertir las imágenes a Base64
      const data = rows.map((vinilo) => ({
        ...vinilo,
        portada: vinilo.portada ? `data:image/jpeg;base64,${Buffer.from(vinilo.portada).toString('base64')}` : null,
      }));
  
      res.json({ success: true, data });
    } catch (error) {
      console.error('Error en /vinilos:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // Ruta para obtener los detalles de un vinilo específico
  router.get('/vinilos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const query = `
        SELECT 
          vinilo.viniloID,
          vinilo.portada,
          vinilo.descripcion,
          vinilo.precioInicial,
          vinilo.muestraMusica,
          vinilo.unboxingVideo
        FROM vinilo
        WHERE vinilo.viniloID = ?;
      `;
      const [rows] = await db.query(query, [id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ success: false, error: "Vinilo no encontrado" });
      }
  
      const vinilo = rows[0];
  
      // Convertir datos binarios a Base64
      vinilo.portada = vinilo.portada
        ? `data:image/jpeg;base64,${Buffer.from(vinilo.portada).toString('base64')}`
        : null;
      vinilo.muestraMusica = vinilo.muestraMusica
        ? `data:audio/mp3;base64,${Buffer.from(vinilo.muestraMusica).toString('base64')}`
        : null;
      vinilo.unboxingVideo = vinilo.unboxingVideo
        ? `data:video/mp4;base64,${Buffer.from(vinilo.unboxingVideo).toString('base64')}`
        : null;
  
      res.json({ success: true, data: vinilo });
    } catch (error) {
      console.error('Error en /vinilos/:id:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // Ruta para actualizar un vinilo
  router.put(
    '/vinilos/:id',
    upload.fields([
      { name: 'portada', maxCount: 1 },
      { name: 'muestraMusica', maxCount: 1 },
      { name: 'unboxingVideo', maxCount: 1 },
    ]),
    async (req, res) => {
      const { id } = req.params;
      const portada = req.files.portada ? req.files.portada[0].buffer : null;
      const muestraMusica = req.files.muestraMusica ? req.files.muestraMusica[0].buffer : null;
      const unboxingVideo = req.files.unboxingVideo ? req.files.unboxingVideo[0].buffer : null;
  
      try {
        const query = `
          UPDATE vinilo
          SET 
            portada = COALESCE(?, portada),
            muestraMusica = COALESCE(?, muestraMusica),
            unboxingVideo = COALESCE(?, unboxingVideo)
          WHERE viniloID = ?;
        `;
        const values = [portada, muestraMusica, unboxingVideo, id];
  
        await db.query(query, values);
  
        // Recuperar los datos actualizados
        const [updatedVinilo] = await db.query("SELECT * FROM vinilo WHERE viniloID = ?", [id]);
  
        updatedVinilo[0].portada = updatedVinilo[0].portada
          ? `data:image/jpeg;base64,${Buffer.from(updatedVinilo[0].portada).toString('base64')}`
          : null;
        updatedVinilo[0].muestraMusica = updatedVinilo[0].muestraMusica
          ? `data:audio/mp3;base64,${Buffer.from(updatedVinilo[0].muestraMusica).toString('base64')}`
          : null;
        updatedVinilo[0].unboxingVideo = updatedVinilo[0].unboxingVideo
          ? `data:video/mp4;base64,${Buffer.from(updatedVinilo[0].unboxingVideo).toString('base64')}`
          : null;
  
        res.json({ success: true, data: updatedVinilo[0] });
      } catch (error) {
        console.error('Error en /vinilos/:id (PUT):', error.message);
        res.status(500).json({ success: false, error: error.message });
      }
    }
  );

  router.delete('/vinilos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // Primero eliminar los eventos asociados al vinilo
      const deleteEventosQuery = `
        DELETE FROM evento
        WHERE viniloID = ?;
      `;
      await db.query(deleteEventosQuery, [id]);
  
      // Luego eliminar el vinilo
      const deleteViniloQuery = `
        DELETE FROM vinilo
        WHERE viniloID = ?;
      `;
      await db.query(deleteViniloQuery, [id]);
  
      res.json({ success: true, message: 'Vinilo y eventos asociados eliminados correctamente' });
    } catch (error) {
      console.error('Error en /vinilos/:id (DELETE):', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

  export default router;

