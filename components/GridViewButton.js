//React Imports
import React from 'react';
//React Native Imports
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    Dimensions,
    Platform
} from 'react-native';



/*[Module 122]: In this module we created a new GridViewButton CustomComponenet so we can do
styling and configuring within this Custom Component instaed of on the ScreeCategory.js file.
- We passed 'onPress' Functions and the 'title' through the 'props' of the component
- We used array merging (ex: '{ ...styles.container, ...{ backgroundColor: props.color } }' to
  combine the 'props.color' variable that we could not get from the StyleSheet)
- We used Dimmensions and Platform to make the component change based on Device Enviornment
- Variable 'TouchableCmp' was created to let Android users have a TAP EFFECT, since OPACITY is not
  available. (We needed to add a <View/> outside the 'TouchableCmp' in order to keep original styling on Android) */
export default function GridViewButton(props) {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
            <TouchableCmp
                style={{ flex: 1 }}
                onPress={props.onClick}
            >
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.title} numberOfLine={2} >{props.title}</Text>
                </View>
            </TouchableCmp>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        padding: '10%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    },
    gridItem: {
        flex: 1,
        height: 150,
        // marginVertical: '7%',
        // marginHorizontal: '3%',
        margin: 15,
        borderRadius: 10,
        elevation: 5,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: Dimensions.get('window').fontScale * 13,
        textAlign: 'right',
    }
});