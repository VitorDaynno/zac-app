import React from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';

function Input({placeholder, label, onChange, secureTextEntry, value}) {
  return (
    <>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(event) => onChange(event)}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 46,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f9f9f9',
    padding: 10,
    minWidth: '100%',
    fontFamily: 'monospace',
    color: '#222222'
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'monospace',
    minWidth: '100%',
    color: '#222222'
  }
});

export default Input;