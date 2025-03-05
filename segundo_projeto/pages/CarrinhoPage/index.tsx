import { useContext, useEffect, useState } from "react";
import { CarrinhoContext } from "../../contexto";
import Header from "../../componentes/Header";
import style from "./style.module.css";
import axios from "axios";

interface Livro {
  id: number;
  capa: string;
  titulo: string;
  autor: string;
  quantidade: number;
  preco: number;
  sinopse: string;
  genero: string; // Adicionado o gênero
}

const LivroAleatorio = ({ livro }: { livro: Livro | null }) => {
  if (!livro) {
    return <p>Nenhum livro recomendado no momento.</p>;
  }

  return (
    <div className={style.livroAleatorio}>
      <img
        src={livro.capa}
        alt={livro.titulo}
        className={style.capaAleatoria}
      />
      <div className={style.detalhesAleatorios}>
        <h2>{livro.titulo}</h2>
        <p>Autor: {livro.autor}</p>
        <p>Preço: R$ {livro.preco.toFixed(2)}</p>
      </div>
    </div>
  );
};

const CarrinhoPage = () => {
  const { carrinho, removerDoCarrinho } = useContext(CarrinhoContext) as {
    carrinho: Livro[];
    removerDoCarrinho: (id: number) => void;
  };

  const [livroAleatorio, setLivroAleatorio] = useState<Livro | null>(null);
  const [livrosDisponiveis, setLivrosDisponiveis] = useState<Livro[]>([]);

  useEffect(() => {
    axios
      .get("/livros.json")
      .then((res) => {
        if (res.data && res.data.livros) {
          setLivrosDisponiveis(res.data.livros);
        }
      })
      .catch((err) => console.error("Erro ao carregar livros:", err));
  }, []);

  const encontrarLivroAleatorio = (
    livrosDisponiveis: Livro[],
    carrinho: Livro[]
  ): Livro | null => {
    const livrosForaDoCarrinho = livrosDisponiveis.filter(
      (livro) => !carrinho.some((item) => item.id === livro.id)
    );

    if (livrosForaDoCarrinho.length === 0) {
      return null;
    }

    const indiceAleatorio = Math.floor(
      Math.random() * livrosForaDoCarrinho.length
    );
    return livrosForaDoCarrinho[indiceAleatorio];
  };

  useEffect(() => {
    if (livrosDisponiveis.length > 0) {
      const livro = encontrarLivroAleatorio(livrosDisponiveis, carrinho);
      setLivroAleatorio(livro);
    }
  }, [carrinho, livrosDisponiveis]);

  const calcularSubtotal = (carrinho: Livro[]): number => {
    return carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  const quantidadedelivros = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const subtotal = calcularSubtotal(carrinho);

  return (
    <>
      <Header />
      <div className={style.conteinercompleto}>
        <div className={style.carrinhoConteiner}>
          <h1>Carrinho de Compras</h1>
          <div className={style.cabecalhoConteiner}>
            <p>Desmarcar todos os itens</p>
            <p>Preço</p>
          </div>
          <hr />
          {carrinho.length === 0 ? (
            <p className={style.carrinhovazio}>Seu carrinho está vazio.</p>
          ) : (
            <div className={style.listaItens}>
              {carrinho.map((item) => (
                <div key={item.id} className={style.itemCarrinho}>
                  <div className={style.ladoesquerdo}>
                    <img
                      src={item.capa}
                      alt={item.titulo}
                      className={style.capacarrinho}
                    />
                    <div className={style.botaointerno}>
                      <p>{item.quantidade}</p>
                      <button
                        className={style.botaoRemover}
                        onClick={() => removerDoCarrinho(item.id)}
                      >
                        <img src="../../src/assets/lixeira.png" alt="Lixeira" />
                      </button>
                    </div>
                  </div>
                  <div className={style.detalhescarrinho}>
                    <div className={style.ladodireito}>
                      <h2>{item.titulo}</h2>
                      <span>R$ {item.preco.toFixed(2)}</span>
                    </div>
                    <p>por {item.autor}</p>
                    <p>{item.genero}</p>
                    <p>Em Estoque</p>
                    <p>Entrega GRÁTIS: Dentro de 3 dias úteis</p>
                    <div className={style.checkbox1}>
                      <input type="checkbox" />
                      <p>Este produto é um presente</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={style.ladomaisadireita}>
          <div className={style.subtotal}>
            <div className={style.subtotaltitulo}>
              <p>
                Subtotal ({quantidadedelivros} produto(s)): R$ {subtotal.toFixed(2)}
              </p>
            </div>
            <button>Fechar Pedido</button>
          </div>
          <div className={style.comprarmais}>
            <p>Quem comprou este(s) livro(s), também se interessou por: </p>
            {livroAleatorio ? (
              <LivroAleatorio livro={livroAleatorio} />
            ) : (
              <p>Nenhum livro recomendado no momento.</p>
            )}
            <button>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarrinhoPage;