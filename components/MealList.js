//React Imports
import React from 'react';
//React Native Imports
import { StyleSheet, View, FlatList } from 'react-native';
//React Redux Imports
import { useSelector } from 'react-redux';
//Custom Component Imports
import MealItem from '../components/MealItem';

export default function MealList(props) {
    /* [Module 150]: To start determinging which meals are favorites, we need the 'favoriteMeals' Object Array. */
    const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

    //Function to return a Component template that the renderItem property will handle
    //Think of it like a customer ArrayAdapter in Java Android development
    function renderMealItem(itemData) {
        /* [Module 150]: We can use the 'favoriteMeals' Object Array we got earlier to determine if the Meal Object
            that is being rendered on THIS component (remember, this is a component that gets iterated for each available
            meal). We can use the same method as we used in 'ScreenMealDetails.js' to return a boolean value if the meal
            is favorited, then pass the status as a navigation 'param' with the same name that we use in 'ScreenMealDetails.js'
            (We use the same name so we can use the same KEY VALUE PAIR to get the value, instead of checking if its the
            first time loading the screen) */
        const isFavorite = favoriteMeals.some((meal) => meal.id === itemData.item.id);

        return (
            <MealItem
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
                            isFavorite: isFavorite
                        }
                    });
                }}
            />
        );
    }



    //COMPONENTS CODE ==========
    return (
        <View style={styles.list}>
            <FlatList
                style={{ width: '95%', margin: 10 }}
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});