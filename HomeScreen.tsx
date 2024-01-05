import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // pour une combo
import HomeScreenStyle from './HomeScreenStyles';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };

type RootStackParamList = {
  Home: { userId: number; userName: string };
  HomeCamping: undefined;
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

  const loadUserProfile = async (userId: number) => {
    // Charger la photo de profil de l'utilisateur depuis la base de données en utilisant userId
  };

  const handleProfilePicChange = async () => {
    // Permettre à l'utilisateur de sélectionner et de télécharger une nouvelle photo de profil
  };

  const handleConnectToCamping = async () => {
    try {
      const response = await fetch('https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoginCamping.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nomCamping: selectedCamping,
          password: password
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        navigation.navigate('HomeCamping'); // Redirection vers la page HomeCamping.tsx
      } else {
        Alert.alert("Erreur de connexion", data.message);
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
          <Image source={userPhoto ? { uri: userPhoto } : require('./ASSET/profil.jpg')} style={HomeScreenStyle.profilePic} />
        </TouchableOpacity>
        <Text style={HomeScreenStyle.userName}>{userName}</Text>
        <View style={HomeScreenStyle.frameContainer}>
          <Text style={HomeScreenStyle.label}>Nom du camping :</Text>
          <TextInput
            style={HomeScreenStyle.input}
            onChangeText={text => setSelectedCamping(text)}
            value={selectedCamping}
            placeholder="Entrez le nom du camping"
          />
          <TextInput
            style={HomeScreenStyle.input}
            onChangeText={text => setPassword(text)}
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
