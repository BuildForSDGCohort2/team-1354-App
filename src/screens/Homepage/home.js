import React, {Component, useState, useEffect} from 'react';
import { StyleSheet,Text,AsyncStorage, TextInput, Dimensions,View,FlatList, ScrollView,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
//import * as Contacts from 'expo-contacts';
import {Eng, Hau} from '../../constant/eng'



const HomePage =({navigation, route})=>{
    let [lang, setLang] = useState(lang=Eng)
    let [uid, setUid] = useState(1)
    let [inbox, setInbox] = useState(0)
    let [open, setOpen] = useState('')
    let [closed, setClosed] = useState('')
    let [feedback, setFeedback] = useState('')






    
    const Langu=()=>{
      let isSubscribed = true;
      setInterval(

        ()=> {
          
          AsyncStorage.getItem('lang').then((val)=>{
            if(val=='Eng'){
              isSubscribed? setLang(Eng): 'Hau'
        
            }else{
              isSubscribed?    setLang(Hau) : 'Hau'
        
            }
          })
          
        }, 1000
        
      )
      return () => (isSubscribed = false);
      
    }

    const OpenReport=()=>{
      let isSubscribed = true;
if(isSubscribed){
    setInterval(
          ()=> {
            AsyncStorage.getItem('userid').then((val)=>{
             
                axios.get('https://kd-sema.herokuapp.com/api/v1/reports/openreport/'+val)
                .then(res=>{
                  //  alert(res.data)
                    AsyncStorage.setItem('open',JSON.stringify(res.data))
                }).catch(err=>{console.log(err)})

                axios.get('https://kd-sema.herokuapp.com/api/v1/reports/closedreport/'+val)
                .then(res=>{
                  //  alert(res.data)
                    AsyncStorage.setItem('closed',JSON.stringify(res.data))
                }).catch(err=>{console.log(err)})

                axios.get('https://kd-sema.herokuapp.com/api/v1/reports/feedback/'+val)
                .then(res=>{
                  //  alert(res.data)
                    AsyncStorage.setItem('feedback',JSON.stringify(res.data))
                }).catch(err=>{console.log(err)})
            })

            AsyncStorage.getItem('open').then(res=>{
               // alert(JSON.parse(res).lengt)
                    setOpen(JSON.parse(res))
            })

            AsyncStorage.getItem('closed').then(res=>{
                // alert(JSON.parse(res).lengt)
                     setClosed(JSON.parse(res))
             })
                  //  alert(JSON.stringify(closed))

                  AsyncStorage.getItem('feedback').then(res=>{
                    // alert(JSON.parse(res).lengt)
                         setFeedback(JSON.parse(res))
                 })
          } 
                    ,
          1000
        )};
        return () => (isSubscribed = false);

      }
  
  
    useEffect(()=>{
     
      Langu()
      
    },[])

    useEffect(()=>{
      let isSubscribed = true;
      AsyncStorage.getItem('userid').then(res=>{
     isSubscribed?  setUid(res) : null
    })
    return () => (isSubscribed = false);
  },[])
    useEffect(()=> {
    OpenReport()
    /*  AsyncStorage.getItem('userid').then((val)=>{
         
            axios.get('https://kd-sema.herokuapp.com/api/v1/reports/openreport/'+val)
            .then(res=>{
              //  alert(res.data)
                AsyncStorage.setItem('open',JSON.stringify(res.data))
            }).catch(err=>{console.log(err)})

            axios.get('https://kd-sema.herokuapp.com/api/v1/reports/closedreport/'+val)
            .then(res=>{
              //  alert(res.data)
                AsyncStorage.setItem('closed',JSON.stringify(res.data))
            }).catch(err=>{console.log(err)})

            axios.get('https://kd-sema.herokuapp.com/api/v1/reports/feedback/'+val)
            .then(res=>{
              //  alert(res.data)
                AsyncStorage.setItem('feedback',JSON.stringify(res.data))
            }).catch(err=>{console.log(err)})
        })

        AsyncStorage.getItem('open').then(res=>{
           // alert(JSON.parse(res).lengt)
                setOpen(JSON.parse(res))
        })

        AsyncStorage.getItem('closed').then(res=>{
            // alert(JSON.parse(res).lengt)
                 setClosed(JSON.parse(res))
         })
              //  alert(JSON.stringify(closed))

              AsyncStorage.getItem('feedback').then(res=>{
                // alert(JSON.parse(res).lengt)
                     setFeedback(JSON.parse(res))
             })
            */
            }
  
    ,[])



const FlatListSeparator=()=>{
    return(
        <View style={{height:0.5, backgroundColor:'green', width:'100%'}}/>
    )
    };

    return(

        <View style={styles.center}>
              <View style={styles.container}>
         <FlatListSeparator/>
         <TouchableOpacity style={styles.row} onPress={()=>{navigation.navigate('Report',{uid})}}>

    <Text style={styles.txt}>{lang.sendlabel}</Text>
         </TouchableOpacity>
         <FlatListSeparator/>
  <View  >
         <TouchableOpacity style={styles.row} onPress={()=>{alert('empty')}}>
    <Text style={styles.txt}>{lang.inboxlabel}</Text>

         </TouchableOpacity>

         </View>
         <FlatListSeparator/>
         <TouchableOpacity style={styles.row} onPress={()=>{Actions.Openactivities({open,feedback,uid})}}>
   <Text>
    <Text style={styles.txt}>{lang.openactivities}</Text>   
    {open && <Text style={styles.txt}> {open.length}</Text>}
    </Text>
         </TouchableOpacity>
         <FlatListSeparator/>
         <TouchableOpacity style={styles.row}  onPress={()=>{Actions.Closedactivities()}}>
 
 <Text>   
   <Text style={styles.txt}>{lang.closedactivities}</Text>
    {//closed.length =null && <Text style={styles.txt}> {0}</Text>
    }
    {closed && <Text style={styles.txt}> {closed.length}</Text>}
    </Text>
         </TouchableOpacity>
         </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    center: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
       textAlign: "center",
      height:'100%'
      },
      container:{
        display:'flex',
        justifyContent:"flex-start",
       // alignItems: "center",
        height: '100%'
        
      },    row:{
        height:'20%',
        marginTop: 10,
        flexDirection: 'row'
    },
    txt:{
        marginLeft: 5,
        fontSize:20,
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
    box3:{height:200, width:'50%', borderRadius:10,  alignSelf:'center',
     backgroundColor:'#004f54'},
     box2:{height:250, width:'90%',paddingTop:20, alignContent:'center', borderRadius:0,  alignSelf:'center',
      backgroundColor:'grey'},

})

export default  HomePage;