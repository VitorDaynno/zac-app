import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Octicons';


function ShowHide({
  onPress,
  disabled,
  isHide
}) {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isHide ? '#ff3e1d' : '#ffffff',
            borderColor: isHide ? '#ff3e1d' : '#f9f9f9',
          }
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Icons
          name={ isHide ? 'eye-closed' : 'eye' }
          color={ isHide ? '#ffff': '#898989' }
          size={15}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    height: 40,
    borderWidth: 1
  }
});

export default ShowHide;