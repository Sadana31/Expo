import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DonateScreen from '../screens/DonateScreen'
import RequestScreen from '../screens/RequestScreen'

export const BottomTabNavigator = createBottomTabNavigator({
    DonateScreen:{
        screen: DonateScreen
    },
    RequestScreen:{
        screen: RequestScreen
    }
})
