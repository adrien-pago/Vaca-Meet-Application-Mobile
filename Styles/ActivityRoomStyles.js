import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        }, 

  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
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
    activityContainer: {
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
    activityText: {
        fontSize: 15,
    },

    button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      margin: 10,
  },
  
  buttonText: {
      color: '#ffffff',
      textAlign: 'center',
  },
  
  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
  },
  
  modalText: {
      marginBottom: 15,
      textAlign: "center"
  },
  
  picker: {
      width: 100,
      height: 50,
  },
  
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },
  
});

export default styles;
