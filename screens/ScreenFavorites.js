//React Imports
import React from 'react';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Component Imports
import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
//Data Imports
import { MEALS } from '../data/dummy-data';

/* [Module 133]: We can set the title of the Stack Navigation Header through providing
the 'navigationOptions' object which react will pull from. */
ScreenFavorites.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Your Favorite Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    }
};

/* [Module 133]: Added the 'MealList' custom component that we created to output the meals based on
the 'listData' prop that was passed into the Component, which will grab all relating meal Objects from our data file. */

//DEFAULT FUNCTION: ScreenFavorites =============================================================================================
export default function ScreenFavorites(props) {
    const favoriteMeals = MEALS.filter((meal) => meal.id === 'm1' || meal.id === 'm2');

    return (
        <MealList
            listData={favoriteMeals}
            navigation={props.navigation}
        />
    );
}
