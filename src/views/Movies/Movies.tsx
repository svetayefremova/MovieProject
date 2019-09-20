import axios from "axios";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API_KEY } from "react-native-dotenv";
import { NavigationScreenProps } from "react-navigation";

import { ErrorContainer, Loader } from "../../components";
import { API } from "../../config";
import { commonStyles, ThemeContext, themes } from "../../theme";
import { Movie } from "../../types";
import MovieItem from "./MovieItem";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

interface MoviesStateProps {
  movies: Movie[];
  isLoading: boolean;
  isFetching: boolean;
  error: string;
  page: number;
  totalPages: number | null;
}

class Movies extends React.Component<NavigationScreenProps, {}> {
  public state: MoviesStateProps = {
    movies: [],
    isLoading: false,
    isFetching: false,
    error: "",
    page: 1,
    totalPages: null,
  };

  public async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      await this.fetchMovies();
    } catch (e) {
      throw new Error(e.message);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  private getKey = (item: Movie) => `${item.id}`;

  private async fetchMovies() {
    this.setState({
      isFetching: true,
      error: "",
    });

    try {
      const { data } = await axios.get(API.movies, {
        params: {
          api_key: API_KEY,
          page: this.state.page,
        },
      });
      this.setState({
        movies: [...this.state.movies, ...data.results],
        page: data.page,
        totalPages: data.total_pages,
      });
    } catch (e) {
      this.setState({ error: e.message || "Oops, something went wrong" });
      throw new Error(e.message);
    } finally {
      this.setState({ isFetching: false });
    }
  }

  private fetchMoreMovies = async () => {
    if (this.state.totalPages && this.state.page <= this.state.totalPages) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.fetchMovies();
        },
      );
    }
  };

  private onGoToDetails = (id: string) => {
    this.props.navigation.navigate("Details", { id });
  };

  private renderItem = ({ item, index }: { item: Movie; index: number }) => {
    return (
      <MovieItem
        movie={item}
        index={index}
        onGoToDetails={this.onGoToDetails}
      />
    );
  };

  public render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    if (this.state.error && !this.state.movies.length) {
      return (
        <ErrorContainer
          message={this.state.error}
          onRefresh={() => this.fetchMovies()}
        />
      );
    }

    return (
      <ThemeContext.Consumer>
        {(theme: string) => (
          <View style={commonStyles(themes[theme]).mainContainer}>
            {this.state.movies.length ? (
              <FlatList
                data={this.state.movies}
                keyExtractor={this.getKey}
                renderItem={this.renderItem}
                onEndReached={this.fetchMoreMovies}
                onEndReachedThreshold={0.6}
              />
            ) : (
              <Text style={[styles.text, { color: themes[theme].primaryText }]}>
                No movies
              </Text>
            )}
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Movies;
