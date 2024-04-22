import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { RootState } from '../../redux/store';
import { Personaje } from "../../types/personajes.types"; // Import the Personaje type
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */
const TarjetaPersonaje = ({personaje}: {personaje: Personaje}) => {
    // const { search,loading } = useSelector(( state: RootState ) => state);
    // const { name,imageUrl } = search;
    // if (loading) return <div>Loading...</div>;
    const { favPersonajes } = useSelector(( state: RootState ) => state );

    const dispatch: AppDispatch = useDispatch();

    const isFavorito = !!favPersonajes[personaje.id];

    return personaje.name ? (
    <div className="tarjeta-personaje">
        <img src={personaje.imageUrl} alt={personaje.name}/>
        <div className="tarjeta-personaje-body">
            <span>{personaje.name}</span>
            <BotonFavorito 
                    esFavorito={isFavorito} onClick={()=>{
                        dispatch({type: 'personajes/markFav', payload: personaje });
                    }} />
        </div>
    </div>
    ) : null ;
}

export default TarjetaPersonaje;