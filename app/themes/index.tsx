import { useThemeChangerContext } from '@/presentation/context/ThemeChangerContext';
import ThemedCard from '@/presentation/shared/ThemedCard';
import ThemedSwitch from '@/presentation/shared/ThemedSwitch';
import ThemedView from '@/presentation/shared/ThemedView';
import { useState } from 'react';
// import { useColorScheme } from 'react-native';

const ThemesScreen = () => {
  //antes todo esto se proveía sólo desde el componente, es decir
  //esta pantalla cambiaba el "color" (dark o light mode)
  //ahora, va a ser a nivel del context, para no solo dejar al usuario
  //por medio de esta pantalla setear el tema, si no también, guardarlo
  //para el futuro, a nivel de persistencia
  // const theme = useColorScheme();
  // const { colorScheme, setColorScheme } = useColorScheme();
  // const [darkModeSettings, setDarkModeSettings] = useState({
  //   darkMode: colorScheme === 'dark',
  //   systemMode: false
  // });

  // const setDarkMode = (value: boolean) => {
  //   setColorScheme(value ? 'dark' : 'light');
  //   setDarkModeSettings({
  //     darkMode: value,
  //     systemMode: false
  //   });
  // }
  
  // const setSystemMode = (value: boolean) => {
  //   setDarkModeSettings({
  //     darkMode: darkModeSettings.darkMode,
  //     systemMode: value
  //   });
  // }

  const { toggleTheme, currentTheme, setSystemTheme, isSystemTheme } = useThemeChangerContext();
  const [darkModeSettings, setDarkModeSettings] = useState({
    darkMode: currentTheme === 'dark',
    systemMode: isSystemTheme
  });

  const setDarkMode = (value: boolean) => {
    toggleTheme();
    setDarkModeSettings({
      darkMode: value,
      systemMode: false
    });
  }

  const setSystemMode = (value: boolean) => {
    if(value){
      setSystemTheme();
    }

    setDarkModeSettings({
      darkMode: darkModeSettings.darkMode,
      systemMode: value
    });
  }

  return (
    <ThemedView margin>
      <ThemedCard className='mt-5'>
        <ThemedSwitch
          text='Dark Mode'
          className='mb-5'
          value={darkModeSettings.darkMode}
          onValueChange={setDarkMode}       
          />

        <ThemedSwitch
          text='System Mode'
          value={darkModeSettings.systemMode}
          onValueChange={setSystemMode}
        />
      </ThemedCard>
    </ThemedView>
  );
};
export default ThemesScreen;
