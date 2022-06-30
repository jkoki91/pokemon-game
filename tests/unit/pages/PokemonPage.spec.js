import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from '../mocks/pokemons.mock';


describe('PokemonPage Component', () => { 
    
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount( PokemonPage )
    })

    test('Debe hacer match con el snapshot', () => { 

        expect(wrapper.html()).toMatchSnapshot()
    
    })

    test('debe llamar misPokemonArray al montar', () => { 
        
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )
        const wrapper = shallowMount( PokemonPage )

        expect( mixPokemonArraySpy ).toHaveBeenCalled()

    })

    test('Debe hacer match con el snapshot cuando cargan los pokemons', () => { 

        const wrapper = shallowMount( PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        
        expect(wrapper.html()).toMatchSnapshot()
    
    })

    test('debe mostrar los componentes de PokemonPicture y PokemonOptions', () => { 

        const wrapper = shallowMount( PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        
        
        // PokemonPicture debe existir
        // PokemonOptions debe existir
        expect( wrapper.find('pokemon-picture-stub').exists() ).toBeTruthy()
        expect( wrapper.find('pokemon-options-stub').exists() ).toBeTruthy()
        
        
        // PokemonPicture attribute pokemonId === '5'
        expect( wrapper.find('pokemon-picture-stub').attributes('pokemonid') ).toBe('1')
        
        // PokemonOptions attribute pokemons toBe true
        expect( wrapper.find('pokemon-options-stub').attributes('pokemons') ).toBeTruthy()
        
        
        // se puede meter el wrapper una const:
        // const picture = wrapper.find('pokemon-picture-stub')
        // const options = wrapper.find('pokemon-options-stub')
    })

    test('pruebas con checkAnswer', async () => { 

        const wrapper = shallowMount( PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(1)

        expect( wrapper.find('h2').exists() ).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBeTruthy()
        expect( wrapper.find('h2').text() ).toBe(`Correcto, ${ pokemons[0].name }`)

        await wrapper.vm.checkAnswer(10)
        expect( wrapper.vm.message ).toBe(`Oops, era ${ pokemons[0].name }`)

        // console.log(wrapper.vm)
        
    })

 })