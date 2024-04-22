import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { PersonajesState, Personaje } from "../types/personajes.types";

/**
 * Initial state for the personajes slice.
 */
const initialState: PersonajesState = {
    allPersonajes: [],
    favPersonajes: {},
    loading: false,
    searchField: "",
    nextPage: "",
    prevPage: "",
};

/**
 * Async thunk to get a personaje by name from the API.
 * @param personajeName - The name of the personaje to fetch.
 * @returns The response from the API.
 */
export const thunkGetPersonaje = createAsyncThunk(
    "personajes/thunkGetPersonaje",
    async (personajeName: string) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${personajeName}`);
        return await response.json();
    }
);

/**
 * Async thunk to go to a specific page in the API.
 * @param page - The URL of the page to fetch.
 * @returns The response from the API.
 */
export const goToPage = createAsyncThunk(
    "personajes/goToPage",
    async (page: string) => {
        const response = await fetch(page);
        return await response.json();
    }
);

/**
 * Action to mark a personaje as favorite.
 */
export const markAsFav = createAction(
    "personajes/markFav",
);

/**
 * Action to change the search field value.
 */
export const changeSearchField = createAction(
    "personajes/changeSearchField",
);

/**
 * Helper function to save personajes data to the state.
 * @param state - The current state.
 * @param action - The action containing the personajes data.
 */
const savePersonajes = (state: PersonajesState, action: any) => {
    state.allPersonajes = action.payload?.results?.map((personaje: { id: number, name: string, image: string }): Personaje => ({
        id: personaje.id,
        name: personaje.name,
        imageUrl: personaje.image,
    })) || [];
    state.nextPage = action.payload?.info?.next || "";
    state.prevPage = action.payload?.info?.prev || "";
}

/**
 * The personajes slice.
 */
export const personajeSlice = createSlice({
    name: "personajes",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(changeSearchField, (state, action) => {
                state.searchField = action.payload || '';
            })
            .addCase(markAsFav, (state, action) => {
                const personaje = action.payload || {} as Personaje;
                const esPersonajeFavorito = !!state.favPersonajes[personaje.id];
                if (esPersonajeFavorito) {
                    delete state.favPersonajes[personaje.id];
                } else {
                    state.favPersonajes[personaje.id] = personaje;
                }
            })
            .addCase(
                thunkGetPersonaje.fulfilled,
                (state, action) => {
                    savePersonajes(state, action);
                })
            .addCase(
                goToPage.fulfilled,
                (state, action) => {
                    savePersonajes(state, action);
                })
    }
});

export default personajeSlice.reducer;