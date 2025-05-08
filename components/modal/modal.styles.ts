import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    position: 'fixed'
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: '#4b4f59',
    marginBottom: 10
  },
  close: {
    position: "absolute",
    top: 20,
    right: 20
  }
})
