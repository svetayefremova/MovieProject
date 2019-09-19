import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AnimatedItem } from "../../components";
import { API } from "../../config";
import { fonts, ThemeContext, themes } from "../../theme";
import { Movie } from "../../types";

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 2,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemCol: {
    flex: 1,
  },
  title: {
    paddingBottom: 8,
  },
  text: {
    fontSize: fonts.fontSizeSmall,
  },
  image: {
    width: 150,
    height: 150,
  },
});

interface MovieItemProps {
  movie: Movie;
  index: number;
  onGoToDetails: (id: string) => void;
}

const MovieItem = (props: MovieItemProps) => {
  return (
    <AnimatedItem index={props.index}>
      <ThemeContext.Consumer>
        {(theme: string) => (
          <TouchableOpacity
            style={[
              styles.item,
              { backgroundColor: themes[theme].primaryBackground },
            ]}
            onPress={() => props.onGoToDetails(props.movie.id)}
          >
            <View style={styles.itemContainer}>
              <View style={styles.itemCol}>
                <Image
                  source={{ uri: `${API.image}${props.movie.backdrop_path}` }}
                  style={styles.image}
                />
              </View>
              <View style={styles.itemCol}>
                <Text
                  style={[styles.title, { color: themes[theme].primaryText }]}
                >
                  {props.movie.title}
                </Text>
                <Text
                  style={[styles.text, { color: themes[theme].secondaryText }]}
                >
                  {moment(props.movie.release_date).format("DD MMM YYYY")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ThemeContext.Consumer>
    </AnimatedItem>
  );
};

export default MovieItem;
