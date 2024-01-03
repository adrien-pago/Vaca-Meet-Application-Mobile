// Importations nécessaires
import React, { useState } from 'react';
import { Modal, StyleSheet, View, TextInput, Button, Alert, Text, ImageBackground, TouchableOpacity } from 'react-native';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/2691031.jpg" };

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
        <Button title="Se Connecter" onPress={() => {/* Logique de connexion */}} />

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
              {/* Croix pour fermer la fenêtre modale */}
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>X</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                onChangeText={setPseudo}
                value={pseudo}
                placeholder="Pseudo"
              />
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
              />
              <Button title="S'inscrire" onPress={handleSignUp} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

// Styles
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
    marginTop: 22,
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
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  // Ajoutez ou modifiez d'autres styles si nécessaire
});
