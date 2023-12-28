import React, { createContext } from 'react';
import { Modal, View, StyleSheet, Text, Pressable } from 'react-native';


export const ModalContext = createContext();

const ModalContextProvider = ({children}) => {
  const [message, setMessage] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const openModal = async (message) => {
    setMessage(message);
    setIsVisible(true);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {message}
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 30,
    backgroundColor: '#222222',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#222222'
  },
});

export default ModalContextProvider;