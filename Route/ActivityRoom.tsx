import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Button, TextInput, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import styles from '../Styles/ActivityRoomStyles';

const backgroundImage = { uri: "https://vaca-meet.fr/ASSET/vaca_meet_fond_2.png" };

type ActivityEvent = {
    LIB_ACTIVITE: string;
    NOM: string;
    NB_PLACE: number;
    HEURE_DEBUT: string;
    HEURE_FIN: string;
    DISPLAY_TIME?: string;
};

type NomActivite = {
    id: string;
    nom: string;
};

type ActivityRoomProps = {
    route: RouteProp<RootStackParamList, 'ActivityRoom'>;
};

const ActivityRoom: React.FC<ActivityRoomProps> = ({ route }) => {
    const { idCamping } = route.params;
    const [activities, setActivities] = useState<ActivityEvent[]>([]);
    const [nomActivites, setNomActivites] = useState<NomActivite[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<string>('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [nbPlace, setNbPlace] = useState<string>('');
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    useEffect(() => {
        loadActivities(selectedDate);
        fetchNomActivites();
    }, [selectedDate, idCamping]);

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
                    DISPLAY_TIME: `De ${new Date(activity.HEURE_DEBUT).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit'})}h à ${new Date(activity.HEURE_FIN).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit'})}h`
                }));
                setActivities(formattedActivities);
            } else {
                console.error("Erreur dans la réponse du serveur: ", data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des activités: ", error);
        }
    };

    const fetchNomActivites = async () => {
        try {
            const response = await fetch(`https://vaca-meet.fr/PHP_APPLICATION_MOBILE/NomActivityCombo.php?idCamping=${idCamping}`);
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            const activites: NomActivite[] = await response.json();
            setNomActivites(activites);
            if (activites.length > 0) {
                setSelectedActivity(activites[0].id);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des noms d'activités", error);
        }
    };

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setSelectedDate(new Date(selectedDate.setHours(0, 0, 0, 0)));
            setShowDatePicker(false);
        }
    };

    const onChangeStartTime = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setStartTime(selectedDate);
        }
        setShowStartTimePicker(false);
    };

    const onChangeEndTime = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setEndTime(selectedDate);
        }
        setShowEndTimePicker(false);
    };

    const submitActivity = async () => {
        // Implémentez votre logique d'envoi ici
        console.log("Activité soumise :", { selectedActivity, startTime, endTime, nbPlace });
        setModalVisible(false);
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <ScrollView style={styles.container}>
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
                <Text style={styles.header}>Activités proposées par les vacanciers</Text>
                <Text style={styles.datesLabel}>
                    {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                    <Text style={styles.buttonText}>Proposer une activité</Text>
                </TouchableOpacity>
                {activities.map((activity, index) => (
                    <View key={index} style={styles.activityContainer}>
                        <Text style={styles.activityText}>
                            {activity.LIB_ACTIVITE} Proposé par : {activity.NOM} {"\n"}Places restantes : {activity.NB_PLACE}{"\n"}
                            {activity.DISPLAY_TIME}
                        </Text>
                    </View>
                ))}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Proposer une activité</Text>
                        <Picker
                            selectedValue={selectedActivity}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedActivity(itemValue.toString())}>
                            {nomActivites.map((activite) => (
                                <Picker.Item key={activite.id} label={activite.nom} value={activite.id} />
                            ))}
                        </Picker>
                        <Text style={styles.label}>Date et heure début :</Text>
                        <DateTimePicker
                            value={startTime}
                            mode="datetime"
                            display="default"
                            onChange={onChangeStartTime}
                        />
                        <Text style={styles.label}>Date et heure fin :</Text>
                        <DateTimePicker
                            value={endTime}
                            mode="datetime"
                            display="default"
                            onChange={onChangeEndTime}
                        />
                        <TextInput
                            placeholder="Nombre de places"
                            keyboardType="numeric"
                            onChangeText={setNbPlace}
                            value={nbPlace}
                            style={styles.input}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Button title="Valider" onPress={submitActivity} ></Button>
                            <Button title="Annuler" onPress={() => setModalVisible(false)} ></Button>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </ImageBackground>
    );
};

export default ActivityRoom;
