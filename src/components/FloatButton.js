import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icons from 'react-native-vector-icons/Octicons';


function FloatButton({iconName, iconSize, onPress, options}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.div}>
      {
        isMenuOpen && options?.map((option) => (
          <View key={option.key} style={styles.option}>
            <View  style={styles.optionContainer}>
              <Text style={styles.optionText}> {option.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={option.action}
            >
              <Icons
                name={option.icon}
                size={iconSize}
                color={'#898989'}
              />
            </TouchableOpacity>
          </View>
        ))
      }
      <TouchableOpacity
        style={styles.mainButton}
        {
          ...(
            options
              ? {onPress: () => setIsMenuOpen(!isMenuOpen)}
              : {onPress: onPress}
          )
        }
      >
        <Icons
          name={
            options
              ? (isMenuOpen ? 'x' : 'plus')
              : iconName
          }
          size={iconSize}
          color={'#fff'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end'
  },
  mainButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#ff3e1d',
    borderRadius: 100,
    elevation: 10,
    shadowColor: '#52006A',
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 5,
    elevation: 10,
    shadowColor: '#52006A',
  },
  option: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: 5
  },
  optionButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
    elevation: 10,
    shadowColor: '#52006A',
  },
  optionText: {
    color: '#898989',
    fontFamily: 'monospace'
  }
});

export default FloatButton;