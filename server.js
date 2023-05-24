const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB bağlantı bilgileri
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Kullanıcıları döndüren endpoint
app.get('/recep', async (req, res) => {
  try {
    await client.connect();
    console.log('MongoDB\'ye bağlandı!');

    const db = client.db('test');
    const collection = db.collection('santrals');
    const users = await collection.find().toArray();

    res.json(users);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Bir hata oluştu.' });
  } finally {
    client.close();
    console.log('MongoDB bağlantısı kapatıldı!');
  }
});

// Statik dosyaları sunma
app.use(express.static('public'));

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor!`);
});
