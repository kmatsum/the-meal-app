//React Imports
import React from 'react';
//React Native Imports
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
//React Navigation Imports
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//Custom Components Navigation
import HeaderButton from '../components/HeaderButton';



/*Set any sort of navigationOptions onto the ScreenCategory JSX Object
  [Module 134]: Similar additions to the 'navigationOptions' in 'ScreenCategory'.
  detailed explinations there...                                                */
ScreenFilters.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
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



//DEFAULT FUNCTION: ScreenFilters ===============================================================================================
export default function ScreenFilters(props) {
    return (
        <View style={styles.screen}>
            <Text>The Filters Screen</Text>
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
