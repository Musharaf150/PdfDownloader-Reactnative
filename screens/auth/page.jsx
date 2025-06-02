import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SignIn from '../sign-in/page';
import SignUp from '../sign-up/page';
import GoogleProvider from '../../components/GoogleProvider';

const Auth = () => {
    const [activeTab, setActiveTab] = useState('sign-in');
  return (
    <>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
        <TouchableOpacity onPress={() => setActiveTab('sign-in')}>
            <Text 
                style={{ fontSize: 20, color: activeTab === 'sign-in' ? 'blue' : 'black',
                    borderBottomColor: 'blue', borderBottomWidth: activeTab === 'sign-in' ? 2 : 0
                 }}
            >
                Sign In
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('sign-up')}>
            <Text 
                style={{ fontSize: 20, color: activeTab === 'sign-up' ? 'blue' : 'black',
                    borderBottomColor: 'blue', borderBottomWidth: activeTab === 'sign-up' ? 2 : 0
                 }}
            >
                Sign up
            </Text>
        </TouchableOpacity>
    </View>
    <GoogleProvider/>
    {activeTab === 'sign-in' ? (
        <SignIn/>
    )
    :
    (
        <SignUp/>
    )}
    </>
  )
}

export default Auth

const styles = StyleSheet.create({})