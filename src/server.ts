import express from "express";
import cors from "cors";

interface Growdever {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  address?: string;
}

const app = express();
app.use(cors());
app.use(express.json());

const growdevers: Growdever[] = [];

app.get("/", (req, res) => res.json({ message: "Cadastro de Alunos Growdev" }));

app.post("/growdevers", async (req, res) => {
  const { name, email, dateOfBirth, phone, address } = req.body;
  if (name === "" || email === "" || dateOfBirth === "" || phone === "") {
    return res.status(402).json({
      error: "Por Favor informe name,email,data de nascimento e endereço",
    });
  }
  const validGrowdever = growdevers.some(
    (growdever) => growdever.email === email
  );
  if (validGrowdever) {
    return res.status(402).json({ error: "E-mail já cadastrado" });
  } else {
    const id = Math.floor(Math.random() * 6767);
    const newGrowdever = { id, name, email, dateOfBirth, phone, address };
    growdevers.push(newGrowdever);
    return res.status(200).json({ message: "Growdever criado com Sucesso" });
  }
});

app.get("/growdevers", (req, res) => {
  res.status(200).json(growdevers);
});

app.get("/growdevers/:id", (req, res) => {
  const { id } = req.params;

  const validGrowdever = growdevers.find(
    (growdever) => growdever.id === Number(id)
  );
  if (validGrowdever) {
    res
      .status(200)
      .json({ message: "Growdever listado com sucesso", data: validGrowdever });
  } else {
    res.status(404).json({ error: "Growdever não encontrado" });
  }
});

app.put("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, dateOfBirth, phone, address } = req.body;

  const validGrowdever = growdevers.find(
    (growdever) => growdever.id === Number(id)
  );
  if (!validGrowdever) {
    res.status(404).json({ error: "Growdever não encontrado" });
  } else {
    validGrowdever.name = name;
    validGrowdever.email = email;
    validGrowdever.dateOfBirth = dateOfBirth;
    validGrowdever.phone = phone;
    validGrowdever.address = address;

    res.status(200).json({ message: "Growdever atualizado com sucesso" });
  }
});

app.delete("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const growdeverIndex = growdevers.findIndex(
    (growdever) => growdever.id === Number(id)
  );
  if (growdeverIndex === -1) {
    res.status(404).json({ error: "Growdever não encontrado" });
  }
  growdevers.splice(growdeverIndex, 1);
  res.status(200).json({ message: "Growdever excluído com sucesso" });
});

app.listen(8080, () => console.log("Server is running"));
