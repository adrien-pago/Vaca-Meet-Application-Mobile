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

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },

  datePickerText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#007bff',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  datesLabel: {
    textAlign: 'center',
    fontSize: 17,
    marginVertical: 10,
    fontWeight: '500',
    color: '#555',
  },

  activityContainer: {
    marginVertical: 7,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  activityText: {
    fontSize: 15,
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
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20, // Rend le texte légèrement plus grand pour le titre
    fontWeight: 'bold', // Ajoute du poids au texte pour le titre
  },

  picker: {
    width: '100%', // Utilisez 100% de la largeur pour le rendre responsive
    height: 50,
    marginVertical: 10, // Ajoute un espacement vertical
  },

  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
    fontWeight: 'bold',
},

// Ajustez le style des boutons pour qu'ils correspondent à la largeur des champs de formulaire
button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10, // Ajout d'un espacement vertical
    width: '100%', // Assurez-vous que les boutons occupent la largeur
},

buttonText: {
    color: '#ffffff',
    fontSize: 18,
},

// Ajoutez ou ajustez vos styles ici
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 10,
},



input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#007bff', // Ajoute de la couleur à la bordure
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f8f9fa', // Couleur de fond pour distinguer les champs
    width: '100%', // Assurez-vous que l'input occupe la largeur complète
},

});

export default styles;
