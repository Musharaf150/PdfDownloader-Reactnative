import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';

const GoogleProvider = () => {
  GoogleSignin.configure({
  webClientId: '561702291357-atn744kbjjv87e50ofco850sdqgesbos.apps.googleusercontent.com',
});

const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
  
    // Try the new style of google-sign in result, from v13+ of that module
    idToken = signInResult.data?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult?.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }

    console.log('Google Sign-In Result:', signInResult);
    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(signInResult?.data?.idToken);
  
    // Sign-in the user with the credential
    return signInWithCredential(getAuth(), googleCredential);
    
  } catch (error) {
    console.error('Google Sign-In Error:', error);
  }
  // Check if your device supports Google Play
}
  return (
   <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 10}}>
    <Text>
      Or continue with Google
    </Text>
    <TouchableOpacity
    onPress={signInWithGoogle}
     style={{
    backgroundColor: 'blue',
    height: 48,
    width: 48,
    borderRadius:5
    }}>
    <Image source={require('../assets/googleIcon.png')} alt='GoogleIcon'
    style={{ height: 48, width: 48}}/>
   </TouchableOpacity>
   </View>
  )
}

export default GoogleProvider

const styles = StyleSheet.create({})