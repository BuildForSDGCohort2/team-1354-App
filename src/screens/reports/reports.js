import React, {useState, useEffect} from "react";
import { View,AsyncStorage, Button, Text, StyleSheet, TouchableOpacity, TextInput, Picker, Image, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ProgressLoader from 'rn-progress-loader' ;
import * as ImageManipulator from "expo-image-manipulator";
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
// import * as Print from 'expo-print'
import * as MediaLibrary from 'expo-media-library'
import * as Permissions from 'expo-permissions';
import axios from 'axios'

import {Eng, Hau} from '../../constant/eng'
//import { set } from "react-native-reanimated";
import Geolo from '../geo'
import Geo2 from '../geo2'


const Report = ({navigation, uid}) => {
    let [lang, setLang] = useState(lang=Eng)
    let [incidence, setIncidence] = useState('Fire')
    let [imguri, setImgUri] = useState('')
    let [imguri2, setImgUri2] = useState('')
    let [gps, setGPS] = useState('')
    let [imgurl, setImgUrl] = useState('')
    let [area, setArea] = useState('')
    let [contact2, setContact2] = useState('')
    let [comment, setComment] = useState('')
    let [LGA, setLGA] = useState('Birnin Gwari')
    let [ gps2,setGPS2] = useState('Waiting')
    let [visibility, setVisibility] = useState(false)
  let [cause, setCause] = useState('')

useEffect(()=>setImgUri2(''),[])
const Langu = () => {
  setInterval(
    ()=> {
      AsyncStorage.getItem('lang').then((val)=>{
        if(val=='Eng'){
          setLang(Eng)
    
        }else{
          setLang(Hau)
        }
      })
    
    },
    1000
  );
}
useEffect(()=>Langu(),[])
useEffect(()=>{AsyncStorage.getItem('login').then(v=>{
 // alert(v)
})},[])


const about = e => navigation.navigate(e)

const updateIncident =(e)=>{
  setIncidence(e)
}
const updateLGA =(e)=>{
    setLGA(e)
  }
const changeArea =(e)=>{
  setArea(e)
}
const changeContact = (e) => {
  setContact2(e)
}
const changeCause = (e) => {
  setCause(e)
}

const _takePhoto = async () => {


  // return alert('jjk')
   const {
     status: cameraPerm
   } = await Permissions.askAsync(Permissions.CAMERA);
 
   const {
     status: cameraRollPerm
   } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
 
   // only if user allows permission to camera AND camera roll
   if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
     let pickerResult = await ImagePicker.launchCameraAsync({
       allowsEditing: false,
       aspect: [4, 3],
     });
 
      //  let hg= await  MediaLibrary.getAlbumAsync('ruwassa reports')
   //alert(myfile.uri)
  // alert(pickerResult.uri)
 setImgUri(pickerResult.uri)
  _CompressImg(pickerResult.uri);
 //this._handleImagePicked();
   }
 };

 const _handleImagePicked = async pickerResult => {      
  try {
  
    if (!pickerResult.cancelled) {
     //   alert(pickerResult.uri)
      const manipResult = await _CompressImg(pickerResult.uri)
setImgUri(manipResult)
    }else{}
  } catch (e) {
  } finally {
  }
};



 const _CompressImg = async (a) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    a,
    [{ rotate: 0 }],
    { compress: 0.1, format: ImageManipulator.SaveFormat.jpeg },
  );
//   alert(manipResult.uri);
let myfile= await MediaLibrary.createAssetAsync(manipResult.uri,'jiy')
//  alert(myfile.uri)
// await MediaLibrary.createAlbumAsync('ruwassa reports/.images',myfile)

 setImgUri2(myfile.uri)
  return myfile.uri
};



const handleSend=async()=>{
 // return alert('this.state.imguri')

setVisibility(true)
           if(gps==''){
                return  alert('please turn on your gps')
              }
              else if(imguri2==''){
               return   alert('please capture incidence')
              }
              else{
              _handleImagePicked1(imguri2)
              }
         

}

const _handleImagePicked1 = async pickerResult => {
 // return alert(pickerResult)
  let uploadResponse, uploadResult;

  try {
   
    if (pickerResult) {
   //  return  alert(pickerResult)
      uploadResponse = await uploadImageAsync(pickerResult,1,1);
    //  return alert(JSON.stringify( await uploadResponse))
      uploadResult = await uploadResponse.json();
   // return alert((uploadResult.imgurl))
     if(uploadResult.imgurl!=null){
       
         await setImgUrl(uploadResult.imgurl)
       
     
     if(imgurl!= ''){
      const   data={
        incidence: incidence,
             uid,
           rtime: new Date(),
             img: imgurl,
             contact: contact2,
             gps: gps,
             address: area,
             comment: comment,
             cause,
             lga
         }
          // return(alert((data)))
     await    axios.post('https://kd-sema.herokuapp.com/api/v1/reports',data)
         .then(res=>{
         setIncidence('Fire')
          setImgUri ('')

          setImgUri2('')
        setImgUrl('')
         setArea('')
           setContact2('')
         setComment('')
         setVisibility(false)

             alert('send')
         }).catch(err=>{alert(err)
          setVisibility(false)

        })

     }
    }
    }else{//this.setState({uploaded:'cancelled',visible:false})
  }
  } catch (e) {
    console.log({ uploadResponse });
    console.log({ uploadResult });
    console.log({ e });
    setVisibility(false)

      alert('Upload failed, sorry :(');
  
  } finally {
    setVisibility(false)

  }
};

const handleGps =(e)=>{
  setGPS(e)
}

const GPS2 = (e)=>{
  setGPS2(e)
}

 return (

      <ScrollView>
      <View style={styles.container}>
      <ProgressLoader visible={visibility} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
       
                  <Text style={{margin:20, fontSize:19}}>{lang.formtitle}  </Text>
    <Geolo onGps={handleGps}/>
    
  {//   <Geo2 onGPS2={GPS2}/>
  }
              <Text style={styles.txt}> {lang.incidence} </Text> 
  
        <View>
        <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}} selectedValue = {incidence} onValueChange = {updateIncident}>
               <Picker.Item label = {lang.fire} value = "Fire" />
               <Picker.Item label = {lang.flood} value = "Flood" />
               <Picker.Item label = {lang.accident} value = "Accident" />
            </Picker>
            </View>
            <Text style={styles.txt}> {lang.cause} </Text> 

              <TextInput  style={styles.box}value={cause} onChangeText = {changeCause} placeholder={lang.cause}/>
            
            <View>
 <Text>{lang.lga}</Text>
                <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}} selectedValue = {LGA}  onValueChange = {updateLGA}>
               <Picker.Item label = {'Birnin Gwari'} value = "Birnin Gwari" />
               <Picker.Item label ='Giwa'   value='Giwa' /> 
               <Picker.Item label = 'Igabi'  value='Igabi' />
               <Picker.Item label = 'Ikara'  value='Ikara' />
               <Picker.Item label ='Jaba'  value='Jaba' />
               <Picker.Item label ='Jemaa'  value='Jemaa' />
               <Picker.Item label ='Kachia'  value='Kachia' />
               <Picker.Item label = 'Kaduna North'  value='Kaduna North' />
               <Picker.Item label = 'Kaduna South'  value = 'Kaduna South' />
               <Picker.Item label = 'Kagarko'  value='Kagarko' />
               <Picker.Item label='kajuru'  value='Kajuru'/>
        <Picker.Item label='Kaura'  value='Kaura'/>
        <Picker.Item label='Kauru'  value='Kauru'/>
        <Picker.Item label='Kubau'  value='Kubau'/>
        <Picker.Item label='Kudan'  value='Kudan'/>
        <Picker.Item label='Lere'  value='Lere'/>
        <Picker.Item label='Makarfi'  value='Makarfi'/>
        <Picker.Item label='Sabon Gari'  value='Sabon Gari'/>
        <Picker.Item label='Sanga'  value='Sanga'/>
        <Picker.Item label='Soba'  value='Soba'/>
        <Picker.Item label='Zangon Kataf'  value='Zangon Kataf'/>
       <Picker.Item label='Zaria' value='Zaria'/>


            </Picker>
   
 
            </View>
     
        <TextInput style={styles.box} placeholder={lang.area} value={area} onChangeText = {changeArea}/>
 
 {//}       <TextInput style={styles.box} placeholder={lang.contact} value={contact2} onChangeText = { changeContact}/>
 }
    {imguri2!='' &&    <Image source={{uri: imguri2}}
       style={{width: 150, height: 150}} />}
      <Button title={lang.pic} onPress={()=>_takePhoto() } />
      <TouchableOpacity style={styles.updbtn} onPress={()=>handleSend() } >
              <Text style={styles.txt}> {lang.send} </Text> 
        </TouchableOpacity>

 

      </View>
 
      </ScrollView>
  );
};



async function uploadImageAsync(uri,a,b) {
  //return alert(uri+ )
  let apiUrl = 'https://kd-sema.herokuapp.com/api/v1/upload';

  
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];
//alert(fileType)
  let formData = new FormData();
  formData.append('rid',a);
  formData.append('pid', b);
  formData.append('activity',1);
  formData.append('outcome',1);
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return await fetch(apiUrl, options)
 
/**/
}



const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    textAlign: "center",
    width:"90%"

  },
  container:{
    display:'flex',
    justifyContent:"flex-start",
    alignItems: "flex-start",
    width:"90%"
    
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
    width: "90%",
    marginRight:20,
    borderRadius:4,
    justifyContent:'center',
    alignContent: 'center'
  }
});


export default Report;