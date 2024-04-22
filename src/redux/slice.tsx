import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { PersonajesState, Personaje } from "../types/personajes.types";

const initialState: PersonajesState = {
    allPersonajes: [],
    favPersonajes: {},
    loading: false,
    searchField: "",
    nextPage: "",
    prevPage: "",
};

export const thunkGetPersonaje = createAsyncThunk(
    "personajes/thunkGetPersonaje",
    async (personajeName: string) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${personajeName}`);
        return await response.json();
    }

);

export const goToPage = createAsyncThunk(
    "personajes/goToPage",
    async (page: string) => {
        const response = await fetch(page);
        return await response.json();
    }
);

export const markAsFav = createAction(
    "personajes/markFav",
);

export const changeSearchField = createAction(
    "personajes/changeSearchField",
);

const savePersonajes = (state: PersonajesState, action: any) => {
    state.allPersonajes = action.payload?.results?.map((personaje: { id: number, name: string, image: string }): Personaje => ({
        id: personaje.id,
        name: personaje.name,
        imageUrl: personaje.image,
    })) || [];
    state.nextPage = action.payload?.info?.next || "";
    state.prevPage = action.payload?.info?.prev || "";
}

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
}
);

export default personajeSlice.reducer;