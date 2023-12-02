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
import ShowHide from '../components/ShowHide';
import Task from '../components/Task';

import { getStartOfDay, getEndOfDay } from '../helpers/date';
import { getTasks as getTasksService }  from '../services/task';

import { ModalContext } from '../contexts/ModalContextProvider';


function Home({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [searchDate, setSearchDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [showOnlyPending, setShowOnlyPending] = useState(false);

  const { openModal } = React.useContext(ModalContext);

  const options = [{
    key: 'task',
    name: 'Nova tarefa',
    icon: 'check',
    action: () => newTask()
  },{
    key: 'routine',
    name: 'Nova rotina',
    icon: 'tasklist',
    action: () => newRoutine()
  }];

  const getTasks = async () => {
    try {
      const startDate = getStartOfDay(searchDate);
      const endDate = getEndOfDay(searchDate);
      
      const response = await getTasksService({startDate, endDate});

      const { data } = response;
      const { tasks } = data;

      const sortedTasks = tasks.sort(
        (a, b) => b.startTime > a.startTime ? -1 : 0
      );

      setTasks(sortedTasks);
      setFilteredTasks(
        sortedTasks.filter((task)=> !task.isConclude && !task.isFailed)
      );
    } catch (error) {
      openModal('Erro ao buscar as tarefas');
    }
  };

  const newTask = async () => {
    navigation.navigate('Task');
  };

  const newRoutine = async () => {
    navigation.navigate('Routine');
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
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerItem}/>
          <View style={styles.dateSelector}>
            <DatetimeInput
              mode='date'
              value={startDate}
              onChangeValue={(date) => setStartDate(date)}
            />
          </View>
          <View style={styles.headerItem}>
            <ShowHide
              isHide={showOnlyPending}
              onPress={() => setShowOnlyPending(!showOnlyPending)}
            />
          </View>
        </View>
        <DaySelector
          firstDay={startDate}
          change={(date) => setSearchDate(date)}
        />
        <ScrollView>
          {
            (showOnlyPending ? filteredTasks : tasks).map((task)=>
              (
                <View key={task.id}>
                  <Task
                    data={task}
                    callbackFail={getTasks}
                    callbackConclude={getTasks}
                  />
                </View>
              )
            )
          }
        </ScrollView>
        {
          !(showOnlyPending ? filteredTasks : tasks).length && (
            <>
              <Image
                style={styles.noDataImage}
                // eslint-disable-next-line no-undef
                source={require('../../assets/nodata.png')}
                resizeMode="contain"
              />
              <Text style={styles.noData}>
                Nenhuma tarefa a ser exibida
              </Text>
            </>
          )
        }
      </View>
      <FloatButton iconSize={30} options={options}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    height: '100%',
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
    marginBottom: '50%',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#898989',
  },
  noDataImage: {
    maxWidth: '90%',
    maxHeight: '50%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerItem: {
    minWidth: '15%',
    maxWidth: '15%',
  }
});

export default Home;