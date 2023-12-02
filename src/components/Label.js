import React from 'react';
import { Text, StyleSheet } from 'react-native';


function Label({ value }) {
  return (
    <>
      <Text style={styles.label}>
        {value}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'monospace',
    minWidth: '100%',
    color: '#222222'
  }
});

export default Label;