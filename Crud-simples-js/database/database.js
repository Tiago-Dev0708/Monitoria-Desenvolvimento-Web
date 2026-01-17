require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log('Conectado ao PostgreSQL com sucesso!');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS produtos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nome_produto VARCHAR(100) NOT NULL,
        quantidade INT NOT NULL,
        unidade_medida VARCHAR(20),
        valor NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(createTableQuery);
    console.log('Tabela "produtos" verificada/criada com sucesso.');
    client.release();
  } catch (err) {
    console.error('Erro ao inicializar o banco de dados:', err.stack);
    process.exit(1); 
  }
};

module.exports = {
  pool,
  initDb,
};