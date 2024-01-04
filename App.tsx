// Importations nécessaires
import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Alert, Text, ImageBackground } from 'react-native';
import styles from './AppStyles'; // Assurez-vous que le chemin d'accès est correct

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [nom, setNom] = useState('');

  const handleLogin = async () => {
    if (!nom || !password) {
      Alert.alert("Erreur", "Veuillez remplir les champs Nom et Password.");
      return;
    }

    try {
      let response = await fetch('https://vaca-meet.fr/PHP_APPLICATION_MOBILE/login_vaca_meet.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom: nom,
          password: password,
        })
      });
      let json = await response.json();
      Alert.alert("Réponse du serveur:", json.message);
      if(json.status === 'success') {
        // TODO: Naviguer vers la nouvelle page après succès de la connexion
      } else {
        Alert.alert("Erreur", json.message || "Une erreur est survenue lors de la connexion.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur réseau", "Impossible de se connecter au serveur.");
    }
  };

  const handleSignUp = async () => {
    // ... votre logique d'inscription existante ...
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Vaca Meet</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNom}
            value={nom}
            placeholder="Nom"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Se Connecter</Text>
            </TouchableOpacity>
          </View>
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
              {/* Remplacez le bouton par votre logique d'inscription */}
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
