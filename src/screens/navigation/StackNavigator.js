import React, {useEffect,useState} from "react";
import {AsyncStorage} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/home";
import About from "../../screens/About";
import Contact from "../../screens/Contact";
import LanguageSettings from "../settings";
import Signin from "../signIn";
import Signup from "../signup";
import OnBoarding from  '../onBoarding'

import { Router, Scene } from 'react-native-router-flux';
import SignOut from "../signout";
import HomePage from "../Homepage/home";
import Report from "../reports/reports";
import OpenActivities from "../reports/openactivities";
import Inbox from "../reports/inbox";
import ClosedActivities from "../reports/closedactivities";
import ReportChat from "../reports/reportchat";
import geo2 from "../geo2";


const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };
const MainStackNavigator = () => {
  let [acc, setAcc] = useState('About')
const ass = () =>{
  AsyncStorage.getItem('login').then((val)=>{
    setAcc(val)
})
}
useEffect(()=>{ass},[])
    return (
  /*   <Stack.Navigator
        screenOptions={screenOptionStyle}
      >
        <Stack.Screen name="Signin" component={Signin} type='reset'  left={()=>null} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} type='reset'  left={()=>null} />
        <Stack.Screen name={acc} component={About} />

      </Stack.Navigator>*/


<Router>
     <Scene key='root'>  
      <Scene key='Onboarding' component={OnBoarding} initial={true}  type='reset' left={()=>null} />
        <Scene key='Logout' component={SignOut} title='Signout'  type='reset'  left={()=>null}/>
      <Scene key='Signin' component={Signin} title='Signin'  type='reset'  left={()=>null}/>
        <Scene key='Signup' component={Signup} title='Signup'  type='reset'  left={()=>null}/>
       <Scene key='Home' component={HomePage}  title='Home' type='reset' left={()=>null} />
       <Scene key='Report' component={Report}  title='Reports'  />
       <Scene key='Inbox' component={Inbox}  title='inbox'  />
       <Scene key='geo2' component={geo2}  title='inbox'  />
       <Scene key='Closedactivities' component={ClosedActivities}  title='closed activities'  />
       <Scene key='Reportchat' component={ReportChat}  title='open report thread'  />
      <Scene key='Home2' component={Home}  title='Hommee'  />
       <Scene key='Openactivities' component={OpenActivities}  title='Open Reports'  />

         </Scene>
</Router>
      
     
    );
  }

  const SettingsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Language settings" component={LanguageSettings} />
      </Stack.Navigator>
    );
  }

  const ContactStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Hotlines" component={Contact} />
      </Stack.Navigator>
    );
    
  }

  const EmergencyStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Emergency Tips" component={Contact} />
      </Stack.Navigator>
    );
  }

export { MainStackNavigator, ContactStackNavigator, SettingsStackNavigator, EmergencyStackNavigator };