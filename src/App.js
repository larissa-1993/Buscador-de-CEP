import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./api";
import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [Cep, setCep] = useState({}); 

  async function handleSearch() {
    if (input === "") {
      alert('Preencha algum CEP!');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert('Ops, erro ao buscar CEP!');
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(Cep).length > 0 && ( 
        <main className="main">
          <h2>CEP: {Cep.cep}</h2>
          <span>{Cep.logradouro}</span>
          <span>{Cep.complemento}</span>
          <span>{Cep.bairro}</span>
          <span>{Cep.localidade} - {Cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
