const router = require('express').Router();
const musicC = require('../controllers/musicController')

router.get('/getAll',musicC.getAll)
router.post('/insert',musicC.insert)
router.get('/getById/:id', musicC.getById);
router.put('/update/:id',musicC.update);
router.delete('/delete/:id', musicC.delete);
router.get('/descargar-audio', async (req, res) => {
    try {
      const url = req.query.url; // Obtener la URL del audio desde los parámetros de la solicitud
      const options = {
        output: 'audio.mp3', // Nombre del archivo de salida
        extractAudio: true, // Extrae solo el audio
        audioFormat: 'mp3', // Formato de audio
        restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
     //   ffmpegPath: ffmpegPath, // Ruta al ejecutable ffmpeg en tu sistema
      };
  
      await exec(url, options); // Descargar el audio
  
      // Enviar el archivo de audio como respuesta al frontend
      res.download(__dirname + '/audio.mp3', 'audio.mp3', (err) => {
        if (err) {
          console.error('Ocurrió un error al enviar el archivo al frontend:', err);
          res.status(500).send('Ocurrió un error al enviar el archivo al frontend');
        } else {
          console.log('¡Audio descargado y enviado exitosamente al frontend!');
        }
      });
    } catch (error) {
      console.error('Ocurrió un error al descargar el audio:', error);
      res.status(500).send('Ocurrió un error al descargar el audio');
    }
  });


module.exports = router;