import logo from "../../src/assets/Logo.png";
import style from "./styles.module.css"
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className={style.conteiner}>
      <Link to="/home">
        <img className={style.img} src={logo} alt="Logo da empresa Júnior IN" />
        </Link>
          <div className={style.conteinerusuario}>
            <div className={style.retangulo}>
              <svg className={style.usuario}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16.5714 6.44444C16.5714 8.89904 14.5247 10.8889 12 10.8889C9.47527 10.8889 7.42857 8.89904 7.42857 6.44444C7.42857 3.98985 9.47527 2 12 2C14.5247 2 16.5714 3.98985 16.5714 6.44444Z"
                  stroke="#090937"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 14.2222C7.58172 14.2222 4 17.7045 4 22H20C20 17.7045 16.4183 14.2222 12 14.2222Z"
                  stroke="#090937"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <Link to="/carrinho">
            <div className={style.retangulo}>
              <svg className={style.carrinho}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M2 2H4.22222L4.66667 4.22222M6.44444 13.1111H17.5556L22 4.22222H4.66667M6.44444 13.1111L4.66667 4.22222M6.44444 13.1111L3.89679 15.6588C3.19682 16.3587 3.69257 17.5556 4.68246 17.5556H17.5556M17.5556 17.5556C16.3283 17.5556 15.3333 18.5505 15.3333 19.7778C15.3333 21.0051 16.3283 22 17.5556 22C18.7829 22 19.7778 21.0051 19.7778 19.7778C19.7778 18.5505 18.7829 17.5556 17.5556 17.5556ZM8.66667 19.7778C8.66667 21.0051 7.67174 22 6.44444 22C5.21715 22 4.22222 21.0051 4.22222 19.7778C4.22222 18.5505 5.21715 17.5556 6.44444 17.5556C7.67174 17.5556 8.66667 18.5505 8.66667 19.7778Z"
                  stroke="#090937"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            </Link>
          </div>
        </div>
    </>
  );
}
export default Header;
