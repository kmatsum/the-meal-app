//React Imports
import React from 'react';
//React Native Imports
import {
    StyleSheet,
    View,
    Text,
    Button,
    FlatList,
} from 'react-native';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Components
import HeaderButton from '../components/HeaderButton';
import GridViewButton from '../components/GridViewButton';
//Data Imports
import { CATEGORIES } from '../data/dummy-data';

//[Module 118]: Since JavaScript functions are just OBJECTS, which hold some data and JSX code, you can interact with it like an object.
//Set any sort of navigationOptions onto the ScreenCategory JSX Object
ScreenCategory.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Meal Category',
        /* [Module 134]: In order to create a button for the 'DrawerNavitagor', we need to set a 'headerLeft' on the 'navigationOptions'
        of the screens that we want the menu to show up on. (We obviously don't want a 'headerLeft' button to show up instead of a back
        button on 'stackNavigation' pages). We can use the same method that we used in 'ScreenMealDetails' in [Module 127]. You can use
        the 'Platform' API to create different looks based on the Device OS. (This block of code was originally NOT a function) We needed
        to convert the 'navigationOptions' to a in-line function so we could take the parameters that ReactNavigation provides, to access
        important passed 'navigationData', such as the function 'navigationData.navigation.toggleDrawer()' to pass to the 'onPress' of the
        'headerLeft' button.                                                                                                            */
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



//DEFAULT FUNCTION: ScreenCategory ==============================================================================================
export default function ScreenCategory(props) {
    //Function to return a Component template that the renderItem property will handle
    //Think of it like a customer ArrayAdapter in Java Android development
    function renderGridItem(itemData) {
        return (
            <GridViewButton
                title={itemData.item.title}
                color={itemData.item.color}
                onClick={() => {
                    //The props.navigation.navigate NAVIGATES to the assigned routeName, but must be within the Navigation
                    //You can also pass other values with the 'params' TAG, then create KEY VALUE PAIRS, similar to props.
                    props.navigation.navigate({
                        routeName: 'CategoryMeals',
                        params: {
                            categoryId: itemData.item.id
                        }
                    });
                }}
            />
        );
    }



    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
