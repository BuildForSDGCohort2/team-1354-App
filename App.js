/*
import React from 'react';
import { Button, View, Text,YellowBox } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './src/screens/home'
import Chat from './src/screens/chat'
import Settings from './src/screens/settings'
import Products from './src/screens/products/products'
import AddProduct from './src/screens/products/addProduct'
import OnBoarding from './src/screens/onBoarding'
import Signin from './src/screens/signIn'
import { Router, Scene } from 'react-native-router-flux';




YellowBox.ignoreWarnings(["Remote debuggeris in a background tab which may cause apps to perfom slowly",])
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={navigation.openDrawer}
        title="Open navigation drawer"
      />
      <Button
        onPress={() => navigation.navigate('Notifications',{me:'ff'})}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={navigation.openDrawer}
        title="Open navigation drawer"
      />
      <Button
        onPress={() => navigation.goBack()}
        title="Go back home" 
      />
      <Text>
      {route.params.me}
      </Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
 { /*   <Drawer.Navigator initialRouteName="Settings">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Chat" component={Chat} />
        <Drawer.Screen name="Settings" component={Setting} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Notifications b" component={NotificationsScreen}  />
  </Drawer.Navigator>*//*}
    < Setting/>
    </NavigationContainer>
  );
}

const Setting=()=> {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="onboard">
      <Stack.Screen name = "onboard" component = {OnBoarding}/>
      <Stack.Screen name = "Settings" component = {Settings}/>
      <Stack.Screen name = "signin" component = {Signin}/>
      <Stack.Screen name = "products" component = {Products}/>   
      <Stack.Screen name = "addproduct" component = {AddProduct}/>        
        
    </Stack.Navigator>
   </NavigationContainer>
  );
}
*/

import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/screens/navigation/DrawerNavigator";
import { MainStackNavigator } from "./src/screens/navigation/StackNavigator";
import {AsyncStorage} from 'react-native'

 const App = () => {
const [acc, setAcc] = useState('stack') 
  
const Langu=()=>{
  setInterval(
    ()=> {
      AsyncStorage.getItem('login').then((val)=>{
        if(val=='granted'){
          setAcc('drawer')
    
        }else{
          setAcc('stack')
    
        }
      })
    
    },
    1000
  );
}
useEffect(()=>{Langu()},[])



  return (
    <NavigationContainer>
    {acc=='drawer' && <DrawerNavigator />}
    {acc=='stack' && <MainStackNavigator />}
    </NavigationContainer>
  );
}
export default App