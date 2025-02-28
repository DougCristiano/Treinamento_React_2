import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";

const schema = z.object({
  email: z.string().nonempty("O e-mail é obrigatório").email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Usuário logado:", data);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className={style.conteiner}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formulario}>
        <div className={style.inputs}>
          <div className={style.divemail}>
            <label className={style.emailtexto}>E-mail</label>
            <input
              type="email"
              placeholder="Digite aqui seu e-mail"
              className={style.emailinput}
              {...register("email")}
            />
            {errors.email && (
              <p className={style.emailerro}>{errors.email.message}</p>
            )}
          </div>
          <div className={style.divsenha}>
            <label className={style.senhatexto}>Senha</label>
            <input
              type="password"
              placeholder="Digite aqui sua senha"
              className={style.senhainput}
              {...register("password")}
            />
            {errors.password && (
              <p className={style.senhaerro}>{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className={style.botoes}>
          <button
            type="submit"
            className={style.botaoentrar}
            disabled={isSubmitting || loading}
          >
            Entrar
          </button>
          <button className={style.botaocadastrar}>Cadastre-se</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
