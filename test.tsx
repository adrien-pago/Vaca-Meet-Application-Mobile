import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'; // Ajouté pour le sélecteur de date
import WeeklyPlanning from './WeeklyPlanning'; // Assurez-vous de créer ce fichier
import styles from './HomeCampingStyles';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/fond_vaca_meet.jpg" };
const defaultProfilePic = require('./ASSET/profil.jpg');

// Définition de l'interface pour les événements du planning
interface PlanningEvent {
    LIB_ACTIVITE: string;
    // Ajoutez d'autres propriétés selon les données reçues de l'API
}

function HomeCamping() {
    const [userPhoto, setUserPhoto] = useState(defaultProfilePic);
    const [planning, setPlanning] = useState<PlanningEvent[]>([]); // Utilisation de l'interface PlanningEvent
    const [selectedDate, setSelectedDate] = useState(new Date()); // Date sélectionnée
    const [showPlanning, setShowPlanning] = useState(false); // Ajouté pour le contrôle d'affichage du planning

    useEffect(() => {
        // Charger les informations de l'utilisateur (logique à implémenter)
    }, []);

    useEffect(() => {
        loadPlanning();
    }, [selectedDate]);

    const getWeekStartAndEnd = (date: Date) => {
      let startDate = new Date(date);
      let endDate = new Date(date);

      // Début de la semaine (lundi)
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      // Fin de la semaine (dimanche)
      endDate.setDate(endDate.getDate() - endDate.getDay() + 7);

      return { startDate, endDate };
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
};


//////////// Alimenter le planning Camping ////////////////////////////
const loadPlanning = async () => {
    const { startDate, endDate } = getWeekStartAndEnd(selectedDate);
    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    try {
        const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadPlanningCamping.php?dateDebut=${startDateStr}&dateFin=${endDateStr}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        console.log("Réponse JSON reçue: ", jsonResponse);

        if (jsonResponse.status === 'success') {
            setPlanning(jsonResponse.data);
            console.log("Planning mis à jour: ", jsonResponse.data);
        } else {
            console.error("Erreur dans la réponse du serveur: ", jsonResponse.message);
        }
    } catch (error) {
        console.error("Erreur lors du chargement du planning: ", error);
    }
};

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                {/* Profil et boutons */}
                <TouchableOpacity style={styles.profilePicContainer}>
                    <Image source={userPhoto} style={styles.profilePic} />
                </TouchableOpacity>
                <Text style={styles.text}>Bienvenue dans votre camping!</Text>
                <TouchableOpacity style={styles.button} onPress={() => setShowPlanning(!showPlanning)}>
                    <Text style={styles.buttonText}>Voir planning Camping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Voir activité vacancier</Text>
                </TouchableOpacity>

                {/* Contrôles de date et Planning */}
                <View style={styles.dateControls}>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={selectedDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2020-01-01"
                        maxDate="2025-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date : string) => {
                            setSelectedDate(new Date(date));
                            setShowPlanning(false);
                        }}
                    />
                </View>
                {showPlanning && <WeeklyPlanning planning={planning} />}
            </View>
        </ImageBackground>
    );
}

export default HomeCamping;
