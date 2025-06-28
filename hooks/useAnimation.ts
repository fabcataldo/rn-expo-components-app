import { useRef } from "react";
import { Animated, Easing, PanResponder } from "react-native";

export const useAnimation = () => {
    //for animation-101 screen
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    const animatedTop = useRef(new Animated.Value(0)).current;

    const fadeIn = ({
        duration = 300,
        toValue = 1,
        useNativeDriver = true,
        easing = Easing.linear,
        callback = () => { }
    }) => {
        Animated.timing(animatedOpacity, {
            toValue,
            duration,
            useNativeDriver,
            easing
        }).start(callback);
    }

    const fadeOut = ({
        duration = 300,
        toValue = 0,
        useNativeDriver = true,
        easing = Easing.ease,
        callback = () => { }
    }) => {
        Animated.timing(animatedOpacity, {
            toValue,
            duration,
            useNativeDriver,
            easing
        }).start(callback);
        // () => animatedTop.setValue(-100)
    }

    const startMovingTopPosition = ({
        initialPosition = -100,
        duration = 300,
        toValue = 0,
        useNativeDriver = true,
        easing = Easing.ease,
        callback = () => { }
    }) => {
        animatedTop.setValue(initialPosition);

        Animated.timing(animatedTop, {
            toValue,
            duration,
            useNativeDriver,
            easing
        }).start(callback);
    }

    //for animation-102 screen
    const panAnimation = useRef(new Animated.ValueXY()).current;
    const panAnimationResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {
                dx: panAnimation.x, // x,y are Animated.Value
                dy: panAnimation.y,
            },
        ], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            Animated.spring(
                panAnimation, // Auto-multiplexed
                { toValue: { x: 0, y: 0 }, useNativeDriver: false }, // Back to zero
            ).start();
        },
    });

    return {
        animatedTop,
        animatedOpacity,

        fadeIn,
        fadeOut,
        startMovingTopPosition,

        panAnimationResponder,
        panAnimation
    }
}
