import React from "react";
import { useState } from "react";
import {  onPress, SafeAreaView, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";

async function sendText(phoneNumber){
  console.log("Phone Number: ",phoneNumber)
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
}

const getUserName = async (token, setUserName) => {
  console.log("Let's get the username")
  const userNameResponse = await fetch('https://dev.stedi.me/validate/'+ token,{
    method: 'GET',
    headers:{
      'content-type' : 'application/json'
    }
  });

  const userName = await userNameResponse.text()
  console.log(userName)
  setUserName(userName)
}

const getToken = async ({oneTimePassword, phoneNumber, setUserLoggedIn, setUserName}) => {
  console.log("This should log you in")
    const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({oneTimePassword, phoneNumber})
  });


const sendText = async (phoneNumber) =>{
  const textResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{'Content-Type': 'application/text' }
  });
};

const responseCode = tokenResponse.status;
  console.log("Repsonse Status Code", responseCode);
  if (responseCode==200)
  {
    setUserLoggedIn(true);

  }

  const tokenResponseText = await tokenResponse.text();
  console.log(tokenResponseText)
  getUserName(tokenResponseText, setUserName)
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);


  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="000-000-0000"
        placeholderTextColor='#888888'
        keyboardType="numeric"
      />
       <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor='#888888'
        keyboardType="numeric"
        secureTextEntry={true}
      />

<TouchableOpacity
        style={styles.button}
        onPress={()=>{
          getToken({oneTimePassword, phoneNumber, setUserLoggedIn:props.setUserLoggedIn, setUserName:props.setUserName});
        //  props.setUserLoggedIn(true)
        }}
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