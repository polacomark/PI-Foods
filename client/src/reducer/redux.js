import{
    GET_RECIPES,
    FILTER_BY_DIET,
    ORDER_BY_NAME,
    ORDER_BY_RANK,
    GET_NAME_RECIPES,
    GET_DETAILS,
    GET_DIET,
    FILTER_BY_CREATED,
    POST_RECIPE
    } from "../actions/actionsCreate";

const initialState = {
    recipes: [],
    allRecipes: [],
    details: [],
    diets: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_DIET:
      return {
        ...state,
        diets: action.payload
      };
      case FILTER_BY_DIET:
      //  let filterByDiet;
      //  if(action.payload==='all'){
      //    filterByDiet=state.allRecipes;
      //  }else{
      //    filterByDiet=state.allRecipes.filter((d)=>d.diets).filter((ddiets)=>ddiets.diets.includes(action.payload));
      //   //filterByDiet=state.allRecipes.filter((dFilter)=>dFilter.diets.includes(action.payload))
      //  };
      //  return {
      //     ...state,
      //     recipes: filterByDiet
      //  }
      const allRecipe = state.allRecipes;
      var arregloRecetas = [];
      var dietFilter =
        action.payload === "all"
          ? allRecipe
          : allRecipe.filter(el => {if (el.diets.includes(action.payload)) return el;
              if (typeof el.diets[0] === "object") {
                el.diets.forEach(elem => {
                  if (elem.name === action.payload) {
                    arregloRecetas.push(el);
                  }
                });
              }
            });

      return {
        ...state,
        recipes: dietFilter.concat(arregloRecetas),
        }
    case ORDER_BY_NAME:
      let arrSorted =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: arrSorted,
      };
      case FILTER_BY_CREATED:
        const createdFilter=action.payload === 'created'? state.allRecipes.filter(e=>e.createInDb) : state.allRecipes.filter(e => !e.createInDb);
        return{
          ...state,
          recipes: createdFilter
        }
    case ORDER_BY_RANK:
      let arrSorted1 =
        action.payload === "score"
          ? state.recipes.sort((a, b) => {
              if (a.score > b.score) {
                return -1;
              }
              if (b.score > a.score) {
                return 1;
              }
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.score > b.score) {
                return 1;
              }
              if (b.score > a.score) {
                return -1;
              }
              return 0;
            });

      return {
        ...state,
        recipes: arrSorted1,
      };
    case GET_NAME_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
  
    default:
      return state;
  }
}

export default rootReducer;
