//React Imports
import React from 'react';
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
//React Navigation Header Button Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Components
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';



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
    const selectedMeal = props.navigation.getParam('MealObject');

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



/* [Module 137]: A Custom component was added so we can style the Meal Steps in a little fancier matter */
const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
}