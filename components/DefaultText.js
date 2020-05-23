//React Imports
import React from 'react';
//React native Imports
import { StyleSheet, Text } from 'react-native';


/* [Module 137]: We created a WRAPPER COMPONENT that will wrap around all children and apply the styles we set to
the related children Components which use similar props.                                                     */
export default function DefaultText(props) {
    return (
        <Text style={styles.text}>{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
});