import express from 'express';
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 27017;

// MongoDB bağlantı URL'si
const mongoUrl = 'mongodb://localhost:27017';

// MongoDB'ye bağlanma işlemi
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then(client => {
    console.log('MongoDB ile bağlantı kuruldu');

    // MongoDB veritabanına erişim
    const db = client.db('testDb');
    const collection = db.collection('santrals'); // Koleksiyon adını burada belirtin

    // Express.js rotaları
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '', 'index.html'));

      // Verileri MongoDB'den çekme işlemi
      collection.find({}).toArray()
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          console.error('Veri okuma hatası:', err);
          res.status(500).send('Veri okuma hatası');
        });
    });

    // Sunucuyu dinlemeye başla
    app.listen(port, () => {
      console.log(`Sunucu çalışıyor: http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB bağlantı hatası:', err);
  });
