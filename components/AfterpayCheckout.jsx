import React, {useState} from 'react';
import {
  View,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import {confirmPayment} from '@stripe/stripe-react-native';

const AfterpayCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('50.00'); // Default amount

  const payWithAfterpay = async () => {
    if (!name || !email) {
      Alert.alert('Missing info', 'Please enter your name and email.');
      return;
    }

    try {
      setLoading(true);

      // 1. Ask backend to create PaymentIntent
      const response = await fetch(
        'http://192.168.0.163:3000/create-afterpay-intent',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            amount: amount * 100, // convert to cents
            currency: 'nzd',
          }), // amount in cents
        },
      );
      const {clientSecret} = await response.json();
      console.log('Response status:', clientSecret);

      if (!clientSecret) {
        throw new Error('Missing clientSecret from backend');
      }

      // 2. Confirm Afterpay payment
      const {error, paymentIntent} = await confirmPayment(clientSecret, {
        paymentMethodType: 'AfterpayClearpay',
        paymentMethodData: {
            billingDetails: {
                email: email,
              phone: '+48888000888',
          addressCity: 'Houston',
          addressCountry: 'US',
          addressLine1: '1459  Circle Drive',
          addressLine2: 'Texas',
          addressPostalCode: '77063',
          name: name,
            },
        }
      });
      console.log('Payment confirmation result:', {error, paymentIntent});
      if (error) {
        Alert.alert('Payment failed', error.message);
      } else if (paymentIntent) {
        Alert.alert('Success', 'Afterpay payment complete!');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
      console.log('Error during payment:', err);
    } finally {
      setLoading(false);
      setAmount('50.00');
      setName('');
      setEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="john@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="50.00"
        value={amount}
        onChangeText={setAmount}
        keyboardType="email-address"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Pay with Afterpay" onPress={payWithAfterpay} />
      )}
    </View>
  );
};

export default AfterpayCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },
});
