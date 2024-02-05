import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },

    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#333', // Couleur pour le titre
    },
    datePickerText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#007bff', // Une couleur bleue plus vive
        padding: 12,
        backgroundColor: '#f8f9fa', // Un fond léger pour le sélecteur de date
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2, // Ombre pour Android
        shadowColor: '#000', // Ombre pour iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    datesLabel: {
        textAlign: 'center',
        fontSize: 17,
        marginVertical: 10,
        fontWeight: '500',
        color: '#555', // Couleur du texte
    },
    dayContainer: {
        marginVertical: 7,
        backgroundColor: '#f8f9fa', // Fond pour chaque jour
        borderRadius: 10,
        padding: 10,
        elevation: 3, // Ombre pour Android
        shadowColor: '#000', // Ombre pour iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    dayTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#444', // Couleur pour le titre du jour
    },
    eventContainer: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginVertical: 6,
        elevation: 2, // Ombre pour Android
        shadowColor: '#000', // Ombre pour iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    eventText: {
        fontSize: 15,
    },
});
