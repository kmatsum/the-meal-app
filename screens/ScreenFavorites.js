//React Imports
import React from 'react';
//React Native Imports 
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
//React Redux Imports
import { useSelector } from 'react-redux';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Component Imports
import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';


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
    /* [Module 146]: Below was explained in 'ScreenCategoryMeals.js'
        The only difference is that this time we are using favoriteMeals as the source of our Redux retrieved data
        and using that as the datasource for our MealList component to display. */
    const availableFavMeals = useSelector((state) => {
        return (state.meals.favoriteMeals);
    });

    if (availableFavMeals.length === 0 || !availableFavMeals) {
        return (
            <View style={styles.container}>
                <DefaultText style={styles.emptyTitle}>No favorite meals found. Start adding some!</DefaultText>
            </View>
        );
    }

    return (
        <MealList
            listData={availableFavMeals}
            navigation={props.navigation}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        margin: '5%'
    },
    emptyTitle: {
        fontSize: 13
    }
});