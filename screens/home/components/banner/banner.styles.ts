import { StyleSheet } from "react-native"

export const homeBannerSyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 188,
    borderRadius: 10,
    backgroundColor: '#2E4A66',
    marginTop: 40,
    position: 'relative',
  },
  text: {
    color: '#fff',
    width: '60%',
    fontSize: 16,
    padding: 12
  },
  image: {
    width: '30%',
    height: '120%',
    marginTop: '-10%',
    borderRadius: 10,
  }

})
