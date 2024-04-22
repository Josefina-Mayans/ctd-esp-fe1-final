import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * Uso: 
 * ``` <PaginaFavoritos /> ```
 * 
 * @returns la pagina de favoritos
 */
const PaginaFavoritos = () => {

    const { favPersonajes } = useSelector(( state: RootState ) => state );

    return <div className="container">
        <div className="actions">
            <h3>Personajes Favoritos</h3>
            <button className="danger">Test Button</button>
        </div>
        <GrillaPersonajes personajes={Object.values(favPersonajes)} />
    </div>
}

export default PaginaFavoritos