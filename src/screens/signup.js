import React, { Components } from 'react';
import {AsyncStorage, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader' ;



export default class Signup extends React.Component {
state={
email:'',
password:'',
password2: '',
pword: '',
lga: '',
fname:'',
lname: '',
phone: '',
id:'',
visible: false,
warning:'',
btn:false
}

componentDidMount=()=>{
    AsyncStorage.getItem('login').then((val)=>{
        if(val=='granted'){
            this.props.navigation.navigate('Home');
        }
    })
}
handleChangePhone =(text)=>{
this.setState({
phone: text
})
}
   handleChangePass = (text)=>{
       this.setState({
           password:text
       })
   }
   handleChangePass2 = (text)=>{
    this.setState({
        password2:text
    })
    if(this.state.password==text){
        this.setState({pword:this.state.password, warning:'', btn:true})
    }else{
        this.setState({warning:'Password not match', btn:false})
    }
}
handleChangeFname = (text)=>{
    this.setState({
        fname: text
    })
}
handleChangeLname = (text)=>{
    this.setState({
        lname: text
    })
}
  goToHome=(userid)=>{
    Actions.Home({userid})
}
    saveUserId=async userId=>{
        try {
            await AsyncStorage.setItem('userId', userId);
      1  }catch(error) {
            alert(error.message)
        }
    }

SignUp=()=>{
  //alert('HelloEmail: '+a+' check your  Password and try again '+b)

this.setState({
    visible:true
})
const data = {
    phone: this.state.phone,
    pword: this.state.pword,
    fname: this.state.fname,
    lname: this.state.lname,
    lga: this.state.lga
}

axios.post('https://kd-sema.herokuapp.com/api/v1/users',data).then(res=>{
   //     alert(res.data.data.phone)
      AsyncStorage.setItem('userid', (res.data.data.id))
       AsyncStorage.setItem('uname', (res.data.data.first_name+' '+res.data.data.last_name))
     //  AsyncStorage.setItem('email', JSON.stringify(res.data[0].email))
       AsyncStorage.setItem('phone', (res.data.data.phone))
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
        alert(error+ ' You have no access to this platform, check your details and try again')
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
            placeholder="First Name"
            onChangeText={this.handleChangeFname}
              // password={true}         
            /> 
            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Last Name"
            onChangeText={this.handleChangeLname}
              // password={true}         
            /> 

            <TextInput style={styles.input}
            underlineColorAndroid ="transparent"
            placeholder="Phone number"
            onChangeText={this.handleChangePhone}
            />

            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Password"
            onChangeText={this.handleChangePass}
            secureTextEntry={true}
              // password={true}         
            /> 
            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Password"
            onChangeText={this.handleChangePass2}
            secureTextEntry={true}
              // password={true}         
            />  
            <Text>{this.state.warning}</Text>
       {this.state.btn==true &&     <TouchableOpacity style={styles.submitbutton}
            onPress={()=>this.SignUp()}>
            <Text style={styles.text}> Sign up</Text>

            </TouchableOpacity>}

           <View style={{flexDirection:'row', marginLeft:10}}>
               <Text>
                <Text>I already have account </Text>
                <Text onPress={()=>{this.props.navigation.navigate('Signin')}} style={{color:'green'}}>Login here</Text>
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