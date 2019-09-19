import axios from "axios";
import moment from "moment";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API_KEY } from "react-native-dotenv";
import { NavigationParams, NavigationScreenProps } from "react-navigation";

import { Button, ErrorContainer, Loader } from "../../components";
import { API } from "../../config";
import { commonStyles, fonts, ThemeContext, themes } from "../../theme";
import { Movie } from "../../types";

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 2,
    marginBottom: 4,
    borderRadius: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  sectionRow: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    fontSize: fonts.fontSizeSmall,
  },
  link: {
    fontSize: fonts.fontSizeSmall,
  },
  sectionTitle: {
    paddingBottom: 4,
  },
  data: {
    flex: 2,
    fontSize: fonts.fontSizeSmall,
  },
  button: {
    flex: 2,
  },
  image: {
    width: 230,
    height: 345,
    alignSelf: "center",
  },
});

const themeStyles = (theme: any) => ({
  text: {
    color: theme.secondaryText,
  },
  data: {
    color: theme.primaryText,
  },
  section: {
    backgroundColor: theme.primaryBackground,
  },
  link: {
    color: theme.highlight,
  },
});

interface DetailsStateProps {
  movie: Movie | undefined;
  isLoading: boolean;
  error: string;
}

class Details extends React.Component<NavigationScreenProps, {}> {
  public state: DetailsStateProps = {
    movie: undefined,
    isLoading: false,
    error: "",
  };

  public async componentDidMount() {
    await this.fetchDetails();
  }

  private async fetchDetails() {
    const { params }: NavigationParams = this.props.navigation.state;

    this.setState({
      isLoading: true,
      error: "",
    });

    try {
      const { data } = await axios.get(`${API.movie}${params.id}`, {
        params: {
          api_key: API_KEY,
        },
      });
      this.setState({ movie: data });
    } catch (e) {
      this.setState({ error: e.message || "Oops, something went wrong" });
      throw new Error(e.message);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  private onPressLink = (link: string) => {
    Linking.openURL(link);
  };

  public render() {
    const { movie, isLoading, error } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return (
        <ErrorContainer
          message={this.state.error}
          onRefresh={() => this.fetchDetails()}
        />
      );
    }

    return movie ? (
      <ThemeContext.Consumer>
        {(theme: string) => (
          <ScrollView style={commonStyles(themes[theme]).mainContainer}>
            <View style={[styles.section, themeStyles(themes[theme]).section]}>
              <Image
                source={{ uri: `${API.image}${movie.poster_path}` }}
                style={styles.image}
              />
            </View>
            <View style={[styles.section, themeStyles(themes[theme]).section]}>
              <Text
                style={[styles.sectionTitle, themeStyles(themes[theme]).data]}
              >
                DETAILS
              </Text>
              <View style={styles.sectionRow}>
                <Text style={[styles.text, themeStyles(themes[theme]).text]}>
                  Title
                </Text>
                <Text
                  style={[
                    styles.data,
                    styles.title,
                    themeStyles(themes[theme]).data,
                  ]}
                >
                  {movie.title}
                </Text>
              </View>
              <View style={styles.sectionRow}>
                <Text style={[styles.text, themeStyles(themes[theme]).text]}>
                  Description
                </Text>
                <Text style={[styles.data, themeStyles(themes[theme]).data]}>
                  {movie.overview}
                </Text>
              </View>
              <View style={styles.sectionRow}>
                <Text style={[styles.text, themeStyles(themes[theme]).text]}>
                  Homepage
                </Text>
                <View style={styles.button}>
                  <Button
                    onPress={() => this.onPressLink(movie.homepage)}
                    title={movie.homepage}
                  />
                </View>
              </View>
              <View style={styles.sectionRow}>
                <Text style={[styles.text, themeStyles(themes[theme]).text]}>
                  Release date
                </Text>
                <Text style={[styles.data, themeStyles(themes[theme]).data]}>
                  {moment(movie.release_date).format("DD MMM YYYY")}
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </ThemeContext.Consumer>
    ) : (
      <View />
    );
  }
}

export default Details;
