// src/styles/commonStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../constants/theme';

export const commonStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Theme.colors.whiteBlue,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Theme.padding.horizontal * 2,
  },
  logoHeader: {
    fontFamily: Theme.fonts.logo,
    color: Theme.colors.black,
    fontSize: 32,
    marginBottom: Theme.margin.vertical * 4,
    textAlign: "center",
  },
  h1: {
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.black,
    fontSize: 32,
  },
  h2: {
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.black,
    fontSize: 24,
  },
  h3: {
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.black,
    fontSize: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: Theme.margin.vertical * 6,
  },
  inputs: {
    marginVertical: Theme.margin.vertical,
  },
  image: {
    width: 64,
    height: 94,
    resizeMode: "contain",
    marginHorizontal: "auto",
    marginBottom: Theme.margin.vertical,
  },
  recoverContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Theme.margin.vertical,
    marginTop: Theme.margin.vertical * 2,
  },
  recoverText: {
    marginLeft: 8,
    fontFamily: Theme.fonts.semibold,
  },
  small: {
    fontFamily: Theme.fonts.regular,
  },
  errorText: {
    color: Theme.colors.red,
    fontSize: 24,
    textAlign: "center",
    marginTop: Theme.margin.vertical,
  },
  p: {
    color: Theme.colors.gray,
    fontSize: 20,
    fontFamily: Theme.fonts.regular,
} 
});
