require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { initDb, pool } = require('./database/database');
const service = require('./services/ProductService');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API de Produtos está no ar!' });
});

app.post('/produtos', async (req, res) => {
  try {
    const newProduct = await service.createProduct(req.body);
    res.status(201).json(newProduct); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar produto', details: err.message });
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const products = await service.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos', details: err.message });
  }
});

app.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await service.getProductById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' }); 
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produto', details: err.message });
  }
});

app.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await service.updateProduct(id, req.body);

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Produto não encontrado para atualização' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar produto', details: err.message });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.deleteProduct(id);

    if (deletedProduct) {
      res.status(200).json({ message: 'Produto deletado com sucesso', product: deletedProduct });
    } else {
      res.status(404).json({ error: 'Produto não encontrado para deleção' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar produto', details: err.message });
  }
});

const startServer = async () => {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
    process.on('exit', async () => {
      console.log('Fechando pool de conexões com o banco...');
      await pool.end();
    });
    process.on('SIGINT', () => process.exit()); 
    
  } catch (error) {
    console.error('Erro fatal ao iniciar a aplicação:', error);
    process.exit(1);
  }
};

startServer();