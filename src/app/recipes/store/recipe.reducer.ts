import { Recipe } from "../recipe.model";
import * as Actions from './recipe.actions';

export interface State {
    recipes: Recipe[];
  }
  
  const initialState: State = {
    recipes: []
  };

export function recipeReducer(state = initialState, action: Actions.RecipesActions) {
    switch (action.type) {
        case Actions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case Actions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case Actions.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            };
        
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
        
            return {
                ...state,
                recipes: updatedRecipes
            };
        case Actions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                return index !== action.payload;
                })
            };
        default:
            return state;
    }
}