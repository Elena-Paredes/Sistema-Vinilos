import express from 'express';
import cors from 'cors'; // Middleware para manejar CORS
import vinylRoutes from './vinylRoutes.js'; 
import eventRoutes from './eventRoutes.js';
import authRoutes from './authRoutes.js'; // Importando correctamente

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());


app.use(express.json({ limit: '10mb' }));

// Rutas
app.use('/api', vinylRoutes);
app.use('/api', eventRoutes);
app.use("/api", authRoutes); 

// Ruta para probar la conexión con la base de datos
app.get('/api', async (req, res) => {
  res.json({ success: true, message: 'La conexión está funcionando correctamente.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


