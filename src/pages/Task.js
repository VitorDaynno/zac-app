import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import { ModalContext } from '../contexts/ModalContextProvider';
import DatetimeInput from '../components/DatetimeInput';
import Button from '../components/Button';
import Input from '../components/Input';
import * as DateHelper from '../helpers/date';
import {
  createTask,
  updateTask,
  deleteTask as deleteTaskService
} from '../services/task';


function Task({ route, navigation }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');

  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  const { openModal } = React.useContext(ModalContext);

  const saveTask = async () => {
    try {
      const selectedDay = DateHelper.ToString(date, 'yyyy-MM-dd');
      const selectedStartTime = DateHelper.ToString(startTime, 'HH:mm');
      const selectedEndTime = DateHelper.ToString(endTime, 'HH:mm');

      const task = {
        name,
        date: DateHelper.getStartOfDay(date),
        startTime: DateHelper.toDate(`${selectedDay}T${selectedStartTime}`),
        endTime: DateHelper.toDate(`${selectedDay}T${selectedEndTime}`),
        note,
      };

      if (id) {
        await updateTask(id, task);
      } else {
        await createTask(task);
      }

      navigation.navigate('Home');
    } catch (error) {
      openModal('Erro ao salvar a tarefa!');
    }
  };

  const validateValues = () => {
    if(!name || !date || !startTime || !endTime) {
      setButtonIsDisabled(true);
      return;
    }

    if(startTime > endTime) {
      setButtonIsDisabled(true);
      return;
    }

    setButtonIsDisabled(false);
  };

  const deleteTask = async () => {
    try {
      await deleteTaskService(id);

      navigation.navigate('Home');
    } catch (error) {
      openModal('Erro ao excluir a tarefa!');
    }
  };

  useEffect(() => {
    const { params } = route;
    const { task } = params || {};

    if (task) {
      const { id, name, date, startTime, endTime, note } = task;

      setId(id);
      setName(name);
      setDate(DateHelper.toDate(date, false));
      setStartTime(DateHelper.toDate(startTime, false));
      setEndTime(DateHelper.toDate(endTime, false));
      setNote(note);
    }
  }, []);

  useEffect(()=>{
    validateValues();
  },[name, date, startTime, endTime]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.body}>
        <Input
          label={'Nome'}
          placeholder={'Digite o nome da tarefa'}
          value={name}
          onChange={(name) => setName(name)}
        />
        <DatetimeInput
          mode='date'
          label={'Data'}
          value={date}
          onChangeValue={(date) => setDate(date)}
        />
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
          onPress={saveTask}
          disabled={buttonIsDisabled}
        />
        {
          id && (
            <Button
              color='red'
              onPress={deleteTask}
              label={'Excluir'}
            />
          )
        }
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
  }
});


export default Task;