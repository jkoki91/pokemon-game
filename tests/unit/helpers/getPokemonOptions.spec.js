import getPokemonOptions, { getPokemons, getPokemonNames } from "@/helpers/getPokemonOptions";

describe('getPokemonOptions helpers', () => {
    test('debe de regresar un arreglo de numeros', () => {
        const pokemons = getPokemons()

        expect(pokemons.length).toBe(650)
        expect(pokemons[149]).toBe(150)
    })

    test('debe devolver un array de 4 elementos con nombres de pokemon', async () => {
        const pokemons = await getPokemonNames([1, 2, 3, 4])
        const pokemonsExample = [
            { name: 'bulbasaur', id: 1 },
            { name: 'ivysaur', id: 2 },
            { name: 'venusaur', id: 3 },
            { name: 'charmander', id: 4 }
        ]
        expect(pokemons).toStrictEqual(pokemonsExample)
        // console.log(pokemons)

    })

    test('getPokemonOptions debe devolver un array mezclado', async () => {

        const pokemons = await getPokemonOptions()

        expect(pokemons.length).toBe(4)
        expect(pokemons).toEqual([
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            }
        ])

        // console.log(pokemons)

    })
})
