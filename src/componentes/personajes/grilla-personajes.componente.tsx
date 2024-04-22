import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { Personaje } from "../../types/personajes.types"; // Import the Personaje type

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Componente que muestra una grilla de personajes en la página de inicio.
 * 
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.loading - Indica si se está cargando la información de los personajes.
 * @param {Personaje[]} props.personajes - La lista de personajes a mostrar.
 * @returns {JSX.Element} - Un elemento JSX que representa la grilla de personajes.
 */
const GrillaPersonajes = ({loading, personajes}: {loading?: boolean, personajes: Personaje[]}) => {

    if (loading) return <div> Loading... </div>;

    return (
      <div className="grilla-personajes">
        {personajes.map((personaje: Personaje) => (
          <TarjetaPersonaje personaje={personaje} key={personaje.id} />
        ))}
      </div>
    );
}

export default GrillaPersonajes;