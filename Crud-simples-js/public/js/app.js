const API_URL = 'http://localhost:8081/produtos';

const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const productIdInput = document.getElementById('product-id');
const nomeInput = document.getElementById('nome_produto');
const qtdInput = document.getElementById('quantidade');
const unidadeInput = document.getElementById('unidade_medida');
const valorInput = document.getElementById('valor');
const cancelBtn = document.getElementById('btn-cancelar');

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Falha no fetchProducts:', error);
  }
}

async function createProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar produto');
    }
    fetchProducts(); 
    clearForm();
  } catch (error) {
    console.error('Falha no createProduct:', error);
  }
}

async function updateProduct(id, product) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }
    fetchProducts();
    clearForm();
  } catch (error) {
    console.error('Falha no updateProduct:', error);
  }
}

async function deleteProduct(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar produto');
    }
    fetchProducts(); 
  } catch (error) {
    console.error('Falha no deleteProduct:', error);
  }
}

function displayProducts(products) {
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhum produto cadastrado.</td></tr>';
    return;
  }

  products.forEach(product => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${product.nome_produto}</td>
      <td>${product.quantidade}</td>
      <td>${product.unidade_medida}</td>
      <td>R$ ${parseFloat(product.valor).toFixed(2)}</td>
      <td class="action-buttons">
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Excluir</button>
      </td>
    `;

    tr.querySelector('.btn-edit').addEventListener('click', () => handleEdit(product));
    tr.querySelector('.btn-delete').addEventListener('click', () => deleteProduct(product.id));

    productList.appendChild(tr);
  });
}

function handleEdit(product) {
  productIdInput.value = product.id;
  nomeInput.value = product.nome_produto;
  qtdInput.value = product.quantidade;
  unidadeInput.value = product.unidade_medida;
  valorInput.value = product.valor;

  window.scrollTo(0, 0);
}

function clearForm() {
  productForm.reset();
  productIdInput.value = '';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const id = productIdInput.value;
  const product = {
    nome_produto: nomeInput.value,
    quantidade: parseInt(qtdInput.value, 10),
    unidade_medida: unidadeInput.value,
    valor: parseFloat(valorInput.value),
  };

  if (id) {
    await updateProduct(id, product);
  } else {
    await createProduct(product);
  }
}

productForm.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', clearForm);
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});