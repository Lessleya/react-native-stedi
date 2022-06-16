import React from "react";
import { useState } from "react";
import {  onPress, SafeAreaView, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";

const sendText =(phoneNumber) =>{

  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber),{
    method: 'POST',
    headers:{
      'Content-Type': 'application/text'
    }
  }
  console.log("PhoneNumber:", phoneNumber);
}

const login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="000-000-0000"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>(sendText(phoneNumber))}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={()=>(sendText(phoneNumber))}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },

  
});

export default login