import { Calendar } from '@/components/Calendar';
import CalendarIcon from '@/components/navigation/CalendarIcon';
import ListIcon from '@/components/navigation/ListIcon';
import { ViewLayout } from '@/constants/types';
import { useReducer } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export default function Index() {
  const MY_TEAM_ID = 'SPA';

  const initialState = { viewLayout: ViewLayout.calendar };

  const viewLayoutReducer = (
    state: typeof initialState,
    action: { type: string }
  ) => {
    switch (action.type) {
      case ViewLayout.calendar:
        return { ...state, viewLayout: ViewLayout.calendar };
      case ViewLayout.matchList:
        return { ...state, viewLayout: ViewLayout.matchList };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(viewLayoutReducer, initialState);

  // staci useState

  return (
    <View style={styles.container}>
      <View style={styles.iconsRowContainer}>
        <View style={[styles.iconsContainer]}>
          <Pressable
            style={[
              styles.icon,
              state.viewLayout === ViewLayout.calendar && styles.activeIcon,
            ]}
            onPress={() => dispatch({ type: ViewLayout.calendar })}>
            <CalendarIcon></CalendarIcon>
          </Pressable>
          <Pressable
            style={[
              styles.icon,
              state.viewLayout === ViewLayout.matchList && styles.activeIcon,
            ]}
            onPress={() => dispatch({ type: ViewLayout.matchList })}>
            <ListIcon></ListIcon>
          </Pressable>
        </View>
      </View>

      {state.viewLayout === ViewLayout.calendar ? (
        <Calendar myTeamId={MY_TEAM_ID}></Calendar>
      ) : state.viewLayout === ViewLayout.matchList ? (
        <View>List View</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041025',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 19,
  },
  iconsRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#112342',
    width: 84,
    height: 44,
    padding: 2,
    borderRadius: 4,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#112342',
  },
  activeIcon: {
    backgroundColor: '#49A2E2',
  },
});
