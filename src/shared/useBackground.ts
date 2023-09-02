import {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native-ui-lib';

export const useBackground = () => {
  const [backgroundStyle, setBackgroundStyle] = useState<{
    backgroundColor: any;
  }>({backgroundColor: Colors.white});
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setBackgroundStyle({
      backgroundColor: isDarkMode ? Colors.dark80 : Colors.white,
    });
  }, [isDarkMode]);

  return {backgroundStyle};
};
