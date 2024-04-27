import express, { Request, Response } from "express";
import cors from "cors";

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  const htmlResponse = `
    <html>
      <head>
        <title>BCRA Proxy CORS</title>
      </head>
      <body>
        <h1>BCRA Proxy CORS</h1>
        <p>Se trata de un servidor proxy que permite acceder a la API del Banco Central de Argentina sin encontrarse con conflictos de CORS.</p>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.get("/:url(*)", (req: Request, res: Response) => {
  const apiUrl = `https://api.estadisticasbcra.com/${req.params.url}`;
  const headers = {
    Authorization: req.get("Authorization") ?? "",
    "Content-Type": "application/json",
  };

  fetch(apiUrl, { headers, mode: "cors" })
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
