import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


function DaysOfWeekSelector({change}) {
  const [days, setDays] = useState([
    {
      id: 0,
      label: 'Dom',
      selected: false,
    },
    {
      id: 1,
      label: 'Seg',
      selected: false,
    },
    {
      id: 2,
      label: 'Ter',
      selected: false,
    },
    {
      id: 3,
      label: 'Qua',
      selected: false,
    },
    {
      id: 4,
      label: 'Qui',
      selected: false,
    },
    {
      id: 5,
      label: 'Sex',
      selected: false,
    },
    {
      id: 6,
      label: 'Sab',
      selected: false,
    }
  ]);

  useEffect(()=> {
    const selectedDays = days
      .filter(day => day.selected)
      .map(day => day.id);
    
    change(selectedDays);
  }, [days]);

  const selectDay = (selectedDay) => {
    const index = days.findIndex((day) => day.id === selectedDay.id);

    days[index] = {
      ...days[index],
      selected: !days[index].selected
    };

    setDays([
      ...days
    ]);
  };

  return (
    <View style={styles.daySelector}>
      {days.map((day) => {
        return (
          <TouchableOpacity
            key={day.id}
            style={
              [
                styles.button,
                (
                  day.selected
                    ? styles.buttonSelected
                    : styles.buttonNotSelected
                )
              ]
            }
            onPress={()=> selectDay(day)}
          >
            <Text
              style={
                [
                  styles.text,
                  (
                    day.selected
                      ? styles.textSelected
                      : styles.textNotSelected
                  )
                ]
              }
            >
              {
                day.label
              }
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 10,
    width: '10%',
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonSelected: {
    backgroundColor: '#ff3e1d',
  },
  buttonNotSelected:{
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f9f9f9'
  },
  text: {
    fontSize: 12,
    fontFamily: 'monospace',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%'
  },
  textSelected: {
    color: 'white',
  },
  textNotSelected: {
    color: '#898989',
  }
});

export default DaysOfWeekSelector;