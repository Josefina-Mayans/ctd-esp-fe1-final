import Filtros from "../componentes/personajes/filtros.componente";
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { thunkGetPersonaje } from '../redux/slice';
import { useEffect } from "react";

/**
 * Esta es la página principal. Aquí se deberá ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ```tsx
 * <PaginaInicio />
 * ```
 * 
 * @returns La página de inicio
 */
const PaginaInicio = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetPersonaje(''));
    }, []);
    
    const { loading, allPersonajes } = useSelector(( state: RootState ) => state );

    /**
     * Limpia los filtros y realiza una nueva búsqueda de personajes.
     */
    const limpiarFiltros = () => {
        dispatch({type: 'personajes/changeSearchField', payload: ""});
        dispatch(thunkGetPersonaje(''));
    }

    return (
        <div className="container">
            <div className="actions">
                <h3>Catálogo de Personajes</h3>
                <button className="danger" onClick={limpiarFiltros}>
                    Limpiar Filtros
                </button>
            </div>
            <Filtros />
            <Paginacion />
            <GrillaPersonajes loading={loading} personajes={allPersonajes} />
            <Paginacion />
        </div>
    );
}

export default PaginaInicio;
