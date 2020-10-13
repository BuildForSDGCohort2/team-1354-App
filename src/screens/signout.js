import React,{ useState, useEffect} from 'react'
import {AsyncStorage, View, Text} from 'react-native'
import { Actions } from 'react-native-router-flux';


const SignOut = ({navigation}) => {

useEffect(()=>{
    AsyncStorage.setItem('login','hhh')
   AsyncStorage.removeItem('login').then(res=>{
    AsyncStorage.removeItem('open')  
      AsyncStorage.removeItem('closed')
      AsyncStorage.removeItem('feedback')

 
    navigation.navigate('Onboarding')
     //Actions.Onboarding()
    })
},[])

Actions.Contacts()

return(
    <View>
        {       navigation.navigate('Onboarding')

}
        <Text>Logout</Text>
    </View>
)


}

export default SignOut

/*
import React from 'react'
import {AsyncStorage, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

export default class Logout extends React.Component{

componentDidMount=()=>{
    const { navigation } = this.props;

    AsyncStorage.setItem('login','grantedf')
    //  Actions.home();
    //  alert(res.data[0].id)
      navigation.navigate("Home")
this.ccc()
}
ccc=()=>{
    alert('ggg')
}
render(){
    const { navigation } = this.props;

    navigation.navigate("Home")

    return(
        <View>
            <Text>Logout</Text>
        </View>
    )
}

}
*/ 