import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("screen")

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    backgroundColor: '#2E4A66',
  },
  brain: {
    width: 124,
    height: 124,
    zIndex: 2,
  },
  form: {
    width: '100%',
    minHeight: '50%',
    paddingHorizontal: 16,
    gap: 20,
    position: 'relative',
    zIndex: 30,
    marginTop: 30,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2E4A66',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  whiteText: {
    fontSize: 20,
    color: '#fff',
    position: 'relative',
    zIndex: 10,
  },
  BG: {
    maxWidth: '100%',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    // objectFit: 'contain',
    maxHeight: '70%',

  },
  whiteButton: {
    width: width - 32,
    height: 45,
    borderRadius: 6,
    // backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    zIndex: 2,
    marginHorizontal: 16
  },
  greyText: {
    fontSize: 16,
    color: '#FFF'
  },
  errorText: {
    fontWeight: 400,
    fontSize: 12,
    color: '#F0142F',
    marginTop: -8
  }
})
