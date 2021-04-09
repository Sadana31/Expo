import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import OpenScreen from './screens/OpenScreen';
import {BottomTabNavigator} from './components/BottomTabNavigator';

export default function App() {
  return (
    <AppContainer />
  )
}

const switchNavigator = createSwitchNavigator({
  OpenScreen: {screen: OpenScreen},
  BottomTab: {screen: BottomTabNavigator}
})

const AppContainer = createAppContainer(switchNavigator)
