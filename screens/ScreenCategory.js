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
//Custom Components
import GridViewButton from '../components/GridViewButton';
//Data Imports
import { CATEGORIES } from '../data/dummy-data';

//[Module 118]: Since JavaScript functions are just OBJECTS, which hold some data and JSX code, you can interact with it like an object.
//Set any sort of navigationOptions onto the ScreenCategory JSX Object
ScreenCategory.navigationOptions = {
    headerTitle: 'Meal Category',
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
