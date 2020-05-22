//React Imports
import React from 'react';
//React Native Imports
import {
    StyleSheet,
    View,
    Text,
    FlatList
} from 'react-native';
//Custom Component Imports
import MealItem from '../components/MealItem';
//Data Imports
import { CATEGORIES, MEALS } from '../data/dummy-data';



/* [Module 120]: If we wanted to set dynamic titles (based on 'params' in this instance), since the 'selectedCategory'
object is inside the 'ScreenCategoryMeals' function, it can not be accessed from here.
'navigationOptions' can also be a function, rather than an object, when you need dynamic changes to the data based on changes.
The 'navigationData' props will be passed into the object, giving us access to 'params', since it returns us another 'Navigation' Object    */
ScreenCategoryMeals.navigationOptions = (navigationData) => {
    //[Module 119]: We can get the param assigned to the KEY VALUE PAIR we set when passing the params like:
    const categoryId = navigationData.navigation.getParam('categoryId');
    /*[Module 119}: This will select the category object that the 'find()' function finds from the Array of Objects
    The 'find()' function needs to have a parameter to store each item into, then it will iterate through the list
    to find the item that it matches                                                                            */
    const selectedCategory = CATEGORIES.find((currentCategory) => currentCategory.id === categoryId);

    //Return the an object to change things like the Header title, color, or font color.
    return {
        headerTitle: selectedCategory.title,
    };
};


//DEFAULT FUNCTION: ScreenCategoryMeals =========================================================================================
export default function ScreenCategoryMeals(props) {
    //Function to return a Component template that the renderItem property will handle
    //Think of it like a customer ArrayAdapter in Java Android development
    function renderMealItem(itemData) {
        return (
            <MealItem
                onSelectMeal={() => { }}
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                /*[Module 126]: We added the onClick Method for each meal Item to navigate to the meal details screen, as
                well as pass the 'MEAL OBJECT' so we can use it's information in the next screen.                       */
                onClick={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetails',
                        params: {
                            MealObject: itemData.item,
                        }
                    });
                }}
            />
        );
    }

    //Grab the categoryId:
    const categoryId = props.navigation.getParam('categoryId');

    /* [Module 124]: Needed a way to get all meals from the MEALS array that correspond to the previously selected 'categoryId'
    We used the 'filter()' method on the 'MEALS' Object Array, which uses an 'if Statement' that it runs on every Object.
    In this example, if the indexOf the selected 'categoryId' is greater than or equal to 0, meaning it isnt 'null', then the
    'categoryId' must be in the 'meal.categoryIds' array, making this a meal we want.                                       */
    const displayedMeals = MEALS.filter((meal) =>
        meal.categoryIds.indexOf(categoryId) >= 0
    );

    //JSX CODE ==========
    return (
        <View style={styles.screen}>
            <FlatList
                style={{ width: '95%', margin: 10 }}
                data={displayedMeals}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
