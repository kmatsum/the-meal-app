//React Imoports
import React from 'react';
//React Navigation Header Button Imports
import { HeaderButton } from 'react-navigation-header-buttons';
//Ionicons Import
import { Ionicons } from '@expo/vector-icons';
//Constant Imports
import Colors from '../constants/Colors';

export default function CustomHeaderButton(props) {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color='white'
        />
    );
}