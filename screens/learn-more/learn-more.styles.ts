import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get("screen")

export const learnMoreStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e2e7f3',
    justifyContent: 'space-between'
  },
  header: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: 10,
    padding: 16,
    position: 'fixed',
    zIndex: 2
  },
  headerTitle: {
    fontSize: 20,
    color: '#2E4A66',
    fontWeight: 900
  },
  content: {
    width: '100%',
    flex: 1,
    padding: 16,
    paddingTop: 20,
  },
  imageWrapper: {
    width: '100%',
    height: height * 0.6 - 100,
    alignItems: 'center'
  },
  image: {
    height:  width * 0.6,
    maxWidth: width * 0.6,
    alignSelf: 'center',
    marginVertical: 20
  },
  whatIs: {
    fontSize: 32,
    fontWeight: 900,
    color: '#2E4A66',
    marginBottom: 8
  },
  whatIsHighlighted: {
    color: '#bca5ec'
  },
  occupation: {
    fontSize: 16,
    color: '#6d6f74',
    marginBottom: 6
  },
  tabSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: '#6d6f7420',
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    color: '#2E4A66',
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 30
  },
  butttonNext: {
    backgroundColor: '#2E4A66',
    padding: 12,
    borderRadius: 8
  },
  butttonNextText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 700
  },
  butttonPrev: {
    backgroundColor: '#ffffff00',
    padding: 12,
    borderRadius: 8
  },
  buttonPrevText: {
    fontSize: 16,
    color: '#2E4A66',
    fontWeight: 700
  }
})
