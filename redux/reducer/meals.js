import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

/* [Module 146]: When we first start the application, we want some sort of INITIAL STATE for the redux state that the app
    is in.  You can create a constant which will hold the initial values of the JavaScript Object,
    In this case, we are saving the list of 'MEALS' for the normal list of meals ('meals'), the filtered list of meals
    ('filteredMeals') as well as the list of favorited meals ('favoriteMeals'). As the favorites list is empty at the start,
    we can just pass an empty array. */
const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

/* [Module 146]: Reducers in React are just functions. It takes two arguments, the CURRENT STATE as the first argument, as well
    as the ACTION that the reducer will respond with an action. (Reducers State Updating Logic) */
/* [Module 149]: Reducers act as the ridge between some function call in our React Components to Redux's State Management.
    When 'dispatch()' is called, it takes an ACTION OBJECT ARGUMENT, which can have multiple values in it. 'dispatch(ACTION_OBJECT)'
    will then call a Reducer, in this case, 'mealsReducer', passing the ACTION_OBJECT. We have a variable within the ACITON_OBJECT
    called 'type', which will signify what part of the switch statement will be run.
    During [Module 149], all we had in the 'actions/meals.js' file was a single action: 'toggleFavorite(ID)' which took a Meal ID
    argument, but RETUNED an Object (ACTION_OBJECT) which had the values 'type' and 'mealId'.
    So, when 'dispatch(toggleFavorite(MEAL_ID)' was called, 'toggleFavorite(MEAL_ID)' returned an ACITON_OBJECT, with values such as
    'type' and 'mealId', to this 'mealsReducer', which PROCESSED the input, and returned changes to the 'state' of the Redux-Store. */
export default function mealsReducer(state = initialState, action) {
    switch (action.type) {
        /* ===== CASE: TOGGLE_FAVORITE : Updates the favoriteMeals Meal Object Array to add or remove the 'mealId' passed in the 'action' Object */
        case TOGGLE_FAVORITE: {
            //Find if the mealID which was passed through the 'action' argument is already in the 'favoriteMeals' Redux-Store
            const existingIndex = state.favoriteMeals.findIndex((meal) => meal.id === action.mealId);
            /* If the mealID IS in the 'favoriteMeals' Redux-Store, then remove the meal with that ID from the 'favoriteMeals'
                Object Array, then combine it with the rest of the 'state' that was passed as an argument from Redux and return
                the NEW STATE. (As Redux gives us the entire STORE as the parameter 'state' we need to make sure to only change/update
                the parts that we need to update, in this case, the favoriteMeals Object Array) */
            if (existingIndex >= 0) {
                const updatedFavoriteMeals = [...state.favoriteMeals];
                updatedFavoriteMeals.splice(existingIndex, 1);

                return {
                    ...state,
                    favoriteMeals: updatedFavoriteMeals
                };
            }
            /* If the mealID IS NOT in the 'favoriteMeals' Redux-Store, then find the Meal Object from the 'meals' Redux-Store (from the 'state' argument)
                then return the new 'favoriteMeals' Object Array with the concatinated Meal Object */
            else {
                const newMeal = state.meals.find((meal) => meal.id === action.mealId);

                return {
                    ...state,
                    favoriteMeals: state.favoriteMeals.concat(newMeal)
                }
            }
        }

        /* [Module 151]: Filtering Meals
            We setup a SET FILTERS case where we get the 'filterSettings' object from the 'action' object, then create a new
            Meal Object Array by using 'filter()', which returns a new array, to the 'meals' object array that is stored in the
            React-Redux-Store by using the argument and it's KEY VALUE TAG: 'state.meals'. */
        
        /* ===== CASE: SET_FILTERS: Manipulate the 'filteredMeals' Meal Object Array list based on the filters that are passed in the 'action' Object */
        case SET_FILTERS: {
            const currentFilters = action.filters;
            const newFilteredMeals = state.meals.filter((meal) => {
                if (currentFilters.glutenFree && !meal.isGlutenFree) {
                    //Meal must be dropped
                    return false;
                }
                if (currentFilters.lactoseFree && !meal.isLactoseFree) {
                    //Meal must be dropped
                    return false;
                }
                if (currentFilters.vegetarian && !meal.isVegetarian) {
                    //Meal must be dropped
                    return false;
                }
                if (currentFilters.vegan && !meal.isVegan) {
                    //Meal must be dropped
                    return false;
                }
                return true;
            });

            //Return the ENTIRE STATE to the Redux Store, but with the edited portion of the 'filteredMeals' to be the 'newFilteredMeals'
            return {
                ...state,
                filteredMeals: newFilteredMeals
            };
        }

        //Default case, if the 'action.type' IS NOT found, then just return the argument-passed original Redux-State
        default: {
            return state;
        }
    }
}