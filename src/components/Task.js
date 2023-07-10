import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import Button from './Button';
import * as DateHelper from '../helpers/date';
import { failTask, concludeTask } from './../services/task';
import { ModalContext } from '../contexts/ModalContextProvider';


function Task({data, callbackFail, callbackConclude }) {
  const { openModal } = React.useContext(ModalContext);

  const navigation = useNavigation();

  const fail = async (id) => {
    try {
      await failTask(id);
      callbackFail();
    } catch (error) {
      openModal('Erro ao falhar tarefa');
    }
  };

  const conclude = async (id) => {
    try {
      await concludeTask(id);
      callbackConclude();
    } catch (error) {
      openModal('Erro ao concluir tarefa');
    }
  };

  const open = async (task) => {
    navigation.navigate('Task', { task });
  };

  return (
    <Pressable onPress={() => open(data)}>
      <View
        style={[
          styles.card,
          data.isFailed && styles.failedTask,
          data.isConclude && styles.concludeTask,
        ]}
      >
        <View>
          <Text
            style={[ 
              styles.title,
              (data.isConclude || data.isFailed) && styles.completedTitle
            ]}
          >
            {data.name}
          </Text>
          <Text style={[styles.text]}>
            {DateHelper.ToString(new Date(data.startTime), 'HH:mm')} - {''}
            {DateHelper.ToString(new Date(data.endTime), 'HH:mm')}
          </Text>
          {
            data.note && (
              <Text style={[styles.text, styles.note]}>{data.note}</Text>
            )
          }
        </View>
        {
          (!data.isConclude && !data.isFailed) && (
            <View style={styles.row}>
              <View style={styles.button}>
                <Button
                  iconName='x'
                  iconSize={30}
                  color='#f9f9f9'
                  iconColor='#222222'
                  onPress={() => fail(data.id)}
                />
              </View>
              <View style={styles.button}>
                <Button
                  iconName='check'
                  iconSize={30}
                  color='#f9f9f9'
                  iconColor='#222222'
                  onPress={() => conclude(data.id)}
                />
              </View>
            </View>
          )
        }
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    minHeight: 30,
    borderColor: '#f9f9f9',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontFamily: 'monospace',
    minWidth: '90%',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: '15%',
    marginHorizontal: 2
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  completedTitle: {
    textDecorationLine: 'line-through'
  },
  text: {
    fontFamily: 'monospace',
  },
  note: {
    fontStyle: 'italic',
  },
  failedTask: {
    backgroundColor: '#faede5',
    borderColor: '#faede5',
  },
  concludeTask: {
    backgroundColor: '#e9f7ed',
    borderColor: '#e9f7ed',
  },
});

export default Task;