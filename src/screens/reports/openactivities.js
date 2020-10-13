import React from 'react'
import {View,Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux';

const OpenActivities =( {open,feedback,uid})=>{

    const FlatListSeparator=()=>{
        return(
            <View style={{height:0.5, backgroundColor:'green', width:'100%'}}/>
        )
        };

        const gotoReportchat = (uid,feedback,rid) => {
            Actions.Reportchat({uid,feedback,rid})
        }
    return(
        <View style={styles.container}>
            <ScrollView>
            <Text>{'fffff '+uid}</Text>
            {Object.keys(open).map(e=>
            <View key={e}>  
                  <FlatListSeparator/>
                <TouchableOpacity  style={styles.row} onPress = {()=>gotoReportchat(uid,feedback,open[e].id)}>
                    <Text>
                        <Text style={styles.txt}>{open[e].incidence }</Text>
                        <Text style={styles.txt}>{ ' '+open[e].address }</Text>

                 <Text  style={styles.txt2}>{ ' '+new Date(open[e].rtime).getDate()+'-'+new Date(open[e].rtime).getMonth()+'-'+new Date(open[e].rtime).getFullYear()  }</Text>
                 </Text>
                </TouchableOpacity>
                </View>

            )}

            
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: "center",
      textAlign: "center",
    },
    container:{
      display:'flex',
      justifyContent:"flex-start",
     // alignItems: "flex-start",
      marginLeft: 10
      
    },
    updbtn:{
      backgroundColor:'#00c3f9',
      width:150,
      borderRadius:7,
      height:50,
      margin:5,
      justifyContent: 'center'
  },
  txt:{
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 20
  },
  txt2:{
      justifyContent:'flex-end',
    alignContent: 'flex-end',
    textAlign: 'right',
    fontSize: 20,
    
  },
  row:{
      flexDirection:'row',
      height: 60
  },
    btn:{
      marginBottom:'10px',
      margin: '30px',
      padding:'40px'
    },
    box:{
      margin:10,
      height:60,
      borderColor: 'grey',
      borderWidth:5,
      borderBottomWidth:2,
      width: 150,
      marginRight:20,
      borderRadius:4,
      justifyContent:'center',
      alignContent: 'center'
    }
  });

export default OpenActivities