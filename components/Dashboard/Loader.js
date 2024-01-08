import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        style={styles.loader}
        color="#3498db" // Blue color for the loader
        size="large"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    zIndex: 1000, // Ensure the loader appears above other elements
  },
  loader: {
    transform: [{ scale: 1.5 }], // Adjust the scale as needed
  },
});

export default Loader;
