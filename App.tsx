import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeScreen from './Route/HomeScreen';
import HomeCamping from './Route/HomeCamping';
import ViewPlanningCamping from './Route/ViewPlanningCamping';
import ActivityRoom from './Route/ActivityRoom';
import styles from './Styles/AppStyles';

// gérer les routes de navigation //
export type RootStackParamList = {
  Login: undefined;
  HomeScreen: { userId: number; userName: string };
  HomeCamping: {campingName: string; idCamping: number ; userId: number; userName: string };
  ViewPlanningCamping: {campingName: string; idCamping: number}; 
  ActivityRoom:{idCamping: number; userId: number}
};

const defaultValue = {};  //valeur du planning par défault

const Stack = createNativeStackNavigator<RootStackParamList>(); //création de stack car on utilise plusieur route

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

function LoginScreen({ navigation }: LoginScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [nom, setNom] = useState('');

  ////////////////////////// Fonction de connexion ////////////////////////////////
  const handleLogin = async () => {
    if (!nom || !password) {
      Alert.alert("Erreur", "Veuillez remplir les champs Nom et Password.");
      return;
    }
    try {
      console.log("Envoi de la requête à l'API avec les données:", { nom, password });
      let response = await fetch('https://adrien-pago-portfolio.fr/PHP_APPLICATION_MOBILE/login_vaca_meet.php', {
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
      if (json.status === 'success') {
        const { id } = json;  // Assurez-vous que la réponse contient le `id`
        navigation.navigate('HomeScreen', { userId: id , userName: nom }); //envoyer vers la page HomeScreen.tsx
      } else {
        Alert.alert("Erreur", json.message || "Une erreur est survenue lors de la connexion.");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      if (error instanceof Error) {
        Alert.alert("Erreur réseau", `Impossible de se connecter au serveur: ${error.message}`);
      } else {
        Alert.alert("Erreur réseau", "Impossible de se connecter au serveur. ");
      }
    }
  };
  
  

  ////////////////////////// Fonction d'inscription ////////////////////////////////
  const handleSignUp = async () => {
    if (!email || !password || !pseudo) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs pour l'inscription.");
      return;
    }
    try {
      let response = await fetch('https://adrien-pago-portfolio.fr/PHP_APPLICATION_MOBILE/inscription.php', {
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
      let responseText = await response.text();  // Recevez la réponse sous forme de texte brut
      console.log("Réponse texte brute:", responseText); // Log pour le débogage
      let json = JSON.parse(responseText);  // Parsez le texte en JSON
  
      if (json.status === 'success') {
        setModalVisible(false);
      } else {
        Alert.alert("Erreur lors de l'inscription", json.message || "Une erreur est survenue.");
      }
    } catch (error) {
      Alert.alert("Erreur réseau", "Impossible de se connecter au serveur.");
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Vaca Meet</Text>
          <TextInput style={styles.input} onChangeText={setNom} value={nom} placeholder="Nom" />
          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Se Connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>X</Text>
              </TouchableOpacity>
              <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email" />
              <TextInput style={styles.input} onChangeText={setPseudo} value={pseudo} placeholder="Pseudo" />
              <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true} />
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

///////////////////// pour naviguer de page en page //////////////////////
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams={{ userId: 0, userName: '' }} />
        <Stack.Screen name="HomeCamping" component={HomeCamping} initialParams={{ campingName: '', idCamping: 0, userId: 0, userName:'' }}/>
        <Stack.Screen name="ViewPlanningCamping" component={ViewPlanningCamping} />
        <Stack.Screen name="ActivityRoom" component={ActivityRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
