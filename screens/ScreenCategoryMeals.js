//React Imports
import React from 'react';
//React Native Imports
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
//Data Imports
import { CATEGORIES } from '../data/dummy-data';



/* [Module 120]: If we wanted to set dynamic titles (based on 'params' in this instance), since the 'selectedCategory'
object is inside the 'ScreenCategoryMeals' function, it can not be accessed from here.

'navigationOptions' can also be a function, rather than an object, when you need dynamic changes to the data based on changes.
The 'navigationData' props will be passed into the object, giving us access to 'params', since it returns us another 'Navigation' Object    */
ScreenCategoryMeals.navigationOptions = (navigationData) => {
    //We need to repeat the selectedCategory retreival
    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find((currentCategory) => currentCategory.id === categoryId);

    //Return the an object to change things like the Header title, color, or font color.
    return {
        headerTitle: selectedCategory.title,
    };
};



export default function ScreenCategoryMeals(props) {
    //[Module 119]: We can get the param assigned to the KEY VALUE PAIR we set when passing the params like:
    const categoryId = props.navigation.getParam('categoryId');
    /*[Module 119}: This will select the category object that the 'find()' function finds from the Array of Objects
    The 'find()' function needs to have a parameter to store each item into, then it will iterate through the list
    to find the item that it matches                                                                               */
    const selectedCategory = CATEGORIES.find((currentCategory) => currentCategory.id === categoryId);

    return (
        <View style={styles.screen}>
            <Text>The Categories Meals Screen</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title='Go to Meal Details!' onPress={() => {
                props.navigation.navigate({ routeName: 'MealDetails' });
            }} />
            <Button title='< Back' onPress={() => {
                props.navigation.goBack();
            }} />
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
