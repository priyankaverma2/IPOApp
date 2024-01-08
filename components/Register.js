import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { themeStyles } = useTheme();

  const handleRegister = async () => {
    if (!name || !email || !username || !password) {
      setError('All fields are required');
      return;
    }

    const user = {
      name,
      email,
      username,
      password,
    };
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.registerEntire, themeStyles]}>
      <View style={styles.registerContainer}>
        <Text style={styles.registerHeader}>Sign Up</Text>
        <View style={styles.registerForm}>
          <TextInput
            style={styles.registerInput}
            value={name}
            placeholder="Enter your name"
            onChangeText={(text) => setName(text)}
            required
          />
          <TextInput
            style={styles.registerInput}
            value={email}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            required
          />
          <TextInput
            style={styles.registerInput}
            value={username}
            placeholder="Choose a username"
            onChangeText={(text) => setUsername(text)}
            required
          />
          <TextInput
            style={styles.registerInput}
            value={password}
            placeholder="Create a password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            required
          />
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={{ color: '#ffffff' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerEntire: {
    backgroundColor: '#fff', // Replace with your background color
    flex: 1,
    padding: 50,
    height: '100%',
  },
  registerContainer: {
    textAlign: 'center',
    maxWidth: 400,
    margin: 'auto',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    backgroundColor: '#fff', // Replace with your background color
    borderRadius: 8,
    shadowRadius: 2,
  },
  registerHeader: {
    fontSize: 24,
    marginBottom: 20,
  },
  registerForm: {
    flexDirection: 'column',
  },
  registerInput: {
    margin: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    width: '100%',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 4,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Register;
