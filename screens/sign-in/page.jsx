import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        setLoading(true);
        signInWithEmailAndPassword(getAuth(), form.email, form.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('User signed in:', user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
        }).finally(() => {
            setLoading(false);
        });
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <TextInput
                placeholder='Email'
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
                style={{ marginBottom: 10, borderWidth: 1, padding: 10, borderRadius: 5 }}
            />
            <TextInput
                placeholder='Password'
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                style={{ marginBottom: 10, borderWidth: 1, padding: 10, borderRadius: 5 }}
            />
            <TouchableOpacity
                onPress={handleSignIn}
                style={{ backgroundColor: 'blue', alignItems: 'center' }}
            >
                <Text style={{ color: 'white', padding: 10 }}>{loading ? 'loading...' : 'Sign In'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({})