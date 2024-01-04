import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HomeScreenStyle from './HomeScreenStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" };

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
  const [campings, setCampings] = useState<Camping[]>([]);
  const [selectedCamping, setSelectedCamping] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    loadCampings();
    loadUserProfile(userId);
  }, []);

  const loadCampings = async () => {
    // Charger la liste des campings depuis la base de données
  };

  const loadUserProfile = async (userId: number) => {
    // Charger la photo de profil de l'utilisateur depuis la base de données en utilisant userId
  };

  const handleProfilePicChange = async () => {
    // Permettre à l'utilisateur de sélectionner et de télécharger une nouvelle photo de profil
  };

  const handleConnectToCamping = async () => {
    // Gérer la connexion de l'utilisateur au camping sélectionné avec le mot de passe fourni
  };

  return (
    <ImageBackground source={backgroundImage} style={HomeScreenStyle.backgroundImage}>
      <View style={HomeScreenStyle.container}>
        <TouchableOpacity style={HomeScreenStyle.profilePicContainer} onPress={handleProfilePicChange}>
          <Image source={userPhoto ? { uri: userPhoto } : require('/path/to/default/profile/pic.png')} style={HomeScreenStyle.profilePic} />
        </TouchableOpacity>
        <Text>{userName}</Text>
        <Text style={HomeScreenStyle.label}>Choisissez votre camping :</Text>
        <Picker selectedValue={selectedCamping} style={HomeScreenStyle.picker} onValueChange={(itemValue) => setSelectedCamping(itemValue)}>
          {campings.map(camping => (
            <Picker.Item key={camping.id} label={camping.nom_camping} value={camping.nom_camping} />
          ))}
        </Picker>
        <TextInput style={HomeScreenStyle.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity style={HomeScreenStyle.button} onPress={handleConnectToCamping}>
          <Text style={HomeScreenStyle.buttonText}>Se connecter au camping</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;
