import { useDispatch, useSelector } from 'react-redux';
import './filtros.css';
import React from "react";
import { AppDispatch, RootState } from '../../redux/store';
import { thunkGetPersonaje } from '../../redux/slice';

/**
 * Componente de filtros para buscar personajes.
 */
const Filtros: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();

    /**
     * Maneja el cambio en el campo de búsqueda.
     * @param e - Evento de cambio de input.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'personajes/changeSearchField', payload: e.target.value }) //TODO usar una action sola
        dispatch(thunkGetPersonaje(e.target.value));
    }
    
    const { searchField } = useSelector(( state: RootState ) => state );

    return (
    
    <div className="filtros">
        <form>
            <label htmlFor="nombre">Filtrar por nombre:</label>
            <input 
                type="text" 
                placeholder="Rick, Morty, Beth, Alien, ...etc" 
                value= {searchField}
                name="nombre" 
                onChange={handleInputChange} />
        </form>
    </div>
    )
}

export default Filtros;