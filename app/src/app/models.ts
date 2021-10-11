export type People = {
    id: number,
    name: string,
    birth_year: string,
    eye_color: string,
    gender: string,
    hair_color: string,
    height: string,
    mass: string,
    skin_color: string,
    homeworld?: string,
    films: Array<string> | [],
    species: Array<string> | [],
    starships: Array<string> | [],
    vehicles: Array<string> | [],
    url: string,
    created: string,
    edited: string,
}

export type Film = {
    id: number,
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    species: Array<string> | [],
    starships: Array<string> | [],
    vehicles: Array<string> | [],
    characters: Array<string> | [],
    planets: Array<string> | [],
    url: string,
    created: string,
    edited: string
}

export type Starship = {
    id: number,
    name: string,
    model: string,
    starship_class: string,
    manufacturer: string,
    cost_in_credits: string,
    length: string,
    crew: string,
    passengers: string,
    max_atmosphering_speed: string,
    hyperdrive_rating: string,
    MGLT: string,
    cargo_capacity: string,
    consumables: string,
    films: Array<string> | [],
    pilots: Array<string> | [],
    url: string,
    created: string,
    edited: string
}

export type Vehicle = {
    id: number,
    name: string,
    model: string,
    vehicle_class: string,
    manufacturer: string,
    length: string,
    cost_in_credit: string,
    crew: string,
    passengers: string,
    max_atmosphering_speed: string,
    cargo_capacity: string,
    consumables: string,
    films: Array<string> | [],
    pilots: Array<string> | [],
    url: string,
    created: string,
    edited: string
}

export type Specie = {
    id: number,
    name: string,
    classification: string,
    designation: string,
    average_height: string,
    average_lifespan: string,
    eye_colors: string,
    hair_colors: string,
    skin_colors: string,
    language: string,
    homeworld: string,
    people: Array<string> | [],
    films: Array<string> | [],
    url: string,
    created: string,
    edited: string
}

export type Planet = {
    id: number,
    name: string,
    diameter: string,
    rotation_period: string,
    orbital_period: string,
    gravity: string,
    population: string,
    climate: string,
    terrain: string,
    surface_water: string,
    residents: Array<string> | [],
    films: Array<string> | [],
    url: string,
    created: string,
    edited: string
}