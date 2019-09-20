import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer, NavigationParams } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Button } from "../components";
import { commonStyles, ThemeContext, themes } from "../theme";
import Details from "../views/Details";
import Movies from "../views/Movies";

interface AppStateProps {
  theme: string;
}

const AppContainer = createStackNavigator(
  {
    Movies: {
      screen: Movies,
      navigationOptions: ({ screenProps }: NavigationParams) => {
        const currentTheme = themes[screenProps.theme];

        return {
          headerTitle: "Movies",
          headerStyle: commonStyles(currentTheme).navigationHeader,
          headerTintColor: currentTheme.highlight,
          headerTitleStyle: commonStyles(currentTheme).headerTitleStyle,
          headerRight: (
            <Button
              onPress={() => screenProps.toggleTheme()}
              isIcon
              iconName="theme-light-dark"
            />
          ),
        };
      },
    },
    Details: {
      screen: Details,
      navigationOptions: ({ screenProps }: NavigationParams) => {
        const currentTheme = themes[screenProps.theme];

        return {
          headerTitle: "Details",
          headerStyle: commonStyles(currentTheme).navigationHeader,
          headerTintColor: currentTheme.highlight,
          headerTitleStyle: commonStyles(currentTheme).headerTitleStyle,
        };
      },
    },
  },
  {
    initialRouteName: "Movies",
  },
);

const Navigation = createAppContainer(AppContainer);

class App extends React.Component<{}> {
  public state: AppStateProps = {
    theme: "light",
  };

  private toggleTheme = () => {
    this.setState(({ theme }: { theme: string }) => ({
      theme: theme === "light" ? "dark" : "light",
    }));
  };

  public render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <StatusBar
          barStyle={
            this.state.theme === "light" ? "dark-content" : "light-content"
          }
        />
        <Navigation
          screenProps={{
            theme: this.state.theme,
            toggleTheme: this.toggleTheme,
          }}
        />
      </ThemeContext.Provider>
    );
  }
}

export default App;
