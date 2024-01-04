///////////////// HomeScreen.js ////////////////////////
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Picker, TextInput, StyleSheet, Image } from 'react-native';
import HomeScreenStyle from './HomeScreenStyles'; // Assurez-vous que ce fichier existe et est correctement placé

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca meet fond.png" }; // Utilisation de votre fond d'écran

function HomeScreen({ route }) {
  const { userId, userName } = route.params; // Récupérez les données passées depuis App.tsx
  const [campings, setCampings] = useState([]); // État pour stocker les campings
  const [selectedCamping, setSelectedCamping] = useState(''); // État pour le camping sélectionné
  const [password, setPassword] = useState(''); // État pour le mot de passe
  const [userPhoto, setUserPhoto] = useState(null); // État pour la photo de profil

  // Charger les données au montage du composant
  useEffect(() => {
    // TODO: Charger la liste des campings depuis la base de données
    // TODO: Charger la photo de profil de l'utilisateur depuis la base de données en utilisant userId
  }, []);

  // TODO: Implémenter une fonction pour modifier la photo de profil
  const handleProfilePicChange = () => {
    // Logique pour permettre à l'utilisateur de sélectionner et de télécharger une nouvelle photo de profil
  };

  // TODO: Implémenter une fonction pour la connexion au camping sélectionné
  const handleConnectToCamping = () => {
    // Logique pour gérer la connexion de l'utilisateur au camping sélectionné avec le mot de passe fourni
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
