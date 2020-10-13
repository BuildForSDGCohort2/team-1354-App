import React,{useEffect} from "react";
import {View} from 'react-native'

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator, MainStackNavigator, SettingsStackNavigator,HomeStackNavigator, EmergencyStackNavigator, SignoutStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator   style={{ flex: 1 }}  >
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen name="Hotlines" component={ContactStackNavigator} />
      <Drawer.Screen name="Language settings" component={SettingsStackNavigator} />
      <Drawer.Screen name="Emergency Tips"  component={EmergencyStackNavigator}/>
      <Drawer.Screen name="Logout"  component={SignoutStackNavigator}/>
    </Drawer.Navigator>
  );
}

const HH = ()=>{

  useEffect(()=>{alert('home')},[])

  return(
    <View>
      
    </View>
  )
  
}

export default DrawerNavigator;