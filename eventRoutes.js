import express from 'express';
import db from './db.js'; // Importar la configuración de la base de datos

const router = express.Router();

// Ruta para obtener los eventos recientes junto con la portada y el precio del vinilo
router.get('/eventos', async (req, res) => {
  try {
    const query = `
      SELECT 
        evento.eventoID,
        evento.nombreEvento,
        evento.descripcionEvento,
        evento.fechaInicio,
        evento.fechaTermino,
        vinilo.viniloID,
        vinilo.portada,
        vinilo.titulo,
        CAST(vinilo.precioInicial AS DECIMAL(10, 2)) AS precioInicial
      FROM evento
      JOIN vinilo ON evento.viniloID = vinilo.viniloID
      ORDER BY evento.fechaInicio DESC;
    `;

    const [rows] = await db.query(query);

    // Convertir la columna `portada` de cada vinilo de BLOB a una cadena Base64
    const eventosConPortada = rows.map(evento => {
      if (evento.portada) {
        evento.portada = `data:image/jpeg;base64,${evento.portada.toString('base64')}`;
      }
      return evento;
    });

    res.json({ success: true, data: eventosConPortada });
  } catch (error) {
    console.error('Error en /eventos:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/vinilos/:viniloID', async (req, res) => {
  const { viniloID } = req.params;
  const { precioInicial } = req.body;

  if (precioInicial === undefined || isNaN(precioInicial)) {
    return res.status(400).json({ success: false, message: 'Precio inicial no válido' });
  }

  try {
    // Verificar el precio actual
    const [rows] = await db.query('SELECT precioInicial FROM vinilo WHERE viniloID = ?', [viniloID]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Vinilo no encontrado' });
    }

    const precioActual = rows[0].precioInicial;

    if (parseFloat(precioInicial) <= parseFloat(precioActual)) {
      return res.status(400).json({
        success: false,
        message: 'El nuevo precio debe ser mayor al precio inicial actual',
      });
    }

    // Actualizar el precio inicial
    const query = `
      UPDATE vinilo
      SET precioInicial = ?
      WHERE viniloID = ?;
    `;
    const [result] = await db.query(query, [precioInicial, viniloID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Vinilo no encontrado' });
    }

    res.json({ success: true, message: 'Precio inicial actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el precio inicial:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


export default router;




