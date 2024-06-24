import { Title } from "../../components/Title";
import banner from "../../assets/banner.avif";

export function Home() {
    return(
        <>
            <Title subPageName="Home"/>
            <h3>O melhor gerenciador de eventos</h3>
            <div className="banner-container">
                <img src={banner} alt="Banner" className="banner-image" />
            </div>
        </>
    )
}