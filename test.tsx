/////////////////// Importations nécessaires /////////////////////////////////////////////
import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Alert, Text, ImageBackground } from 'react-native';
import HomeScreen from './HomeScreen';
import styles from './AppStyles';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [nom, setNom] = useState('');

  //////////////////////// Fonction Connexion ////////////////////////////////////
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
        navigation.navigate('Home'); // Naviguer vers HomeScreen après une connexion réussie
        // TODO: Naviguer vers la nouvelle page après succès de la connexion
      } else {
        Alert.alert("Erreur", json.message || "Une erreur est survenue lors de la connexion.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur réseau", "Impossible de se connecter au serveur.");
    }
  };

  ////////////// Fonction Inscription /////////////////
  const handleSignUp = async () => {
    if (!email || !password || !pseudo) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs pour l'inscription.");
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
        setModalVisible(false);// fermer fenetre modal en cas de réussite d'inscription
  
      } else {
        Alert.alert("Erreur lors de l'inscription", json.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur réseau", "Impossible de se connecter au serveur.");
    }
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
              {/* Remplacez le bouton par la logique d'inscription */}
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}