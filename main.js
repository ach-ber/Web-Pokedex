

const app = Vue.createApp({

    data() {
        return {
            ListePokemon: [{}],
            infoPokemon: {},
            isReady:false,
            idInfoPokemon:0,
            searchPokemon:'',
            isSearch:false,
            searchPokemonByID:'',
            searchRes:'',
        }
    },

    methods: {
        updateID(pokemon) {
            return (this.ListePokemon.indexOf(pokemon) +1)
        },

        udpdateImg(ID) {
            return ("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+ID+".svg")
        },

        updateInfo(ID) {
            if (this.isReady==false || ID != this.idInfoPokemon) {
                axios.get('https://pokeapi.co/api/v2/pokemon/'+ID).then(response => this.infoPokemon = (response.data),this.isReady=true,this.idInfoPokemon=ID)
            }
            else {
                this.isReady=false
            }
        },

        onSubmit() {
            if (this.searchPokemon === '' && this.searchPokemonByID === '') {
              alert('Aucune donnée rentrée !');
            }

            else {
                this.searchRes = this.searchPokemon;
                let i = 1;
                this.searchPokemon = '';
                for (Pokemon of this.ListePokemon) {
                    if (Pokemon.name == this.searchRes || this.searchPokemonByID == i) {
                        this.isSearch = true;
                        this.searchRes = Pokemon.name;
                        
                    }
                    i += 1;
                }
                this.searchPokemonByID = '';

                if (this.isSearch != true) {
                    alert('Le Pokemon n existe pas !');
                }
            }
            
        },

        udpdateSearch() {
            this.isSearch = false;
            this.searchPokemon = '';
            this.searchPokemonByID = '';
            this.searchRes = '';
        }

    },

    computed: {
        image(ID) {
            return ("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+ID+".svg")
        }
    },


    mounted () {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0').then(response => this.ListePokemon = (response.data.results))
        
    }
})

