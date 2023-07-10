import React, { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [user, setUser] = React.useState({name: ''});

  const navigation = useNavigation();

  axios.interceptors.response.use( (response) => {
    return response;
  }, (error) => {
    if (error.response && error.response.status === 403) {
      logoutUser();
    }
  });

  React.useEffect(() => {
    recoverLoggedUser();
  },[]);
  
  React.useEffect(() => {
    if (!user || !user.token) {
      navigation.navigate('Login');
    }

    if(user && user.token) {
      loginUser(user);
      navigation.navigate('Home', user);
    }
  },[user]);

  const recoverLoggedUser = async () => {
    const savedUser = await AsyncStorage.getItem('@storage_user');

    setUser(JSON.parse(savedUser));
  };

  const loginUser = async (user) => {
    const { token } = user;

    setUser(user);
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    await AsyncStorage.setItem('@storage_user', JSON.stringify(user));
  };

  const updateUser = async (newValues) => {
    setUser({
      ...user,
      ...newValues
    });
    await AsyncStorage.setItem('@storage_user', JSON.stringify(user));
  };

  const logoutUser = async () => {
    setUser({});
    await AsyncStorage.removeItem('@storage_user');
  };
  
  return (
    <UserContext.Provider value={{user, updateUser, loginUser, logoutUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;