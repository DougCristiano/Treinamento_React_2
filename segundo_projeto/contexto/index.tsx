import { createContext, useState, ReactNode } from "react";

export type Livro = {
  id: number;
  capa: string;
  titulo: string;
  autor: string;
  quantidade: number;
  preco: number;
  sinopse: string;
};

interface CarrinhoContextType {
  carrinho: Livro[];
  adicionarAoCarrinho: (livro: Livro) => void;
  removerDoCarrinho: (id: number) => void;
}

export const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

interface CarrinhoProviderProps {
  children: ReactNode;
}

export const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
  const [carrinho, setCarrinho] = useState<Livro[]>([]);

  const adicionarAoCarrinho = (livro: Livro) => {
    setCarrinho((prevCarrinho) => {
      const livroExistente = prevCarrinho.find((item) => item.id === livro.id);
      if (livroExistente) {
        return prevCarrinho.map((item) =>
          item.id === livro.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevCarrinho, { ...livro, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho((prevCarrinho) => {
      const livroExistente = prevCarrinho.find((item) => item.id === id);
  
      if (livroExistente) {
        if (livroExistente.quantidade === 1) {
          return prevCarrinho.filter((item) => item.id !== id);
        } else {

          return prevCarrinho.map((item) =>
            item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
          );
        }
      }
  
      return prevCarrinho; 
    });
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};