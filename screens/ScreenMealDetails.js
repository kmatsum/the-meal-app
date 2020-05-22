//React Imports
import React from 'react';
//React Native Imports
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
//React Navigation Header Button Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Components
import HeaderButton from '../components/HeaderButton';



/* [Module 126]: Set the title by changing the navigationOptions that attaches to ScreenMealDetails.
This function is called by React Navigation.                                                      */
ScreenMealDetails.navigationOptions = (navigationData) => {
    const meal = navigationData.navigation.getParam('MealObject');
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
                    iconName='ios-star-outline'
                    onPress={() => {
                        console.log(meal.title + ' was added to favorites!')
                    }} />
            </HeaderButtons>
        ),
    };
};



//DEFAULT FUNCTION: ScreenMealDetails ===========================================================================================
export default function ScreenMealDetails(props) {
    const meal = props.navigation.getParam('MealObject');

    return (
        <View style={styles.screen}>
            <Text>{meal.title}</Text>
            <Button title='Go Back to Categories' onPress={() => {
                props.navigation.popToTop();
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: '5%',
        alignItems: 'center',
    },
});
