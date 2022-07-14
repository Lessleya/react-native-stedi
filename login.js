import React from "react";
import { useState } from "react";
import {  onPress, SafeAreaView, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";

const sendText = async (phoneNumber) =>{
  const textResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{'Content-Type': 'application/text' }
  });
};


const getToken = async ({phoneNumber, oneTimePassword, setUserLoggedIn}) => {
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers:{'content-type':'application/json'}
  });


  const responseCode = tokenResponse.status;
  console.log("Response Status Code", responseCode);
  if(responseCode==200)
    setUserLoggedIn(true);

};

  const tokenResponseString = await tokenResponse.text();
  console.log("Token",tokenResponseString);
  
  const getUsername = await fetch('https://dev.stedi.me/validate/'+tokenResponseString);
 
  const getUserString = await getUsername.text();
  console.log("Username", getUserString);




const login = (props) => {
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
        onPress={()=> sendText(phoneNumber)}
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
        onPress={()=>{getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn})}}
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