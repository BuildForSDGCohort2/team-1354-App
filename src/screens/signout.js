
import React from "react";
import { View, StyleSheet, Text ,Button, AsyncStorage} from "react-native";

const Signout= ({navigation}) => {


    const logout =async()=>{
        await   AsyncStorage.removeItem('open')
        await   AsyncStorage.removeItem('closed')
        await   AsyncStorage.removeItem('feedback')
     await   AsyncStorage.setItem('login','ggg')
    }
  return (
    <View style={styles.center}>
     

     <Button title='Logout' onPress={()=>logout()}>
      
     </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  txt:{
    fontSize:22
  }
});

export default Signout;