import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';

import DatetimeInput from '../components/DatetimeInput';
import FloatButton from '../components/FloatButton';
import DaySelector from '../components/DaySelector';
import Task from '../components/Task';

import { getStartOfDay, getEndOfDay } from '../helpers/date';
import { getTasks as getTasksService }  from '../services/task';

import { ModalContext } from '../contexts/ModalContextProvider';


function Home({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [searchDate, setSearchDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const { openModal } = React.useContext(ModalContext);

  const getTasks = async () => {
    try {
      const startDate = getStartOfDay(searchDate);
      const endDate = getEndOfDay(searchDate);
      
      const response = await getTasksService({startDate, endDate});

      const { data } = response;
      const { tasks } = data;

      setTasks(tasks);
    } catch (error) {
      openModal('Erro ao buscar as tarefas');
    }
  };

  const newTask = async () => {
    navigation.navigate('Task');
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStartDate(new Date());
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getTasks();
  },[searchDate, startDate]);

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.dateSelector}>
          <DatetimeInput
            mode='date'
            value={startDate}
            onChangeValue={(date) => setStartDate(date)}
          />
        </View>
        {/* <View style={styles.line}/> */}
        <DaySelector
          firstDay={startDate}
          change={(date) => setSearchDate(date)}
        />
        <ScrollView>
          {tasks.map((task)=>
            (<View key={task.id}>
              <Task
                data={task}
                callbackFail={getTasks}
                callbackConclude={getTasks}
              />
            </View>)
          )}
        </ScrollView>
        {
          !tasks.length && (
            <>
              <Image
                style={styles.noDataImage}
                // eslint-disable-next-line no-undef
                source={require('../../assets/nodata17.png')}
                resizeMode="contain"
              />
              <Text style={styles.noData}>
                Nenhuma tarefa a ser exibida
              </Text>
            </>
          )
        }
      </View>
      <FloatButton iconName={'plus'} iconSize={30} onPress={newTask}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    height: '95%',
    padding: 10,
    paddingTop: 25,
  },
  dateSelector: {
    maxWidth: '30%',
    alignSelf: 'center',
    marginBottom: 15
  },
  noData: {
    fontFamily: 'monospace',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 40,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#898989',
  },
  noDataImage: {
    maxWidth: '90%',
    maxHeight: '50%',
    alignSelf: 'center',
  }
});

export default Home;