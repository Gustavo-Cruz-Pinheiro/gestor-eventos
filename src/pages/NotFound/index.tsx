import { Link } from "react-router-dom"
import "./style.css"
import { Title } from "../../components/Title"

export function NotFound() {
    return(
        <div className="error">
            <Title subPageName="Erro"/>
            <h1>Página não encontrada :(</h1>
            <button className="button-notfound"><Link to={"/"} className="link-notfound">Voltar a Home</Link></button>
        </div>
    )
}