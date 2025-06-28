import { useThemeColor } from '@/hooks/useThemeColor';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends ViewProps {
    className?: string;
    margin?: boolean;
    safe?: boolean;
    bgColor?: string;
}

const ThemedView = ({
    style,
    className,
    margin = false,
    safe = false,
    bgColor,
    children
}: Props) => {
    const backgroundColor = bgColor ?? useThemeColor({}, 'background');
    const safeArea = useSafeAreaInsets();

  return (
    // <View className='bg-light-background dark:bg-dark-background'>
    // usar uno de los 2, en la vida real
    <View style={[
        {
            backgroundColor: backgroundColor,
            flex: 1,
            paddingTop: safe ? safeArea.top : 0,
            marginHorizontal: margin ? 10 : 0
        },
        style
    ]}
     className={className}>
      {children}
    </View>
  )
}

export default ThemedView