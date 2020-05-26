//React Imports
import React from 'react';
//React Native Imports
import {
    View,
} from 'react-native';
//Custom Component Imports
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
//React Redux Imports
import { useSelector } from 'react-redux';
//Data Imports
import { CATEGORIES } from '../data/dummy-data';



/* [Module 120]: If we wanted to set dynamic titles (based on 'params' in this instance), since the 'selectedCategory'
object is inside the 'ScreenCategoryMeals' function, it can not be accessed from here.
'navigationOptions' can also be a function, rather than an object, when you need dynamic changes to the data based on changes.
The 'navigationData' props will be passed into the object, giving us access to 'params', since it returns us another 'Navigation' Object    */
ScreenCategoryMeals.navigationOptions = (navigationData) => {
    //[Module 119]: We can get the param assigned to the KEY VALUE PAIR we set when passing the params like:
    const categoryId = navigationData.navigation.getParam('categoryId');
    /*[Module 119}: This will select the category object that the 'find()' function finds from the Array of Objects
    The 'find()' function needs to have a parameter to store each item into, then it will iterate through the list
    to find the item that it matches */
    const selectedCategory = CATEGORIES.find((currentCategory) => currentCategory.id === categoryId);

    //Return the an object to change things like the Header title, color, or font color.
    return {
        headerTitle: selectedCategory.title,
    };
};


//DEFAULT FUNCTION: ScreenCategoryMeals =========================================================================================
export default function ScreenCategoryMeals(props) {
    //Grab the categoryId:
    const categoryId = props.navigation.getParam('categoryId');

    /* [Module 147]: Getting the meals list out of the Redux Store. We use the 'useSelector()' hook to be able to select a slice of
        the globally managed state and use it in the component.
        Below, we created a new constant 'availableMeals' that uses the value returned from 'useSelector()', which will retrieve the
        data out of the Global Redux State and return it.
        The 'useSelector()' call takes a function as an argument, which will automatically be executed by React-Redux, which will
        provide the current state as a parameter to the function, then we can return any data we want from that state, in this case,
        is the 'filteredMeals' object array that we have managed in the Global Redux State. ('state' is the entire Global Redux State,
        'meals' is the KEY VALUE PAIR which connects to the Meals listing slice of the Global Redux State, then 'filteredMeals to grab
        the JavaScript Object array with all the Meals saved in the 'meals' reducer of the App-Global-Redux-State)
        *** Any previous reference to the Object Array 'MEALS' was changed to 'availableMeals' to account for the use of Redux*** */
    const availableMeals = useSelector((state) => {
        return (state.meals.filteredMeals);
    });


    /* [Module 124]: Needed a way to get all meals from the MEALS array that correspond to the previously selected 'categoryId'
    We used the 'filter()' method on the 'MEALS' Object Array, which uses an 'if Statement' that it runs on every Object.
    In this example, if the indexOf the selected 'categoryId' is greater than or equal to 0, meaning it isnt 'null', then the
    'categoryId' must be in the 'meal.categoryIds' array, making this a meal we want.                                       */
    const displayedMeals = availableMeals.filter((meal) =>
        meal.categoryIds.indexOf(categoryId) >= 0
    );

    if (displayedMeals.length === 0 || !displayedMeals) {
        return (
            <View style={{flex:1, alignContent: 'center', justifyContent: 'center', margin: '5%'}}>
                <DefaultText style={{textAlign: 'center', fontSize: 15}}>No meals found... Maybe check your filters?</DefaultText>
            </View>
        );
    }

    //JSX CODE ==========
    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    );
}

