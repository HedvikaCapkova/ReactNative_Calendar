import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function UseFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BlinkerBlack: require('../assets/fonts/Blinker-Black.ttf'),
        BlinkerBold: require('../assets/fonts/Blinker-Bold.ttf'),
        BlinkerExtraBold: require('../assets/fonts/Blinker-ExtraBold.ttf'),
        BlinkerExtraLight: require('../assets/fonts/Blinker-ExtraLight.ttf'),
        BlinkerLight: require('../assets/fonts/Blinker-Light.ttf'),
        BlinkerRegular: require('../assets/fonts/Blinker-Regular.ttf'),
        BlinkerSemiBold: require('../assets/fonts/Blinker-SemiBold.ttf'),
        BlinkerThin: require('../assets/fonts/Blinker-Thin.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
