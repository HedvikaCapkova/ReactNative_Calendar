import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApiMatchData, MatchLocation } from '../constants/types';

const gap = 12;
const daysInWeek = 7;
const flexBasisValue = `${(100 - gap) / daysInWeek}%`;

enum resultFlags {
  win = 'V',
  loss = 'P',
  draw = 'R',
}

enum locations {
  home = 'DOMA',
  away = 'VENKU',
}

interface CalendarDayProps {
  calendarDay: number | null;
  currentDate: any;
  matchData: ApiMatchData[];
}

export default function CalendarDay({
  calendarDay,
  currentDate,
  matchData,
}: CalendarDayProps) {
  // const fontsLoaded = UseFonts();

  // console.log(fontsLoaded);

  // if (!fontsLoaded) {
  //   return null;
  // }

  const [matchLocation, setMatchLocation] = useState<MatchLocation>(null);

  const getMatchDate = (matchDate: string) => {
    return new Date(matchDate).getUTCDate() === calendarDay;
  };

  useEffect(() => {
    const determineMatchLocation = () => {
      if (!matchData) return;

      const match = matchData.find((matchItem) =>
        getMatchDate(matchItem.matchDate)
      );
      if (match) {
        if (match.homeTeamId === 'SLA') {
          setMatchLocation('home');
        } else if (match.awayTeamId === 'SLA') {
          setMatchLocation('away');
        }
      }
    };

    determineMatchLocation();
  }, [matchData, calendarDay]);

  const getMatchLocationText = () => {
    let locationText = '';
    return matchLocation === 'home'
      ? (locationText = locations.home)
      : matchLocation === 'away'
      ? (locationText = locations.away)
      : null;
  };

  const getLogo = (match: ApiMatchData) => {
    return matchLocation === 'home'
      ? match.awayTeam.logo
      : matchLocation === 'away'
      ? match.homeTeam.logo
      : null;
  };

  const getFinishedMatchResult = (match: ApiMatchData) => {
    if (!(match.isFinished && match.homeTeamScore && match.awayTeamScore)) {
      return null;
    }

    const myTeamScore =
      matchLocation === 'home' ? match.homeTeamScore : match.awayTeamScore;
    const opponentScore =
      matchLocation === 'home' ? match.awayTeamScore : match.homeTeamScore;

    let resultFlag = ' ';

    if (myTeamScore > opponentScore) {
      resultFlag = resultFlags.win;
    } else if (myTeamScore < opponentScore) {
      resultFlag = resultFlags.loss;
    } else {
      resultFlag = resultFlags.draw;
    }

    return `${resultFlag} ${match.homeTeamScore} : ${match.awayTeamScore}`;
  };

  return (
    <View
      style={[
        styles.dayCell,
        !calendarDay && styles.emptyCell,
        matchLocation ? styles.dayCellMatch : null,
      ]}>
      <View
        style={[
          styles.dayHeader,
          matchLocation === 'home'
            ? styles.homeMatchStyle
            : matchLocation === 'away'
            ? styles.awayMatchStyle
            : styles.dayHeaderNumber,
        ]}>
        <Text
          style={[
            styles.dayNumber,
            calendarDay === currentDate.date() && styles.currentDay,
            matchLocation ? styles.dayNumberWithMatch : null,
          ]}>
          {calendarDay !== null ? calendarDay : ''}
        </Text>
        <Text style={styles.matchLocationText}>{getMatchLocationText()}</Text>
      </View>

      {matchData
        ?.filter((matchItem) => getMatchDate(matchItem.matchDate))
        .map((match, index) => {
          return (
            <React.Fragment key={index}>
              <View style={styles.teamLogo}>
                <Image
                  source={getLogo(match)}
                  style={styles.logoImage}
                />
              </View>
              <Text style={styles.score}>{getFinishedMatchResult(match)}</Text>
            </React.Fragment>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  dayCell: {
    // flexBasis: 'calc(calc(100% - 12px) / 7)' as any,
    // fontFamily: 'BlinkerRegular',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: flexBasisValue,
    flexGrow: 1,
    aspectRatio: 0.5,
    backgroundColor: '#112342',
    color: '#D1E0FA',
    minHeight: 80,
  },

  dayCellMatch: {
    backgroundColor: '#20375E',
  },

  dayHeader: {
    // fontFamily: 'BlinkerRegular',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    color: '#D1E0FA',
    backgroundColor: '#112342',
    paddingTop: 6,
    paddingBottom: 2,
    paddingHorizontal: 3,
  },

  dayHeaderNumber: {
    // fontFamily: 'BlinkerBold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  dayNumber: {
    // fontFamily: 'BlinkerBold',
    color: '#D1E0FA',
    fontWeight: 700,
    fontSize: 12,
    textAlign: 'center',
  },

  matchLocationText: {
    // fontFamily: 'BlinkerRegular',
    color: '#fff',
    fontWeight: 400,
    fontSize: 9,
    textAlign: 'center',
  },

  homeMatchStyle: {
    backgroundColor: '#112342',
  },

  awayMatchStyle: {
    backgroundColor: '#49A2E2',
  },

  teamLogo: {
    alignItems: 'center',
    paddingTop: 3,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  score: {
    // fontFamily: 'BlinkerRegular',
    color: '#D1E0FA',
    fontSize: 12,
    fontWeight: 400,
    paddingBottom: 5,
  },

  dayNumberWithMatch: {
    // fontFamily: 'BlinkerBold',
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
  },

  currentDay: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  emptyCell: {
    backgroundColor: '#041025',
    opacity: 0,
  },
});
