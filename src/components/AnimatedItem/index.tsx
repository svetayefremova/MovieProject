import React from "react";
import { Animated } from "react-native";

const ITEMS_PER_PAGE = 20;

interface AnimatedItemProps {
  index: number;
}

interface AnimatedItemStateProps {
  scaleValue: any;
}

class AnimatedItem extends React.Component<AnimatedItemProps> {
  public state: AnimatedItemStateProps = {
    scaleValue: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 600,
      delay: (this.props.index % ITEMS_PER_PAGE) * 100,
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.state.scaleValue }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default AnimatedItem;
