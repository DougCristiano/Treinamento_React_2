import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Header from "../../componentes/Header";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { CarrinhoContext, Livro } from "../../contexto/index";

const DetalhesLivro = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState<Livro | null>(null);
  const { adicionarAoCarrinho } = useContext(CarrinhoContext) as { adicionarAoCarrinho: (livro: Livro) => void };

  useEffect(() => {
    axios
      .get("/livros.json")
      .then((res) => {
        const livroEncontrado = res.data.livros.find(
          (livro: Livro) => livro.id === parseInt(id ?? '', 10)
        );
        setLivro(livroEncontrado);
      })
      .catch((err) => console.error("Erro ao carregar o livro:", err));
  }, [id]);

  if (!livro) {
    return <p>Carregando...</p>;
  }

  const handleAdicionarAoCarrinho = () => {
    adicionarAoCarrinho(livro);
    alert(`${livro.titulo} foi adicionado ao carrinho!`);
  };

  return (
    <>
      <Header />
      <div>
        <div className={style.voltar}>
          <Link to="/home">
            <h3> &lt; Detalhes do Livro</h3>
          </Link>
        </div>
        <div className={style.conteinerexterno4}>
          <div className={style.img2}>
            <img src={livro.capa} alt={livro.titulo} />
          </div>
          <div className={style.conteinerinterno4}>
            <div className={style.conteinerinterno5}>
              <h1>{livro.titulo}</h1>
              <p>Autor: {livro.autor}</p>
            </div>
            <div className={style.conteinerinterno6}>
              <h2>Sinopse</h2>
              <p className={style.sinopse}>{livro.sinopse}</p>
            </div>
          </div>
        </div>
        <button className={style.botaocomprar} onClick={handleAdicionarAoCarrinho}>
          <div className={style.comprar}>
            <p>Preço: R$ {livro.preco.toFixed(2)}</p>
            <p>Adicionar ao carrinho</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default DetalhesLivro;