import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PesquisaLivro from "../../componentes/Pesquisar";
import Header from "../../componentes/Header";

const CategoriaPage = () => {
  const { genero } = useParams();
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    axios
      .get("/livros.json")
      .then((res) => {
        const livrosFiltrados = res.data.livros.filter((livro: { genero: string }) => livro.genero === genero);
        setLivros(livrosFiltrados);
      })
      .catch((err) => console.error("Erro ao carregar os livros:", err));
  }, [genero]);

  return (
    <div>
      <Header></Header>
      <PesquisaLivro livros={livros} />
    </div>
  );
};

export default CategoriaPage;