import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { format, addDays } from 'date-fns';


function DaySelector({firstDay, change}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(()=> {
    if (selectedIndex) {
      setSelectedIndex(0);
    } else {
      change(firstDay);
    }
  }, [firstDay]);

  useEffect(()=> {
    change(addDays(firstDay, selectedIndex));
  }, [selectedIndex]);

  return (
    <View style={styles.daySelector}>
      {[0, 1, 2, 3, 4].map((index) => {
        return (
          <TouchableOpacity
            key={index}
            style={
              index === selectedIndex
                ? styles.dateSelected
                : styles.dateNotSelected
            }
            onPress={()=> setSelectedIndex(index)}
          >
            <Text
              style={
                index === selectedIndex
                  ? styles.textSelected
                  : styles.textNotSelected
              }
            >
              {
                format(
                  addDays(firstDay, index),
                  'eee dd'
                )
              }
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  dateSelected: {
    height: 80,
    backgroundColor: '#ff3e1d',
    width: '15%',
    borderRadius: 15,
  },
  dateNotSelected:{
    height: 80,
    backgroundColor: '#ffffff',
    width: '15%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f9f9f9'
  },
  textSelected: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'monospace',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%'
  },
  textNotSelected: {
    color: '#898989',
    fontSize: 18,
    fontFamily: 'monospace',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%'
  }
});

export default DaySelector;