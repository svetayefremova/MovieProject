import React from "react";
import { ActivityIndicator, View } from "react-native";

import { commonStyles, ThemeContext, themes } from "../../theme";

interface LoaderProps {
  customStyles?: any;
}

const Loader = (props: LoaderProps) => (
  <ThemeContext.Consumer>
    {(theme: string) => (
      <View
        style={
          props.customStyles
            ? props.customStyles
            : commonStyles(themes[theme]).centerContainer
        }
      >
        <ActivityIndicator size="large" />
      </View>
    )}
  </ThemeContext.Consumer>
);

export default Loader;
