import React, {Component, useState, useEffect} from 'react';
import { StyleSheet,Text,TextInput,AsyncStorage, Dimensions,View,FlatList, ScrollView,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import * as Contacts from 'expo-contacts';



const LanguageSettings =({navigation, route})=>{

    const onEnglish=()=>{
        AsyncStorage.setItem('lang','Eng')
        navigation.navigate("Home")
    }
    const onHausa=()=>{
        AsyncStorage.setItem('lang','Hau')
        navigation.navigate("Home")
    }
const FlatListSeparator=()=>{
    return(
        <View style={{height:0.5, backgroundColor:'green', width:'100%'}}/>
    )
    };

    return(
        <View style={{flex:1, marginTop:'10%',marginLeft:20}}>

            <Text>Select preffered Language</Text>
                           {FlatListSeparator()}

           
           <TouchableOpacity style={{height:40}} onPress={onEnglish}>
               <Text style={{height:40}}>
                   English
               </Text>
               {FlatListSeparator()}

           </TouchableOpacity>
           <TouchableOpacity style={{height:40}} onPress={onHausa}>
               <Text style={{height:40}}>
                   Hausa
               </Text>
               {FlatListSeparator()}

           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        paddingTop:45,
        backgroundColor: '#f0f0f4',
      /*  flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00e9f9',
        height: '100%',
        width:'100%'*/
    },
    header:{
        fontSize: 25,
        textAlign:'left',
        margin:10,
        fontWeight:'bold'
    },
    box:{
        margin:10,
        height:40,
        borderColor: 'grey',
        borderBottomWidth:3,
        width:'90%',
        marginRight:20,
        borderRadius:4
    },
    box1:{
        margin:10,
        height:60,
        borderColor: 'grey',
        borderWidth:1,
        borderBottomWidth:2,
        width:'90%',
        marginRight:20,
        display:'flex',
        borderRadius:4
    },
})

export default LanguageSettings;