import React, { Components } from 'react';
import {AsyncStorage, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader' ;


export default class Signin extends React.Component {
state={
email:'',
password:'',
id:'',
visible: false
}

componentDidMount=()=>{
    AsyncStorage.getItem('login').then((val)=>{
        if(val=='granted'){
            this.props.navigation.navigate('Home');
        }
    })
}
handleChangeEmail =(text)=>{
this.setState({
email:text
})
}
   handleChangePass = (text)=>{
       this.setState({
           password:text
       })
   }
  goToHome=(userid)=>{
    Actions.Home({userid})
}
    saveUserId=async userId=>{
        try {
            await AsyncStorage.setItem('userId', userId);
        }catch(error) {
            alert(error.message)
        }
    }

login=(a,b)=>{
  //alert('HelloEmail: '+a+' check your  Password and try again '+b)
//Actions.Signup()
const pts={
    item:'ggg',
    date:'78888'
}
this.setState({
    visible:true
})
/*const existingpts = await AsyncStorage.getItem('products')
let newproduct = JSON.parse(existingpts);
if (!newproduct){
    newproduct=[]
} 
newproduct.push(pts)

await AsyncStorage.setItem('products', JSON.stringify(newproduct)).then(()=>alert('success')).catch(()=>{alert('error')})
*/
AsyncStorage.setItem('email', a)
AsyncStorage.setItem('pass', JSON.stringify(pts))
const data = {
    phone: a,
    pword: b
}

axios.post('https://kd-sema.herokuapp.com/api/v1/users/login',data)
    .then(res=>{
   
       AsyncStorage.setItem('userid', JSON.stringify(res.data[0].id))
       AsyncStorage.setItem('uname', JSON.stringify(res.data[0].first_name+' '+res.data[0].last_name))
       AsyncStorage.setItem('email', JSON.stringify(res.data[0].email))
       AsyncStorage.setItem('phone', JSON.stringify(res.data[0].phone_no))
      AsyncStorage.setItem('login','granted')
      this.props.navigation.navigate('Home');
      // alert(res.data[0].id)
     this.setState({
        visible:false
    })
   }  
    ).catch(error=>{
        this.setState({
            visible:false
        })
        alert('You have no access to this platform, check your details and try again')
})
   //alert('wrong combination')


}

check=()=>{
    AsyncStorage.getItem('email').then((val)=>alert(val))
    AsyncStorage.getItem('pass').then((val)=>alert(val))
Actions.async();
}
render(){
    return(
        <View style={styles.container}>
            <TextInput style={styles.input}
            underlineColorAndroid ="transparent"
            placeholder="Phone number"
                        onChangeText={this.handleChangeEmail}
            />

            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Password"
            onChangeText={this.handleChangePass}
            secureTextEntry={true}
              // password={true}         
            />  
            <TouchableOpacity style={styles.submitbutton}
            onPress={()=>this.login(this.state.email,this.state.password)}>
            <Text style={styles.text}> Signin</Text>

            </TouchableOpacity>
           <View style={{flexDirection:'row', marginLeft:10}}>
               <Text>
                <Text>I don't have account </Text>
                <Text onPress={()=>{this.props.navigation.navigate('Signup')}} style={{color:'green'}}>Sign Up</Text>
                </Text>
           </View>
            <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
            
        </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 23
    },
    input:{
        margin:15,
        height:40,
        borderColor: 'grey',
        borderWidth:1
    },
    submitbutton:{
        padding:10,
        margin:15,
        height:42,
        alignItems:'center',
        borderRadius:7,
        backgroundColor:'#00a1ff',
        color: 'white',
         justifyContent:'center'
    },
    text:{
        color:'white',
        fontSize:25,
        
    }

})