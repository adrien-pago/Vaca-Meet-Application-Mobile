import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },

      container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 20,
      },

    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#333', 
    },

    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },

    datePickerText: {
    color: '#3b82f6',
    borderRadius: 10,
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },

    datesLabel: {
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 10,
        color: '#333', 
        fontWeight: 'bold',
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
