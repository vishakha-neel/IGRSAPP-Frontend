// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//     container: {
//       padding: 16,
//     },
//     heading: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginBottom: 16,
//     },
//     input: {
//       borderColor: '#ccc',
//       borderWidth: 1,
//       padding: 8,
//       marginBottom: 12,
//     },
//     picker: {
//       height: 50,
//       borderWidth: 1,
//       borderColor: '#ccc',
//       marginBottom: 16,
//     },
//     label: {
//       fontWeight: 'bold',
//       marginBottom: 5,
//     },
//   });

// export default styles;
  

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',  // Set background to white
  },
  heading: {
    fontSize: 24,  // Increased font size for better visibility
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',  // Dark text for better contrast
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',  // Light background for input
    borderRadius: 5,  // Rounded corners for the input fields
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 5,  // Rounded corners for picker
    backgroundColor: '#f9f9f9',  // Light background for picker
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',  // Dark text for label visibility
  },
});

export default styles;