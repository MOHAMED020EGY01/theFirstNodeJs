import * as http from "http";
import fs from "fs";
import path from "path";
// Create a local server to receive data from
const port = 5599;
const pathFile = path.join(__dirname, "data", "product.json");
const datas = {
  name: "product4",
  price: 400,
};

const server = http.createServer((req, res) => {
  if (req.url === "/products") {
    fs.readFile(pathFile, "utf-8", (err, data) => {
      fs.access(pathFile, (err) => {
        if (err) {
          console.log(`The file ${pathFile} Not exists.`);
          res.end();
          return;
        }

        const products = JSON.parse(data);
        console.log("Products Test",products);
        
        res.writeHead(200, { "Content-Type": "application/json" });
        console.log(err);

        
        products.production.push(datas);
        const AllProducts = products;
        console.log("Products After Push",AllProducts);
        fs.writeFile(
          pathFile,
          JSON.stringify(AllProducts, null, 2),
          { flag: "w" },
          (err) => {}
        );
        
        console.log(JSON.parse(data));
        res.write(data);
        console.log("File read successfully");
        res.end();
      });
    });
  } else if (req.url === "/new") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Page</title>
    </head>
    <body>
      <h1>This is a New Page</h1>
      <form action="/add-product" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
       <br>
        <label for="price">Price:</label>
        <input type="number" id="price" name="price" required>
        <br>
        <button type="submit">Go to Products</button>
      </form>
    </body>
    </html>`);
    res.end();
  } else if (req.method === "POST" && req.url === "/add-product") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const parsedBody = new URLSearchParams(body);
      console.log(parsedBody);
    });
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Product added successfully!");
    res.end();
  } else if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello, this is the home page!");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is working on port http://localhost:${port}`);
});
