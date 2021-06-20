import React, {useRef} from 'react';
import {View, Animated} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//props gồm edit, delete, children
const SwipeCustom = props => {
  const swipeCustom = useRef(null);
  const renderRightActions = progress => (
    <View
      style={{
        marginVertical: 5,
        marginRight: 3,
        width: 128,
        flexDirection: 'row',
      }}>
      {renderRightAction('edit', props.edit, '#0066ff', 128, progress)}
      {renderRightAction('trash', props.delete, '#dd2c00', 64, progress)}
    </View>
  );

  const renderRightAction = (icon, press, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      close();
      press();
    };
    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [{translateX: 0}],
          marginHorizontal: 2,
        }}>
        <RectButton
          style={{
            backgroundColor: '#fff',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
          onPress={pressHandler}>
          <FontAwesome5 name={icon} size={30} color={color} />
        </RectButton>
      </Animated.View>
    );
  };

  const close = () => {
    swipeCustom.current.close();
  };
  return (
    <Swipeable
      ref={swipeCustom}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      {props.children}
    </Swipeable>
  );
};

export default SwipeCustom;
