const { pool } = require('../database/database');

const createProduct = async (produto) => {
  const { nome_produto, quantidade, unidade_medida, valor } = produto;
  const query = `
    INSERT INTO produtos (nome_produto, quantidade, unidade_medida, valor)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [nome_produto, quantidade, unidade_medida, valor];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Erro ao criar produto:', err.stack);
    throw err;
  }
};

const getAllProducts = async () => {
  const query = 'SELECT * FROM produtos ORDER BY nome_produto;';
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error('Erro ao buscar produtos:', err.stack);
    throw err;
  }
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM produtos WHERE id = $1;';
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    console.error('Erro ao buscar produto por ID:', err.stack);
    throw err;
  }
};

const updateProduct = async (id, produto) => {
  const { nome_produto, quantidade, unidade_medida, valor } = produto;
  const query = `
    UPDATE produtos
    SET nome_produto = $1, quantidade = $2, unidade_medida = $3, valor = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [nome_produto, quantidade, unidade_medida, valor, id];

  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar produto:', err.stack);
    throw err;
  }
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM produtos WHERE id = $1 RETURNING *;';
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0]; 
  } catch (err) {
    console.error('Erro ao deletar produto:', err.stack);
    throw err;
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};