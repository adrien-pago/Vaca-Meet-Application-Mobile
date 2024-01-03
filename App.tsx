// Importations nécessaires
import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Alert, Text, ImageBackground,Button  } from 'react-native';
import styles from './AppStyles'; // Assurez-vous que le chemin d'accès est correct

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };

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
      if (error instanceof SyntaxError) {
        Alert.alert("Erreur de parsing", "La réponse du serveur n'est pas en format JSON valide.");
      } else {
        Alert.alert("Erreur réseau", "Impossible de se connecter au serveur.");
      }
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Vaca Meet</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>

          <View style={styles.buttonSpacer} />

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {/* Logique de connexion */}}
          >
            <Text style={styles.buttonText}>Se Connecter</Text>
          </TouchableOpacity>
        </View>

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
