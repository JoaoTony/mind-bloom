import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("screen");

export const homeCategoriesStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 800
  },
  card: {
    width: width / 2 - 16 - 10,
    height: width / 2 - 32 - 10,
    borderRadius: 10,
    backgroundColor: '#613bc0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: '#4b4f59',
    marginBottom: 10
  },

})
