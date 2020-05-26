//Action Constants
export const TOGGLE_FAVORITE = 'TOGGLE FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

//Action Functions

/* [Module 149]: toggleFacorites(MEAL_ID)
    This function will return an Object (ACTION_OBJECT for our 'mealsReducer()') which has an Action Type and the
    'mealId' that we want the 'mealsReducer' to process and do something with. */
export function toggleFavorite(id) {
    return {
        type: TOGGLE_FAVORITE,
        mealId: id
    };
}

/* [Module 151]: This is another Redux Action Function which will take a 'filterSettings' Object as an argument,
    and return an Object with the type (in this case, type is 'SET_FILTERS') as well as the 'filterSettings' Object
    that the Redux Reducer can use in order to change the React-Redux-Store state */
export function setFilters (filterSettings) {
    return {
        type: SET_FILTERS,
        filters: filterSettings
    }
}
