const styles = (theme: any) => ({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.secondaryBackground,
    paddingVertical: 8,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: theme.secondaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  navigationHeader: {
    borderBottomWidth: 0,
    backgroundColor: theme.headerBackground,
  },
  headerTitleStyle: {
    color: theme.primaryText,
  },
});

export default styles;
