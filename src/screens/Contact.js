
import React from "react";
import { View, StyleSheet, Text ,Button, AsyncStorage} from "react-native";

const Contact = ({navigation}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.txt}>080SEMAKAD</Text>
      <Text style={styles.txt}>080SEMAZAR</Text>
      <Text style={styles.txt}>080SEMAKAF</Text>


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

export default Contact;