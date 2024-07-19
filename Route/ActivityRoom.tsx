import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RouteProp } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import styles from '../Styles/ActivityRoomStyles';

// variable pour les activités
type ActivityEvent = {
    LIBELLE_EVENT_ROOM: string;
    NOM: string;
    NB_VACA: number;
    DATE_TIME_EVENT: Date;
    id_room_event: number;
    STATUT_VOTE: string;
};

type ActivityRoomProps = {
    route: RouteProp<RootStackParamList, 'ActivityRoom'>;
};

const ActivityRoom: React.FC<ActivityRoomProps> = ({ route }) => {
    const { idCamping, userId } = route.params;
    const [activities, setActivities] = useState<ActivityEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formDateTime, setFormDateTime] = useState('');
    const [formLibelle, setFormLibelle] = useState('');
    const [modalDate, setModalDate] = useState(new Date()); // Date spécifique à la modal

    useEffect(() => {
        loadActivities(selectedDate);
    }, [selectedDate, idCamping]);

    useFocusEffect(
        React.useCallback(() => {
            loadActivities(selectedDate);
        }, [selectedDate, idCamping])
    );

    // Charger les activités en fonction du jour choisi
    const loadActivities = async (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        try {
            const response = await fetch(`https://adrien-pago-portfolio.fr/PHP_APPLICATION_MOBILE/LoadActivityRoom.php?idCamping=${idCamping}&date=${dateStr}&userId=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Data received:', data); 
            if (data.status === 'success') {
                const formattedActivities: ActivityEvent[] = data.data.map((activity: ActivityEvent) => ({
                    ...activity,
                    DATE_TIME_EVENT: new Date(activity.DATE_TIME_EVENT),
                }));
                setActivities(formattedActivities);
            } else {
                console.error("Erreur dans la réponse du serveur: ", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des activités: ", error);
        }
    };

    // Met à jour la date dans la modal sans appeler loadActivities
    const onChangeDateInModal = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setModalDate(selectedDate);
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const formattedTime = selectedTime.toTimeString().slice(0, 5); // Format HH:MM
            setFormDateTime(`${formattedDate} ${formattedTime}`);
            setShowDatePicker(false);
        }
    };

    // Met à jour l'heure dans la modal sans appeler loadActivities
    const onChangeTimeInModal = (event: DateTimePickerEvent, selectedTime: Date | undefined) => {
        if (selectedTime) {
            setSelectedTime(selectedTime);
            const formattedTime = selectedTime.toTimeString().slice(0, 5); // Format HH:MM
            const formattedDate = modalDate.toISOString().split('T')[0];
            setFormDateTime(`${formattedDate} ${formattedTime}`);
            setShowTimePicker(false);
        }
    };

    // Insert en base de données une nouvelle activité
    const handleAddActivity = async () => {
        if (!formDateTime || !formLibelle) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        const formData = new FormData();
        formData.append('id_vaca_init', `${userId}`);
        formData.append('id_camping', `${idCamping}`);
        formData.append('date_time_event', formDateTime);
        formData.append('libelle', formLibelle);

        try {
            const response = await fetch('https://adrien-pago-portfolio.fr/PHP_APPLICATION_MOBILE/InsertActivityRoom.php', {
                method: 'POST',
                body: formData,
            });
            const jsonResponse = await response.json();
            if (jsonResponse.status === 'success') {
                alert('Activité ajoutée avec succès');
                setIsModalVisible(false);
                loadActivities(selectedDate); // Recharge les activités avec la date actuelle
            } else {
                alert(`Erreur lors de l'ajout de l'activité: ${jsonResponse.message}`);
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête: ', error);
            alert('Erreur lors de l\'ajout de l\'activité');
        }
    };

    // Gérer les votes de participation des vacanciers sur l'activité
    const handleInterest = async (activityId: number) => {
        try {
            const response = await fetch('https://adrien-pago-portfolio.fr/PHP_APPLICATION_MOBILE/UpdateVoteCount.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    activityId: activityId,
                }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                const updatedActivities = activities.map(activity => {
                    if (activity.id_room_event === activityId) {
                        return {
                            ...activity,
                            NB_VACA: data.data.NB_VACA_JOIN,
                            STATUT_VOTE: data.data.STATUT_VOTE,
                        };
                    }
                    return activity;
                });
                setActivities(updatedActivities);
            } else {
                console.error("Erreur lors de la mise à jour du nombre de votes: ", data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du nombre de votes: ', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.buttonText}>Proposer une activité</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.datePickerText}>Choisir une date pour voir les activités</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={(event, date) => {
                            if (date) {
                                setSelectedDate(date);
                            }
                            setShowDatePicker(false);
                        }}
                    />
                )}
            </View>
            <Text style={styles.dateLibelle}>
                    Activités du {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </Text>
            {activities.map((activity) => (
                <View key={activity.id_room_event} style={styles.activityContainer}>
                    <Text style={styles.activityText}>
                        {activity.LIBELLE_EVENT_ROOM}
                        {"\n"}Proposé par : {activity.NOM}
                        {"\n"}Date et Heure : {activity.DATE_TIME_EVENT.toLocaleString('fr-FR')}
                        {"\n"}Nombre de participants : {activity.NB_VACA}
                    </Text>
                    <View style={styles.detailContainer}>
                        <TouchableOpacity onPress={() => handleInterest(activity.id_room_event)}>
                            <Text style={styles.buttonText}>
                                {activity.STATUT_VOTE === 'upvote' ? 'Je ne veux plus participer' : 'Je veux participer'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalView}>
                    <View style={styles.modalCard}>
                        <TextInput
                            style={styles.input}
                            placeholder="Libelle"
                            onChangeText={setFormLibelle}
                            value={formLibelle}
                            maxLength={250}
                        />
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.datePickerText}>Choisir une date</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={modalDate}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDateInModal}
                            />
                        )}
                        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                            <Text style={styles.datePickerText}>Choisir une heure</Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={selectedTime}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={onChangeTimeInModal}
                            />
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder="Date et Heure (YYYY-MM-DD HH:MM)"
                            value={formDateTime}
                            editable={false}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleAddActivity}>
                            <Text style={styles.buttonText}>Ajouter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.buttonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default ActivityRoom;
