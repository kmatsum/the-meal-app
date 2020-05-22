import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';



//DEFAULT FUNCTION: ScreenMealDetails ===========================================================================================
export default function ScreenMealDetails(props) {
    return (
        <View style={styles.screen}>
            <Text>The Meal Details Screen</Text>
            <Button title='Go Back to Categories' onPress={() => {
                props.navigation.popToTop();
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
