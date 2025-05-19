const api = new HTTPLibrary('https://jsonplaceholder.typicode.com');

document.getElementById('send').addEventListener('click', async () => {
  const method = document.getElementById('request').value;
  const route = document.getElementById('route').value.trim();
  const param = document.getElementById('param').value.trim();
  let query = document.getElementById('queries').value.trim();
  const dataInput = document.getElementById('data').value.trim();
  const output = document.getElementById('output');
  output.textContent = ''; 

  try {
    query = JSON.parse(query);
    console.log("Parse successfull!");
  } catch (error) {
    console.log("Not JSON");
  }

  try {
    let result;
    switch (method) {
      case 'GET': result = await api.get(route, param, query); break;
      case 'DELETE': result = await api.delete(route, param, query); break;
    
      default:
        throw new Error(`HTTP method "${method}" not supported yet.`);
    }

    output.innerHTML = `<p>${JSON.stringify(result)}</p>`;
  } catch (error) {
    output.innerHTML = `
      <div class="error-message">
        <strong>Error:</strong> ${error.message}
      </div>
    `;
  }
});



  

