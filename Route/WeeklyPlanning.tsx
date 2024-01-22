import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; 
import { PlanningEvent } from './types';
import styles from '../Styles/WeeklyPlanningStyles';

type ViewPlanningCampingProps = {
    route: RouteProp<RootStackParamList, 'ViewPlanningCamping'>;
    planning?: { [key: string]: PlanningEvent[] };
};

const WeeklyPlanning: React.FC<ViewPlanningCampingProps> = ({ route }) => {
    const { planning } = route.params;
    const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    {weekDays.map((day) => (
                        <Text key={day} style={styles.tableHeader}>{day}</Text>
                    ))}
                </View>

                {/* Affichage des événements pour chaque jour */}
                <View style={styles.tableRow}>
                    {weekDays.map((day) => (
                        <View key={day} style={styles.tableColumn}>
                            {planning[day]?.map((event: PlanningEvent, index: number) => (
                                <Text key={index} style={styles.eventText}>
                                    {event.LIB_ACTIVITE}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

export default WeeklyPlanning;