const client = new HttpClient("https://jsonplaceholder.typicode.com");
 
document.querySelector("#apiForm").addEventListener("submit", async function (e) {
   // Exceed Expectations requirement: Structured JSON
    e.preventDefault();
 
   const method = document.querySelector("#method").value;
   const endpoint = document.querySelector("#endpoint").value;
   const query = document.querySelector("#query").value;
   const body = document.querySelector("#body").value;
 
   let queryParams = {};
   let data = null;
 
   try {
      if (query) queryParams = JSON.parse(query);
      if (body) data = JSON.parse(body);
   } catch (err) {
      document.querySelector("#response").textContent = "Invalid JSON in query or body.";
      return;
   }
 
   let result;
   switch (method) {
      case "GET":
         result = await client.get(endpoint, queryParams);
         break;
      case "POST":
         result = await client.post(endpoint, data);
         break;
      case "PUT":
         result = await client.put(endpoint, data);
         break;
      case "PATCH":
         result = await client.patch(endpoint, data);
         break;
      case "DELETE":
         result = await client.delete(endpoint);
         break;
   }
 
   document.querySelector("#response").textContent = JSON.stringify(result, null, 2);
});
