import Login from "../../componentes/Login/index"
import style from "./styles.module.css"
import logo from "../../src/assets/Logo.png"

function PageLogin (){
    return(<><div className={style.conteiner}>
        <div className={style.homepageimg}></div>
    <div className={style.ladodireitohomepage}>
        <img src={logo} alt="Logo da Livraria" />
        <div className={style.mensagemhomepage}>
            <p>Bem Vindo(a)!</p>
            <h2>Entre na sua conta</h2>
        </div>
        <div className={style.conteinerlogin}>
            <Login></Login>
        </div>
    </div>
    </div>
    </>)
}
export default PageLogin;