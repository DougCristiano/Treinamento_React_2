import { useContext } from "react";
import { CarrinhoContext } from "../../contexto";
import Header from "../../componentes/Header";
import style from "./style.module.css";

const CarrinhoPage = () => {
  const { carrinho, removerDoCarrinho } = useContext(CarrinhoContext) as {
    carrinho: Livro[];
    removerDoCarrinho: (id: number) => void;
  };

  return (
    <>
      <Header />
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
                <img src={item.capa} alt={item.titulo} className={style.capacarrinho} />
                <div className={style.detalhescarrinho}>
                  <h2>{item.titulo}</h2>
                  <p>Autor: {item.autor}</p>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Preço: R$ {item.preco.toFixed(2)}</p>
                  <button
                    className={style.botaoRemover}
                    onClick={() => removerDoCarrinho(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CarrinhoPage;