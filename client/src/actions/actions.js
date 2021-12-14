import axios from "axios";
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
     } from "./actionsCreate";

 export function getRecipes() {
     return async function (dispatch) {
         
             let json = await axios.get("http://localhost:3001/recipes");

             return dispatch({
                 type: GET_RECIPES,
                 payload: json.data
             });
         
     };
 }

 export function filterByDiet(payload) {
    return {
      type: FILTER_BY_DIET,
      payload,
    };
  }
  export function orderByName(payload) {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
  }
  
  export function orderByRank(payload) {
    return {
      type: ORDER_BY_RANK,
      payload,
    };
  } 
  export function filterByCreated(payload){
    return{
        type: FILTER_BY_CREATED,
        payload
    }
} 

  export function searchByName(name) {
     //try {
          return async function (dispatch) {
              let res = await axios.get(`http://localhost:3001/recipes?name=${name}`);

              return dispatch({
                  type: GET_NAME_RECIPES,
                  payload: res.data
              });
          };
    //   }catch(error) {
    //       console.log(error);
    //   }
  }
  export function getDetails(id) {
      //try {
          return async function (dispatch) {
              let json = await axios.get(`http://localhost:3001/recipes/${id}`);
              return dispatch({
                  type: GET_DETAILS,
                  payload: json.data
              });
          };
    //   } catch (error) {
    //       console.log(error);
    //   }
  }
  export function getDiets() {
      //try {
          return async function (dispatch) {
              let res = await axios.get(`http://localhost:3001/diets`);

              return dispatch({
                  type: GET_DIET,
                  payload: res.data
              });
          };
    //   } catch (error) {
    //       console.log(error);
    //   }
  }
  export function postRecipe(payload) {
      //try {
          return async function () {
              let res = await axios.post(`http://localhost:3001/recipe`, payload);
                 return {
                     type: POST_RECIPE,
                     res,
                 };
          };
    //   } catch (error) {
    //       console.log(error);
    //   }
  }