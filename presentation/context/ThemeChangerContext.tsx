import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface ThemeChangerContextType {
    currentTheme: 'light' | 'dark';
    isSystemTheme: boolean;
    toggleTheme: () => void;
    setSystemTheme: () => void;
    bgColor: string;
}

const ThemeChangerContext = createContext<ThemeChangerContextType>({} as ThemeChangerContextType);

// custom hook para acceder al themechangercontext
export const useThemeChangerContext = () => {
    const themeChanger = useContext(ThemeChangerContext);
    return themeChanger;
}


// provider
export const ThemeChangerProvider = ({children}: PropsWithChildren) => {
    const { colorScheme, setColorScheme } = useColorScheme();

    const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
    const [isSystemThemeEnabled, setIsSystemThemeEnabled] = useState(true);

    const currentTheme = isSystemThemeEnabled
        ? colorScheme
        : (isDarkMode) ? 'dark' : 'light';
    
    const backgroundColor = isDarkMode
        ? Colors.dark.background
        : Colors.light.background;

    useEffect(() => {
        AsyncStorage.getItem('selected-theme').then( (theme) => {
            if(!theme) return;

            setIsDarkMode(theme === 'dark');
            setIsSystemThemeEnabled(theme === 'system');

            //TODO: refactor/mejora
            setColorScheme(theme as 'light'|'dark'|'system');
        });
    }, [])
    

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ThemeChangerContext.Provider
                value={{
                    currentTheme: currentTheme ?? 'light',
                    isSystemTheme: isSystemThemeEnabled,
                    bgColor: backgroundColor,
                    toggleTheme: async() => { 
                        setIsDarkMode(!isDarkMode);
                        setColorScheme(isDarkMode ? 'light' : 'dark');
                        setIsSystemThemeEnabled(false);

                        await AsyncStorage.setItem('selected-theme', isDarkMode ? 'light' : 'dark');
                    },
                    setSystemTheme: async() => {
                        setIsSystemThemeEnabled(true);
                        setColorScheme('system');
                        await AsyncStorage.setItem('selected-theme', 'system');
                    }
                }}
            >
                {children}
            </ThemeChangerContext.Provider>
        </ThemeProvider>
    )
}