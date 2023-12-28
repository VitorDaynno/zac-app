import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text
} from 'react-native';

import { ModalContext } from '../contexts/ModalContextProvider';
import { UserContext } from '../contexts/UserContextProvider';
import { login } from './../services/user';
import Button from '../components/Button';
import Input from '../components/Input';


function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = React.useContext(UserContext);
  const { openModal } = React.useContext(ModalContext);

  const onLogin = async () => {
    try {
      const { data } = await login(email, password);

      loginUser(data);
      navigation.navigate('Home');
    } catch (error) {
      openModal('E-mail ou senha incorretos!');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInner}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
          resizeMode="contain"
        />
        <View style={styles.containerInput}>
          <Input
            label={'E-mail'}
            placeholder={'Digite o e-mail'}
            onChange={(email) => setEmail(email)}
          />
          <Input
            label={'Senha'}
            placeholder={'Digite sua senha'}
            secureTextEntry={true}
            onChange={(password) => setPassword(password)}
          />
          <Button label={'Entrar'} color={'#222222'} onPress={onLogin}/>
        </View>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  containerInner: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    top: 50,
    maxWidth: '80%'
  },
  logo: {
    height: 80,
    marginVertical: 30,
  },
  containerInput: {
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  version: {
    position: 'absolute',
    fontFamily: 'monospace',
    color: '#222222',
    bottom: 55,
  }
});
export default Login;
