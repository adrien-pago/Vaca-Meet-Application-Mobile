///////////////// HomeScreen.js ////////////////////////
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HomeScreenStyle from './HomeScreenStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };

// Définissez vos types ici
type RouteParams = {
  userId: number;
  userName: string;
};

type Camping = {
  id: number;
  nom_camping: string;
};

function HomeScreen({ route }: { route: RouteParams }) {
  const { userId, userName } = route;
  const [campings, setCampings] = useState<Camping[]>([]); // Typage du tableau campings
  const [selectedCamping, setSelectedCamping] = useState<string>(''); // État pour le camping sélectionné
  const [password, setPassword] = useState<string>(''); // État pour le mot de passe
  const [userPhoto, setUserPhoto] = useState<string | null>(null); // État pour la photo de profil

  useEffect(() => {
    loadCampings();
    loadUserProfile(userId);
  }, []);

  const loadCampings = async () => {
    // TODO: Charger la liste des campings depuis la base de données
  };

  const loadUserProfile = async (userId: number) => {
    // TODO: Charger la photo de profil de l'utilisateur depuis la base de données en utilisant userId
  };

  const handleProfilePicChange = async () => {
    // TODO: Permettre à l'utilisateur de sélectionner et de télécharger une nouvelle photo de profil
  };

  const handleConnectToCamping = async () => {
    // TODO: Gérer la connexion de l'utilisateur au camping sélectionné avec le mot de passe fourni
  };

  return (
    <ImageBackground source={backgroundImage} style={HomeScreenStyle.backgroundImage}>
      <View style={HomeScreenStyle.container}>
        {/* Photo de profil */}
        <TouchableOpacity style={HomeScreenStyle.profilePicContainer} onPress={handleProfilePicChange}>
          {/* Remplacez 'userPhoto' par l'URI de la photo de profil chargée */}
          <Image source={userPhoto ? { uri: userPhoto } : require('/path/to/default/profile/pic.png')} style={HomeScreenStyle.profilePic} />
        </TouchableOpacity>
        <Text>{userName}</Text> {/* Affichez le nom de l'utilisateur */}

        <Text style={HomeScreenStyle.label}>Choisissez votre camping :</Text>
        <Picker
          selectedValue={selectedCamping}
          style={HomeScreenStyle.picker}
          onValueChange={(itemValue) => setSelectedCamping(itemValue)}
        >
          {campings.map(camping => (
            <Picker.Item key={camping.id} label={camping.nom_camping} value={camping.nom_camping} />
          ))}
        </Picker>

        <TextInput
          style={HomeScreenStyle.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />

        <TouchableOpacity style={HomeScreenStyle.button} onPress={handleConnectToCamping}>
          <Text style={HomeScreenStyle.buttonText}>Se connecter au camping</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;
