import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';

const SignUp = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        setLoading(true);
        createUserWithEmailAndPassword(getAuth(), form?.email, form?.password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
        setLoading(false);

        
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
                onPress={handleSignUp}
                style={{ backgroundColor: 'blue', alignItems: 'center' }}
            >
                <Text style={{ color: 'white', padding: 10 }}>{loading ? 'loading...' : 'Sign up'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({})