//React Imports
import React, { useEffect, useCallback } from 'react';
//React Native Imports
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Button,
    ScrollView,
    Image
} from 'react-native';
//React Redux Imports 
import { useSelector, useDispatch } from 'react-redux';
//Redux Action Imports
import { toggleFavorite } from '../redux/actions/meals';
//React Navigation Header Button Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Components
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';



/* [Module 126]: Set the title by changing the navigationOptions that attaches to ScreenMealDetails.
This function is called by React Navigation.                                                      */
ScreenMealDetails.navigationOptions = (navigationData) => {
    const meal = navigationData.navigation.getParam('MealObject');
    const onToggleFavorite = navigationData.navigation.getParam('onToggleFavorite');
    /* [Module 150]: In order to determine what STAR ICON the Navigation Header should use for the RIGHT BUTTON, we need to get
        the FAVORITE STATUS of the meal in question. We passed this information from the main body of the React Functional Component
        through navigation params. Then, we just have a conditional statement in the 'navigtaionOptions', changing the used icon.
        
        HOWEVER, the FIRST LOAD of the screen will not load 'isFavorite' from the React Functional Component Body, as 'useEffect()' is
        called AFTER the rendering of the screen. To avoid mis-match of the favorite status on the FIRST SCREEN LOAD, we had to pass
        the initial status of the meal through the navigation data from the 'MealList.js' with the same name as from 'useEffect()' */
    const isFavorite = navigationData.navigation.getParam('isFavorite');

    return {
        headerTitle: meal.title,
        /*[Module 127]: You COULD setup header buttons (instead of using the react-navigation-header-button package we are actually using)
                        headerRight: <Button>Fav!</Button>
        Below, we use the 'react-navigation-header-buttons import to pass a <HeaderButtons> and supply it with our custom component: HeaderButton,
        which we created in '../components/'. We can have an <Item> component inside, pasing in the FALLBACK TITLE as well as the Icon name.    */
        headerRight: () => (
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}
            >
                <Item
                    title='Favorite'
                    iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                    onPress={onToggleFavorite} />
            </HeaderButtons>
        ),
    };
};



/* [Module 137]: A Custom component was added so we can style the Meal Steps in a little fancier matter */
const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
}



//DEFAULT FUNCTION: ScreenMealDetails ===========================================================================================
export default function ScreenMealDetails(props) {
    const selectedMeal = props.navigation.getParam('MealObject');

    /* [Module 149]: Redux Dispatch
        When the 'useDispatch()' function is called, it will call the reducer from Redux, passing an ACTION_OBJECT as the argument.
        In this case, 'toggleFavorite(selectedMeal.id)' RETURNS an ACTION_OBJECT with the action 'type' and the associated 'mealId'.
        Once this is passed, a Reducer processes that action (In this case is our 'mealsReducer()') and the Reducer will return changes
        to the Redux-Store which houses all the state-management. 
        
        Since useDispatch is a React Hook, it can ONLY be called from a Functional React Component, which is why we need to create a
        function pointer 'dispatch' to pass into the function that we get from 'useCallback()' */
    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        console.log('Toggle Favorite for the meal');
        dispatch(toggleFavorite(selectedMeal.id));
    }, [selectedMeal]);

    /* [Module 149]: We use the same concept that we learned in [Module 140], we can use the 'useEffect()' React Hook to pass the Function
        pointer which points to the 'toggleFavoriteHandler()' function. Giving the 'useEffect()' the dependency to 'toggleFavoriteHandler'
        Since 'toggleFavoriteHandler' is never really changed, this 'useEffect()' call should really only be run once. */
    useEffect(() => {
        props.navigation.setParams({ onToggleFavorite: toggleFavoriteHandler });
    }, [toggleFavoriteHandler]);

    /* [Module 150]: 'useSelector' was used to get if the meal is in the 'favoriteMeals' List.
        the 'useSelector' function will take a function, which React-Redux will provide the state in the React-Redux Store as an argument,
        so you can access the state in Redux. The 'some()' function will return true if it finds any matching pair in the array that it is
        applied to, in this case is 'favoriteMeals'
        As the favorites icon is in the 'navigationOptions' of this Screen, you will need to pass the status as a 'navigation.param'.
        Since we can only access the state and status within the functional React Component body, we will need to set the parameter.
        For this, we use 'useEffect' as we did before.*/
    const isMealFavorite = useSelector((state) => state.meals.favoriteMeals.some((meal) => meal.id === selectedMeal.id));
    useEffect(() => {
        props.navigation.setParams({
            isFavorite: isMealFavorite
        });
    }, [isMealFavorite]);

    /* [Module 138]: We needed to display all the information of the selected meal in a good manner. 'ScrollView' was used
    instead of FlatView since we don't expect this list to be too long. 'DefaultText' was used to make the quick details come
    up, as well as using JavaScript code to return multiple components: (ie. {{selectedMeal.ingredients.map(FUNCTION)}).
    We passed a layout template and passed in a parameter, which was the value of the index of the array we were iterating through. */
    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details} >
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Ingredients</Text>
            </View>
            {selectedMeal.ingredients.map((ingredient) => (
                <Text key={ingredient} style={{ fontFamily: 'open-sans', marginVertical: '1%', marginHorizontal: '5%' }}>- {ingredient}</Text>
            ))}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Steps</Text>
            </View>
            {selectedMeal.steps.map((step) => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
    },
    titleContainer: {
        marginHorizontal: '5%',
        borderBottomWidth: 1,
        padding: 5
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: Dimensions.get('window').fontScale * 18,
        textAlign: 'center',
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: '5%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    }
});