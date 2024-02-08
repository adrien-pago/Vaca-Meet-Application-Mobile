import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, ImageBackground,Button  } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import styles from '../Styles/ActivityRoomStyles';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca_meet_fond_2.png" };

type ActivityEvent = {
    LIBELLE_EVENT_ROOM: string;
    NOM: string;
    NB_VACA: number;
    DATE: Date;
    HEURE: string;
    DISPLAY_TIME?: string;
};

type ActivityRoomProps = {
    route: RouteProp<RootStackParamList, 'ActivityRoom'>;
};

const ActivityRoom: React.FC<ActivityRoomProps> = ({ route }) => {
    const { idCamping,userId } = route.params;
    const [activities, setActivities] = useState<ActivityEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formDate, setFormDate] = useState('');
    const [formHeure, setFormHeure] = useState('');
    const [formLibelle, setFormLibelle] = useState('');
   

    useEffect(() => {
        loadActivities(selectedDate);
    }, [selectedDate, idCamping]);

     // Fonction pour récupérer les activités
    const loadActivities = async (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        try {
            const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/LoadActivityRoom.php?idCamping=${idCamping}&date=${dateStr}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.status === 'success') {
                const formattedActivities: ActivityEvent[] = data.data.map((activity: ActivityEvent) => ({
                    ...activity,
                    DATE: new Date(activity.DATE),
                }));
                setActivities(formattedActivities);
            } else {
                console.error("Erreur dans la réponse du serveur: ", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des activités: ", error);
        }
    };


    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setSelectedDate(new Date(selectedDate.setHours(0, 0, 0, 0)));
            setShowDatePicker(false);
        }
    };

    // Fonction pour gérer l'ajout d'une activité
    const handleAddActivity = async () => {
    // Assurez-vous que les informations nécessaires sont présentes
    if (!formDate || !formHeure || !formLibelle ) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Préparation des données à envoyer
    const formData = new FormData();
    formData.append('id_vaca_init', `${userId}`); 
    formData.append('id_camping', `${idCamping}`);
    formData.append('date', formDate);
    formData.append('heure', formHeure);
    formData.append('libelle', formLibelle);
  

    try {
        const response = await fetch('https://vaca-meet.fr/PHP_APPLICATION_MOBILE/InsertActivityRoom.php', {
            method: 'POST',
            body: formData,
        });

        const jsonResponse = await response.json();

        if (jsonResponse.status === 'success') {
            alert('Activité ajoutée avec succès');
            // Fermez la modal et rechargez les activités
            setIsModalVisible(false);
            loadActivities(selectedDate); // Rechargez les activités pour voir la nouvelle activité
        } else {
            alert(`Erreur lors de l'ajout de l'activité: ${jsonResponse.message}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la requête: ', error);
        alert('Erreur lors de l\'ajout de l\'activité');
    }
};

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.buttonText}>Proposer une activité</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}> 
                    <Text style={styles.datePickerText}>Choisir un jour</Text>
                </TouchableOpacity>
                {showDatePicker && ( 
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                <Text style={styles.header}>Activités proposées le {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</Text>
                {activities.map((activity, index) => (
                    <View key={index} style={styles.activityContainer}>
                        <Text style={styles.activityText}>
                            {activity.LIBELLE_EVENT_ROOM} - Proposé par : {activity.NOM}
                            {"\n"}Date: {activity.DATE.toLocaleDateString('fr-FR')}, Heure: {activity.HEURE}
                            {"\n"}Nombre de personnes intéréssés : {activity.NB_VACA}
                        </Text>
                    </View>
                ))}        
                {/* Modal pour ajouter une activité */}
                <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                    <View style={styles.modalView}>
                        <TextInput style={styles.input} placeholder="Libelle" onChangeText={setFormLibelle} value={formLibelle} maxLength={250} />
                        <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" onChangeText={setFormDate} value={formDate} />
                        <TextInput style={styles.input} placeholder="Heure (HH:MM)" onChangeText={setFormHeure} value={formHeure} />
                        <View style={styles.buttonContainer}>
                            <Button title="Annuler" onPress={() => setIsModalVisible(false)} />
                            <Button title="Ajouter" onPress={handleAddActivity} />
                        </View>
                    </View>
                </Modal>
                </ScrollView>
            </ImageBackground>
        );
    };

export default ActivityRoom;