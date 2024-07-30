document.addEventListener('DOMContentLoaded', function() {
  const productForm = document.getElementById('productForm');
  const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
  let editIndex = -1;

  productForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const barcode = document.getElementById('barcode').value;
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const size = document.getElementById('size').value;

      if (editIndex === -1) {
          addProduct(barcode, name, price, size);
      } else {
          updateProduct(editIndex, barcode, name, price, size);
          editIndex = -1;
      }

      productForm.reset();
      saveProducts();
  });

  function addProduct(barcode, name, price, size) {
      const row = productTable.insertRow();
      row.insertCell(0).textContent = barcode;
      row.insertCell(1).textContent = name;
      row.insertCell(2).textContent = price;
      row.insertCell(3).textContent = size;

      const actionsCell = row.insertCell(4);
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => editProduct(row.rowIndex - 1);
      actionsCell.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteProduct(row.rowIndex - 1);
      actionsCell.appendChild(deleteButton);
  }

  function updateProduct(index, barcode, name, price, size) {
      const row = productTable.rows[index];
      row.cells[0].textContent = barcode;
      row.cells[1].textContent = name;
      row.cells[2].textContent = price;
      row.cells[3].textContent = size;
  }

  function editProduct(index) {
      const row = productTable.rows[index];
      document.getElementById('barcode').value = row.cells[0].textContent;
      document.getElementById('name').value = row.cells[1].textContent;
      document.getElementById('price').value = row.cells[2].textContent;
      document.getElementById('size').value = row.cells[3].textContent;
      editIndex = index;
  }

  function deleteProduct(index) {
      productTable.deleteRow(index);
      saveProducts();
  }

  function saveProducts() {
      const products = [];
      for (let i = 0; i < productTable.rows.length; i++) {
          const row = productTable.rows[i];
          products.push({
              barcode: row.cells[0].textContent,
              name: row.cells[1].textContent,
              price: row.cells[2].textContent,
              size: row.cells[3].textContent
          });
      }
      localStorage.setItem('products', JSON.stringify(products));
  }

  function loadProducts() {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      products.forEach(product => {
          addProduct(product.barcode, product.name, product.price, product.size);
      });
  }

  loadProducts();
});
