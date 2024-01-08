import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

const Header = ({ isLoggedIn, onLogout }) => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>IPO</Text>
      </View>
      <View style={styles.nav}>
        {isLoggedIn ? (
          <>
            <TouchableOpacity style={styles.navLink}>
              <Link to="/Dashboard" style={styles.linkText}>
                Home
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navLink}>
              <Link to="/currency" style={styles.linkText}>
                Currency
              </Link>
            </TouchableOpacity>
         
            <TouchableOpacity style={styles.navLink}>
              <Button onPress={onLogout}>Logout</Button>
            </TouchableOpacity>
          </>
        ) : (
          <>
          
            <TouchableOpacity style={styles.navLink}>
              <Link to="/Register" style={styles.linkText}>
                SignUp
              </Link>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const Button = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
    padding: 10,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLink: {
    marginHorizontal: 10,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'none',
  },
  notificationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
  },
  themeToggle: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#d9534f',
    color: 'white',
    padding: 8,
    borderRadius: 4,
    cursor: 'pointer',
    marginTop: -5,
    transition: 'background-color 0.3s ease',
  },
  buttonText: {
    color: 'white',
  },
});

export default Header;
