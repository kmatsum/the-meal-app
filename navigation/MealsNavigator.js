//React Imports
import React from 'react';
//React Native Imports
import { Platform, Text } from 'react-native';
//React Navigation Imports
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//Expo Imports
import { Ionicons } from '@expo/vector-icons';
//Screen Imports
import ScreenCategory from '../screens/ScreenCategory';
import ScreenCategoryMeals from '../screens/ScreenCategoryMeals';
import ScreenMealDetails from '../screens/ScreenMealDetails';
import ScreenFavorites from '../screens/ScreenFavorites';
import ScreenFilters from '../screens/ScreenFilters';
//Constant Imports
import Colors from '../constants/Colors';
import { color } from 'react-native-reanimated';



/* [Module 133]: Create a defaultStackNavigationOptions object for reuse when making different stack navigators */
const defaultStackNavigatorOptions = {
    headerTitle: 'NOT CONFIGURED',
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
};

//This will enable stack navigation on all included screens (Syntax: 'TAG: Class Pointer')
//Returns a NAVIGATION React Component
const MealsStackNavigator = createStackNavigator(
    { //First argument of createStackNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        Categories: ScreenCategory,
        CategoryMeals: {
            screen: ScreenCategoryMeals,
            /*[Module 120]: If you are using the '{ OBJECT }' way to create parts of your navigator,
            you can also setup properties here:                                                     */
            // navigationOptions: {
            //     headerTintColor: 'white',
            //     headerStyle: {
            //         backgroundColor: Colors.primaryColor,
            //     }
            // }
        },
        MealDetails: ScreenMealDetails,
    },
    { //Second argument of createStackNavigator(): Allows you to pass CONFIGURATION to the Navigator
        /*[Module 120]: Default Navigation Configuration (In this case, we are changing the header look)
        Default Navigation Options will ALWAYS be OVERWRITTEN by specific-set Options
        [Options Set in the First Argument Above] > [Options set in the SCREEN.js Component File] > [DefaultNavigationOptions]  */
        defaultNavigationOptions: defaultStackNavigatorOptions,
    }
);


/* [Module 133]: Created a different stack navigator for the Favorites TAB of the app. */
const FavoritesStackNavigator = createStackNavigator(
    { //First argument of createStackNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        Favorites: ScreenFavorites,
        MealDetails: ScreenMealDetails
    },
    { //Second argument of createStackNavigator(): Allows you to pass CONFIGURATION to the Navigator
        defaultNavigationOptions: defaultStackNavigatorOptions,
    }
);



/* [Module 132]: Added a tabScreenConfig variable for easy re-usability with the different BottomTabNavigators that we are using */
const tabScreenConfig = {
    Meals: {
        screen: MealsStackNavigator,
        navigationOptions: {
            //The Navigator will take the KEY VALUE PAIR as the displayed Title Text, but you can set the title manually as well:
            // tabBarLabel: 'Meals',

            /* [Module 130]: tabBarIcon is a navigationOption which you can set a function which returns the
            icon that you want to display with other properties as well. The 'tabInfo' parameter has valueable
            information on the Navigation tab, such as 'tabInfo.tintColor' to ensure dynamic-capabilities    */
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-restaurant'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
            /* [Module 136]: FOR ANDROID: tabBarLabel is the only way to change the font styling of the Text Label, instead of in 'tabBarOptions'. */
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons
                        name='ios-star'
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
        }
    }
}

/* [Module 129]: Bottom Tab Navigator: Creating a Bottom Tab Navigator to either show all Meals or just the Favorites.
'MealsNavigator' is abled to be used as a screen because 'createStackNavigator()' returns a React Component. So you can
essentially point your navigator to another navigator. Combining many navigation options will enable us to create complex
applications. The 'createAppContainer(VALUE)' needed to be updated to 'TabMealsNavigator' since the tab Navigator is our primary
source of entry for our application.                                                                                        */
/* [Module 132]: To implement a better looking ANDROID Bottom Tab Navigator, we imported the new 'materialBottomTabNavigator' and 'Platform'
We then checked to see which platform we are using then change which BottomTabNavigator that gets used as the 'TabMealsNavigator'
React Component Object we pass later on in the code.                                                                        */
const TabMealsNavigator = (Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(
        //First argument of createMaterialBottomTabNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        tabScreenConfig,
        { //Second argument of createMaterialBottomTabNavigator(): Allows you to pass CONFIGURATION to the Navigator
            /* [Module 132]:  for 'MaterialBottomTabNavigator', we dont need to assign 'tabBarOption', we can just treat it as
            any other property                                                                                               */
            //UNUSED: For MaterialBottomTabNavigator, there is the barStyle property to configure the entire bar
            // barStyle: {
            //     backgroundColor: Colors.primaryColor
            // }
            activeColor: 'white',
            shifting: true,
        }
    )
    : createBottomTabNavigator(
        //First argument of createBottomTabNavigator(): A list of Screen Objects and a KEY VALUE PAIR for easier identification
        tabScreenConfig,
        { //Second argument of createBottomTabNavigator(): Allows you to pass CONFIGURATION to the Navigator
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'open-sans-bold',
                },
                activeTintColor: Colors.accentColor,
            }
        }
    )
);


/* [Module 134]: We added a FiltersNavigator for the Filters screen that can be accessed from the DrawerNavigator
we are creating below, 'MainNavigator'.                                                                          */
const FiltersNavigator = createStackNavigator(
    {
        Filters: ScreenFilters,
    },
    {
        defaultNavigationOptions: defaultStackNavigatorOptions,
        /* [Module 135]: One way you can set the label in the drawer is by changing the 'navigationOptions' in
        the whole navigator itself, when it is linked to the Drawer. You could also do this in the 'createDrawerNavigator()'
        method. (This App uses the latter process to set the drawerLabel.                                               */
        // navigationOptions: {
        //     drawerLabel: 'Filters'
        // },
    }
);


/* [Module 134]: We created a 'drawerNavigator' called 'MainNavigator', as this will be the main entrance way to all
the other Navigation methods we have. (ex. 'MainNavigator' => 'TabMealsNavigator' => 'MealsStackNavigator' brings 
you to all available screens) This is also why we updated 'createAppContainer(ReactComponent)' to 'MainNavigator' */
/* [Module 135]: We configured the DrawerNavigator by adding navigationOptions to each Navigation Object (ie. 'MealFavs
or 'Filters') as well as configured the entire drawer component by using the SECOND ARGUMENT in the 'createDrawerNavigator()'
method like we did for the other navigators. In this case, we passed contentOptions to change colors and text styles.   */
const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: {
            screen: TabMealsNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: {
            screen: FiltersNavigator,
            navigationOptions: {
                drawerLabel: 'Filters'
            }
        }
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    }
);

//Export what the createAppContainter returns, passing the default navigator we will be using.
export default createAppContainer(MainNavigator);