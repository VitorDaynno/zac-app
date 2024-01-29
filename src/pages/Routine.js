import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import Button from '../components/Button';
import DatetimeInput from '../components/DatetimeInput';
import DaysOfWeekSelector from '../components/DaysOfWeekSelector';
import Input from '../components/Input';
import Label from '../components/Label';
import { ModalContext } from '../contexts/ModalContextProvider';
import { createRoutine } from '../services/routine';


function Routine({ route, navigation }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  const { openModal } = React.useContext(ModalContext);

  useEffect(()=> {
    validateValues();
  },[name, days, startTime, endTime]);


  const saveRoutine = async () => {
    try {
      const routine = {
        name,
        days,
        startTime,
        endTime,
        note,
      };

      await createRoutine(routine);

      navigation.navigate('Home');
    } catch (error) {
      openModal('Erro ao salvar a rotina!');
    }
  };

  const validateValues = () => {
    if(!name || !startTime || !endTime) {
      setButtonIsDisabled(true);
      return;
    }

    if(!days.length) {
      setButtonIsDisabled(true);
      return;
    }

    setButtonIsDisabled(false);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.body}>
        <Input
          label={'Nome'}
          placeholder={'Digite o nome da rotina'}
          value={name}
          onChange={(name) => setName(name)}
        />
        <Label value={'Dias'}/>
        <DaysOfWeekSelector change={(days) => setDays(days)}/>
        <DatetimeInput
          mode='time'
          label={'Hora de inicio'}
          value={startTime}
          onChangeValue={(startTime) => setStartTime(startTime)}
        />
        <DatetimeInput
          mode='time'
          label={'Hora de término'}
          value={endTime}
          onChangeValue={(endTime) => setEndTime(endTime)}
        />
        
        <Input
          label={'Observação'}
          value={note}
          onChange={(note) => setNote(note)}
        />
     
        <Button
          color='#222222'
          label={!id ? 'Criar': 'Atualizar'}
          onPress={saveRoutine}
          disabled={buttonIsDisabled}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 30
  },
});


export default Routine;