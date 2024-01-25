import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // pour une combo date
import HomeScreenStyle from '../Styles/HomeScreenStyles';
import { PlanningEvent } from './types'
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/fond_vaca_meet.jpg" };

const votrePlanning = {};//valeur du planning par défault

type RootStackParamList = {
  Home: { userId: number; userName: string };
  HomeCamping: { planning: { [key: string]: PlanningEvent[] } };
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({ route, navigation }: HomeScreenProps) {
  const { userId, userName } = route.params;
  const [campings, setCampings] = useState<{nom_camping: string}[]>([]);
  const [selectedCamping, setSelectedCamping] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);


  useEffect(() => {
    loadCampings();
    loadUserProfile(userId);
  }, []);

 
  /////////////////////////// Fonction charger nom de camping Combo //////////////////////////////////////////
  const loadCampings = async () => {
    try {
      const response = await fetch('https://vaca-meet.fr/PHP_APPLICATION_MOBILE/NomCampingCombo.php');
      const data = await response.json();
      const formattedData = data.map((nom_camping: string) => ({ nom_camping }));
      setCampings(formattedData); // Mettre à jour l'état ici
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur de chargement", "Impossible de charger les campings.");
    }
  };

  ///////////////////////// Fonction charger photo de profil /////////////////////////////////////////////
  const loadUserProfile = async (userId: number) => {
    // Charger la photo de profil de l'utilisateur depuis la base de données en utilisant userId
  };

  //////////////////////// Fonction Modifier photo de profil //////////////////////////////////
  const handleProfilePicChange = async () => {
    // Permettre à l'utilisateur de sélectionner et de télécharger une nouvelle photo de profil
  };

  const handleConnectToCamping = async () => {
    console.log("Tentative de connexion avec : ", selectedCamping, password);
    try {
      let response = await fetch('https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoginCamping.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nomCamping: selectedCamping,
          password: password,
        })
      });
      let json = await response.json();
      console.log("Réponse du serveur:", json);
      if(json.status === 'success') {
        navigation.navigate('HomeCamping', { planning: votrePlanning });
      } else {
        Alert.alert("Erreur de connexion", json.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur réseau", "Impossible de se connecter au serveur.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={HomeScreenStyle.backgroundImage}>
      <View style={HomeScreenStyle.container}>
        <TouchableOpacity style={HomeScreenStyle.profilePicContainer} onPress={handleProfilePicChange}>
          <Image source={userPhoto ? { uri: userPhoto } : require('../ASSET/profil.jpg')} style={HomeScreenStyle.profilePic} />
        </TouchableOpacity>
        <Text style={HomeScreenStyle.userName}>{userName}</Text>
        <View style={HomeScreenStyle.frameContainer}>
          <Text style={HomeScreenStyle.label}>Nom du camping et son Password :</Text>
          <TextInput
            style={HomeScreenStyle.input}
            onChangeText={(text: string) => setSelectedCamping(text)}

            value={selectedCamping}
            placeholder="Entrez le nom du camping"
          />
          <TextInput
            style={HomeScreenStyle.input}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={HomeScreenStyle.button} onPress={handleConnectToCamping}>
            <Text style={HomeScreenStyle.buttonText}>Se connecter au camping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;
