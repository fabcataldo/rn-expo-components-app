/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

//en la vida real ojo con usar el dark o light color
//en la app, se puede usar este hook de expo, o dejar que labure nativewind
//o usar ambas a la vez, como acá
//el tema es que puede suceder que la reacción de la app al cambio de dark o light
//puede no ser a las mismas velocidades
//pero por razón de esta app, se van a usar ambas opciones, para sólo probar
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
