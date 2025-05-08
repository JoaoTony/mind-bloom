import { StyleSheet } from "react-native"

export const homeHeaderSyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginTop: 4
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e2e7f3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  text: {
    color: "#000000"
  },
  textBolder: {
    color: "#000000",
    fontWeight: 800
  }
})
