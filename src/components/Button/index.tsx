import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { fonts, ThemeContext, themes } from "../../theme";

const styles = StyleSheet.create({
  text: {
    fontSize: fonts.fontSizeSmall,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: 8,
  },
});

interface ButtonProps {
  title?: string;
  isIcon?: boolean;
  iconName?: string;
}

const Button = (props: TouchableOpacityProps & ButtonProps) => (
  <ThemeContext.Consumer>
    {(theme: string) => (
      <TouchableOpacity {...props} style={styles.button}>
        {props.isIcon ? (
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name={props.iconName}
              size={fonts.iconSizeBase}
              color={themes[theme].icon}
            />
          </View>
        ) : (
          <Text style={[styles.text, { color: themes[theme].highlight }]}>
            {props.title}
          </Text>
        )}
      </TouchableOpacity>
    )}
  </ThemeContext.Consumer>
);

export default Button;
