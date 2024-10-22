import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from '/Volumes/DEV/React_Native/new_test_app/components/Calendar';

export default function Index() {
  const MY_TEAM_ID = 'SPA';

  return (
    <View style={styles.container}>
      <StatusBar style='auto'></StatusBar>
      <Text>fgsgsdgdsgds</Text>
      <Calendar
        year={2024}
        month={10}
        myTeamId={MY_TEAM_ID}></Calendar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
