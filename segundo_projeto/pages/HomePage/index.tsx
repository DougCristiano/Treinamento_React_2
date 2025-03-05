import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../componentes/Header/index";
import banner from "../../src/assets/Img_BannerArea.png";
import style from "./styles.module.css";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  capa: string;
  preco: number;
  genero: string;
}

const LivrosCategorias = () => {
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    axios
      .get("/livros.json")
      .then((res) => setLivros(res.data.livros))
      .catch((err) => console.error("Erro ao carregar os livros:", err));
  }, {} as Record<string, Livro[]>);

  const categorias = livros.reduce((acc, livro) => {
    if (!acc[livro.genero]) {
      acc[livro.genero] = [];
    }
    acc[livro.genero].push(livro);
    return acc;
  }, {});

  return (
    <div className={style.conteinerlivrosexternos}>
      {Object.entries(categorias).length > 0 ? (
        Object.entries(categorias).map(([genero, livros]) => (
          <div className={style.distanciacategoria} key={genero}>
            <div className={style.tituloebotao}>
              <h2>{genero}</h2>
              <Link to={`/categoria/${genero}`}>
                <button>Ver Mais</button>
              </Link>
            </div>
            <div className={style.conjuntolivros}>
              {livros.slice(0, 4).map((livro: Livro) => (
                <Link
                  to={`/livro/${livro.id}`}
                  key={livro.id}
                  className={style.linklivro}
                >
                  <div className={style.livrosaparecendo}>
                    <img
                      className={style.capalivro}
                      src={livro.capa}
                      alt={livro.titulo}
                    />
                    <div className={style.conteinerlivrosinterno}>
                      <div>
                        <h3 className={style.titulolivro}>{livro.titulo}</h3>
                        <br />
                        <p className={style.autorlivro}>{livro.autor}</p>
                      </div>
                      <div>
                        <p className={style.precolivro}>
                          R$ {livro.preco.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Carregando livros...</p>
      )}
    </div>
  );
};

function Home() {
  return (
    <>
      <Header />
      <div className={style.corpo}>
        <img
          className={style.banner}
          src={banner}
          alt="Banner de desconto da loja de 25%"
        />
        <div className={style.categorias}>
          <LivrosCategorias />
        </div>
      </div>
    </>
  );
}

export default Home;
