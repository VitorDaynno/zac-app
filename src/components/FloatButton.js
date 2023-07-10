import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Octicons';


function FloatButton({iconName, iconSize, color, onPress}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Icons name={iconName} size={iconSize} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  }
});

export default FloatButton;