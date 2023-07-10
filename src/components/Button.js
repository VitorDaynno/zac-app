import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Octicons';


function Button({
  iconName,
  iconSize,
  iconColor,
  color,
  label,
  onPress,
  disabled
}) {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          ( disabled
            ? styles.disabledButton
            : {backgroundColor: color}
          )
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        {iconName && (<Icons name={iconName} size={iconSize} color={iconColor} />)}
        {label && (<Text style={styles.label}>{label}</Text>)}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    height: 43,
  },
  disabledButton: {
    backgroundColor: '#bababa'
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  }
});

export default Button;