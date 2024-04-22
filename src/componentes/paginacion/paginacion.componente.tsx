import './paginacion.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { goToPage } from '../../redux/slice';

/**
 * Componente que contiene los botones para paginar.
 * 
 * @returns Un elemento JSX que representa la paginación.
 */
const Paginacion = () => {
    /**
     * Obtiene el estado de nextPage y prevPage del store.
     */
    const { nextPage, prevPage } = useSelector((state: RootState) => state);

    /**
     * Obtiene la función dispatch del store.
     */
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className="paginacion">
            <button disabled={!prevPage} onClick={() => dispatch(goToPage(prevPage))} className={"primary"}>
                Anterior
            </button>
            <button disabled={!nextPage} onClick={() => dispatch(goToPage(nextPage))} className={"primary"}>
                Siguiente
            </button>
        </div>
    );
}

export default Paginacion;