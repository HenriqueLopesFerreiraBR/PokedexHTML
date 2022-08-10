const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const pokemonForm = document.querySelector('.pokemon_form');
const search = document.querySelector('.Input_search');

const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let indexAtual = 1;


// função para consumir a API
const fetchPokemon = async (pokemon)=>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200 ) {
        const data = await APIResponse.json();
        return data;
    }


}

//Função para renderização da pokedex
const renderPokemon = async (pokemon)=>{

    pokemonNumber.innerHTML = " "
    pokemonName.innerHTML = 'carregando';

    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
        indexAtual = data.id
        search = ' '
    }else{
        pokemonImage.style.display = 'none'
        pokemonNumber.innerHTML = " "
        pokemonName.innerHTML = "nada encontrado"
    }
} 

// ---------------------------------------------------------- Eventos dos botões -----------------------------------------------------------------------

//pesquisar pokemon
pokemonForm.addEventListener('submit', (event)=>{
    event.preventDefault(search)

    renderPokemon(search.value.toLowerCase());
    search.value = '';
});

//voltar
prev.addEventListener('click',()=>{
    if(indexAtual > 1){
        indexAtual -= 1
        renderPokemon(indexAtual);
    }else{
        renderPokemon(indexAtual)
    }
});


//avançar
next.addEventListener('click',()=>{
    indexAtual+=1;
    console.log(typeof(indexAtual))
    renderPokemon(indexAtual);
});


renderPokemon(indexAtual) 