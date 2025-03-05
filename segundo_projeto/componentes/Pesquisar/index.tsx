import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./styles.module.css";

const PesquisaLivro = ({ livros }) => {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [resultadoPesquisa, setResultadoPesquisa] = useState(null);
  const [pesquisaAtiva, setPesquisaAtiva] = useState(false);

  const pesquisarLivro = () => {
    if (termoPesquisa.trim() === "") {
      alert("A pesquisa está vazia. Iremos mostrar todos os livros disponíveis.");
      setResultadoPesquisa(null);
      setPesquisaAtiva(false);
      return;
    }

    const livroEncontrado = livros.find((livro) =>
      livro.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    if (livroEncontrado) {
      setResultadoPesquisa(livroEncontrado);
      setPesquisaAtiva(true);
    } else {
      alert("Desculpe, não temos este livro na loja.");
      setResultadoPesquisa(null);
      setPesquisaAtiva(false);
    }
  };

  return (
    <div>
      <div className={style.caixadepesquisa}>
        <button className={style.botaopesquisar} onClick={pesquisarLivro}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_1_588)">
              <path
                d="M18.6667 18.6667L14.6791 14.672M16.8889 9.33333C16.8889 11.3372 16.0929 13.259 14.6759 14.6759C13.259 16.0929 11.3372 16.8889 9.33333 16.8889C7.32947 16.8889 5.40768 16.0929 3.99074 14.6759C2.5738 13.259 1.77777 11.3372 1.77777 9.33333C1.77777 7.32947 2.5738 5.40768 3.99074 3.99074C5.40768 2.5738 7.32947 1.77777 9.33333 1.77777C11.3372 1.77777 13.259 2.5738 14.6759 3.99074C16.0929 5.40768 16.8889 7.32947 16.8889 9.33333V9.33333Z"
                stroke="#090937"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_588">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <input
          className={style.inputpesquisar}
          type="text"
          placeholder="Pesquisar por título..."
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
      </div>

      {pesquisaAtiva && resultadoPesquisa ? (
        <div>
          <div className={style.titulocategoria}>
            <h1>{resultadoPesquisa.genero}</h1>
            <h3>Resultado da Pesquisa:</h3>
          </div>
          <div className={style.conteinerexterno1}>
            <Link
              to={`/livro/${resultadoPesquisa.id}`}
              className={style.linklivro}
            >
              <div className={style.conteinerexterno2}>
                <div className={style.conteinerinterno1}>
                  <img
                    className={style.capalivro2}
                    src={resultadoPesquisa.capa}
                    alt={resultadoPesquisa.titulo}
                  />
                </div>
                <div className={style.conteinerinterno2}>
                  <h4 className={style.titulolivro2}>{resultadoPesquisa.titulo}</h4>
                  <div className={style.conteinerinterno3}>
                    <p className={style.autorlivro2}>{resultadoPesquisa.autor}</p>
                    <p className={style.precolivro2}>
                      R$ {resultadoPesquisa.preco.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className={style.titulocategoria}>
            <Link to="/home">
              <h3>&lt; {livros[0]?.genero || "Gênero Desconhecido"}</h3>
            </Link>
          </div>
          <div className={style.conteinerexterno1}>
            {livros.map((livro) => (
              <Link
                to={`/livro/${livro.id}`}
                key={livro.id}
                className={style.linklivro}
              >
                <div
                  className={style.conteinerexterno2}
                  style={{ border: "1px solid #ddd", padding: "10px" }}
                >
                  <div className={style.conteinerinterno1}>
                    <img
                      className={style.capalivro2}
                      src={livro.capa}
                      alt={livro.titulo}
                    />
                  </div>
                  <div className={style.conteinerinterno2}>
                    <h4 className={style.titulolivro2}>{livro.titulo}</h4>
                    <div className={style.conteinerinterno3}>
                      <p className={style.autorlivro2}>{livro.autor}</p>
                      <p className={style.precolivro2}>
                        R$ {livro.preco.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PesquisaLivro;