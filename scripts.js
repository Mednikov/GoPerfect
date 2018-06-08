const createPokemon = (number, name, query, generation, region) => ({number, name, query, generation, region})

new Vue ({
  el: '#app',

  data: {
    data: [],
    search: '',
    copiedVisibility: false,
    checkPokemonNum: ''
  },

  mounted() { 
    var self = this
    $.getJSON('data.json', function(data) {
      self.data = data;
    });
  },

  methods: {
    copyQuery(name) {
      this.checkPokemonNum = name
      name = name.toLowerCase()
      let codeToCopy = document.getElementById(name)
      codeToCopy.setAttribute('type', 'text')
      codeToCopy.select()
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        // console.log("Query was copied : " + msg);
        // console.log(codeToCopy.value);
      } catch (err) {
        console.log('Oops, unable to copy:' + err);
      }
      codeToCopy.setAttribute('type', 'hidden')
      this.copiedVisibility = true
      setTimeout(()=>{ this.copiedVisibility = false }, 1500);
      window.getSelection().removeAllRanges()
    }
  },

  computed:{
    filteredData() {
      var filtered = []
      this.data.forEach(function(obj, i){
        obj.pokemons.forEach((pokemon) => {
          filtered.push( 
            createPokemon(pokemon.number, pokemon.name, pokemon.query, obj.generation, obj.region) 
          )
        })
      })
      return filtered.filter(pokemon => {
        return pokemon.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || pokemon.number.indexOf(this.search) > -1
      })
    }
  },

  filters: {
    pokemonNumber(value, padding) {
      var zeroes = new Array(padding+1).join("0");
      return (zeroes + value).slice(-padding);
    },
    lowercase(value){
      return value.toLowerCase()
    }
  }
})