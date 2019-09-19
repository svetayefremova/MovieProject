import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { commonStyles, ThemeContext, themes } from "../../theme";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    padding: 16,
  },
});

interface ErrorContainerProps {
  message: string;
  onRefresh?: () => void;
}

const ErrorContainer = (props: ErrorContainerProps) => (
  <ThemeContext.Consumer>
    {(theme: string) => (
      <View style={commonStyles(themes[theme]).mainContainer}>
        <Text style={[styles.text, { color: themes[theme].primaryText }]}>
          {props.message}
        </Text>
        {props.onRefresh ? (
          <TouchableOpacity onPress={props.onRefresh}>
            <Text style={[styles.text, { color: themes[theme].highlight }]}>
              Try again
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    )}
  </ThemeContext.Consumer>
);

export default ErrorContainer;
