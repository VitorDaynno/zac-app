import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { ToString } from '../helpers/date';


function DatetimeInput({mode, label, value, onChangeValue}) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    onChange(null, new Date());
  }, []);

  useEffect(() => {
    if (value) {
      onChange(null, value);
    }
  }, [value]);

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate;

    setDate(currentDate);
    onChangeValue(selectedDate);
  };
  
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: mode,
      is24Hour: true,
    });
  };
  
  const showDatepicker = () => {
    showMode();
  };

  const formatByMode = () => {
    switch(mode) {
    case 'date':
      return ToString(date, 'dd/MM/yyyy');
    case 'time':
      return ToString(date, 'HH:mm');
    default:
      return date.toISOString();
    }
  };

  return (
    <View>
      {
        label && (
          <Text style={styles.label}>
            {label}
          </Text>
        )
      }
      <TextInput
        style={styles.input}
        onPressIn={showDatepicker}
        value={formatByMode()}
        caretHidden={true}
        showSoftInputOnFocus={false}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 46,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f9f9f9',
    backgroundColor: '#FFF',
    padding: 10,
    minWidth: '100%',
    fontFamily: 'monospace',
    color: '#222222'
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'monospace',
    color: '#222222',
    minWidth: '100%',
  }
});

export default DatetimeInput;
