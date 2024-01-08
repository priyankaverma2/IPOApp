import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { themeStyles } = useTheme();

  const handleLogin = () => {
    if (username === 'priyanka' && password === 'priyanka') {
      onLogin();
      navigation.navigate('Dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={[styles.loginEntire, themeStyles]}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Login</Text>
        <View style={styles.loginForm}>
          <TextInput
            style={styles.loginInput}
            value={username}
            placeholder="Enter your username"
            onChangeText={(text) => setUsername(text)}
            required
          />
          <TextInput
            style={styles.loginInput}
            value={password}
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            required
          />
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={{ color: '#ffffff' }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity>
                <Link to="/Register"><Text style={styles.h3}>Register? SignUp</Text></Link>
              </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginEntire: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 50,
    height: '100%',
  },
  loginContainer: {
    textAlign: 'center',
    maxWidth: 400,
    margin: 'auto',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    backgroundColor: '#fff', 
    borderRadius: 8,
    shadowRadius: 2,
  },
  loginHeader: {
    fontSize: 24,
    marginBottom: 20,
  },
  loginForm: {
    flexDirection: 'column',
    alignItems:'center'
  },
  loginInput: {
    margin: 5,
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
  h3:{
    textAlign:'center',
    alignItems:'center'
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 4,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom:2
  },
});

export default Login;
