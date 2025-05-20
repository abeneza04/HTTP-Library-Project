const api = new HTTPLibrary('https://jsonplaceholder.typicode.com');

document.getElementById('send').addEventListener('click', async () => {
  const method = document.getElementById('request').value;
  const route = document.getElementById('route').value.trim();
  const param = document.getElementById('param').value.trim();
  const queryInput = document.getElementById('queries').value;
  const dataInput = document.getElementById('data').value;
  const output = document.getElementById('output');
  output.textContent = ''; 

  let query={};
  try {
    query = JSON.parse(queryInput);
    console.log("Parse successfull!");
  } catch (error) {
    console.log("Not JSON");
  }

  let data = {};
  try {
    data = JSON.parse(dataInput);
    console.log("Parse successful!");
  } catch (error) {
    console.log("Not JSON, sending empty object");
  }

  try {
    let result;
    switch (method) {
      case 'GET': result = await api.get(route, param, query); break;
      case 'DELETE': result = await api.delete(route, param, query); break;
      case 'POST': result = await api.post(route, param, query, data); break;
      case 'PUT': result = await api.put(route, param, query, data); break;
      case 'PATCH': result = await api.patch(route, param, query, data); break;
    
      default:
        throw new Error(`HTTP method "${method}" not supported yet.`);
    }
    
    output.innerHTML = updatePage(result);
  } catch (error) {
    output.innerHTML = `
      <div class="error-message">
        <strong>Error:</strong> ${error.message}
      </div>
    `;
  }
});

function updatePage(value) {
  if (typeof value === 'object' && value !== null) {
    const isArray = Array.isArray(value);
    if (isArray) {
      return value.map((item) => {
        const id = item.id !== undefined ? `<h4>User ID: ${item.id}</h4>` : '';
        return `
          <div>
            ${id}
            ${updatePage(item)}
          </div>
        `;
      }).join('');
    }
    const children = Object.entries(value).map(([key, val])=> {
      const content = updatePage(val);
      return `<li><strong>${isArray? '': key} : </strong>${content}</li>`;
    });
    return `<ul>${children.join('')}`;
  } else {
    return String(value);
  }
}
  

