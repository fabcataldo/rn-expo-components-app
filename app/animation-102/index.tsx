import { useAnimation } from '@/hooks/useAnimation';
import ThemedView from '@/presentation/shared/ThemedView';
import { Animated } from 'react-native';

const Animation102Screen = () => {
  const { panAnimationResponder, panAnimation } = useAnimation();

  return (
    <ThemedView margin className='justify-center items-center flex-1'>
      <Animated.View
        {...panAnimationResponder.panHandlers}
        style={[panAnimation.getLayout()]}
        className="w-36 h-36 bg-blue-500 rounded-md"
      />
    </ThemedView>

  );
};
export default Animation102Screen;
