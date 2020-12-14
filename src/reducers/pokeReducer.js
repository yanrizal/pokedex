const initState = {
    pokeList:[],
    count: 1,
    pokeType: [],
    pokeListByType: [],
    comparePoke1: null,
    comparePoke2: null,
    poke1Detail: null,
    poke2Detail: null,
    pokeDetail:{
      types:[],
      stats:[{base_stat:0},{base_stat:0},{base_stat:0},{base_stat:0},{base_stat:0},{base_stat:0}]
    }
  };
  
const pokeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_POKELIST_SUCCESS':
          return {
            ...state,
            pokeList: action.data.results,
            count: action.data.count
          };
        case 'CLEAR_POKELIST_SUCCESS':
          return {
            ...state,
            pokeList: [],
          };
        case 'ADD_POKECOMPARE_SUCCESS':
            return {
              ...state,
              comparePoke1: action.data,
            };
        case 'ADD_POKECOMPARE2_SUCCESS':
          return {
            ...state,
            comparePoke2: action.data,
          };
        case 'GET_POKETYPE_SUCCESS':
          return {
            ...state,
            pokeType: action.data.results
          };
        case 'GET_POKELISTBYTYPE_SUCCESS':
          console.log('t', action)
          return {
            ...state,
            pokeListByType: action.data.pokemon
          };
        case 'GET_POKEDETAIL_SUCCESS':
          return {
            ...state,
            pokeDetail: action.data
          };
        case 'GET_POKEDETAIL1_SUCCESS':
          return {
            ...state,
            poke1Detail: action.data
          };
        case 'GET_POKEDETAIL2_SUCCESS':
          return {
            ...state,
            poke2Detail: action.data
          };
      default:
        return state;
    }
  };
  
export default pokeReducer;