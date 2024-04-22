

export interface Personaje {
    id: number;
    name: string;
    imageUrl: string;
}

export interface PersonajesState {
    allPersonajes: Personaje[];
    loading: boolean;
    favPersonajes: { [key: string]: Personaje };
    searchField: string;
    nextPage: string;
    prevPage: string;
}