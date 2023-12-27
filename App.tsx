// Importations nécessaires
import React, { useState } from 'react';
import { Modal, StyleSheet, View, TextInput, Button, Alert, Text, ImageBackground } from 'react-native';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/ 2691031.jpg" }; 

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !pseudo) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      let response = await fetch('https://vaca-meet.fr/PHP_APPLICATION_MOBILE/inscription.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          pseudo: pseudo,
        })
      });
      let json = await response.json();
      Alert.alert("Réponse du serveur:", json.message);
      if(json.status === 'success') {
        setModalVisible(false); // Fermer la fenêtre modale si succès
      } else {
        Alert.alert("Erreur", json.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Button title="S'inscrire" onPress={() => setModalVisible(true)} />
        <Button title="Se Connecter" onPress={() => {/* Ajouter la logique de connexion ici */}} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* ... Vos TextInputs et bouton restent ici ... */}
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
