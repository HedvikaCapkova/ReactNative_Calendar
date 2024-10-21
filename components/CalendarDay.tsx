import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ApiMatchData,
  LocationTrans,
  MatchDayData,
  MatchLocation,
  ResultFlags,
} from '../constants/types';

const gap = 12;
const daysInWeek = 7;
const flexBasisValue = `${(100 - gap) / daysInWeek}%`;

const MY_TEAM_ID = 'SLA';

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

  const [matchDayData, setMatchDayData] = useState<MatchDayData | null>(null);

  const getMatchDate = (matchDate: string) => {
    return new Date(matchDate).getUTCDate() === calendarDay;
  };

  useEffect(() => {
    const determineMatchLocation = () => {
      if (!matchData) return null;

      const match = matchData.find((matchItem) =>
        getMatchDate(matchItem.matchDate)
      );
      if (
        !(
          match &&
          (match.homeTeamId === MY_TEAM_ID || match.awayTeamId === MY_TEAM_ID)
        )
      )
        return null;
      if (match.homeTeamId === MY_TEAM_ID) {
        setMatchDayData({
          location: MatchLocation.home,
          trans: {
            location: LocationTrans.home,
          },
          logo: match.awayTeam.logo,
          myTeamScore: match.homeTeamScore,
          opponentTeamScore: match.awayTeamScore,
        });
      } else {
        setMatchDayData({
          location: MatchLocation.away,
          trans: {
            location: LocationTrans.away,
          },
          logo: match.homeTeam.logo,
          myTeamScore: match.awayTeamScore,
          opponentTeamScore: match.homeTeamScore,
        });
      }
    };

    determineMatchLocation();
  }, [matchData, calendarDay]);

  const getResultFlag = (myTeamScore: number, opponentTeamScore: number) => {
    if (myTeamScore > opponentTeamScore) {
      return ResultFlags.win;
    } else if (myTeamScore < opponentTeamScore) {
      return ResultFlags.loss;
    }
    return ResultFlags.draw;
  };

  // vytvorit subtyp pro match
  const getFinishedMatchResult = (match: ApiMatchData) => {
    if (
      !(
        match.isFinished &&
        match.homeTeamScore &&
        match.awayTeamScore &&
        matchDayData?.myTeamScore &&
        matchDayData?.opponentTeamScore
      )
    ) {
      return null;
    }

    return `${getResultFlag(
      matchDayData.myTeamScore,
      matchDayData.opponentTeamScore
    )} ${match.homeTeamScore} : ${match.awayTeamScore}`;
  };

  return (
    <View
      style={[
        styles.dayCell,
        !calendarDay && styles.emptyCell,
        matchDayData ? styles.dayCellMatch : null,
      ]}>
      <View
        style={[
          styles.dayHeader,
          matchDayData?.location === MatchLocation.home
            ? styles.homeMatchStyle
            : matchDayData?.location === MatchLocation.away
            ? styles.awayMatchStyle
            : styles.dayHeaderNumber,
        ]}>
        <Text
          style={[
            styles.dayNumber,
            calendarDay === currentDate.date() && styles.currentDay,
            matchDayData ? styles.dayNumberWithMatch : null,
          ]}>
          {calendarDay !== null ? calendarDay : ''}
        </Text>
        <Text style={styles.matchLocationText}>
          {matchDayData?.trans.location}
        </Text>
      </View>

      {matchData
        ?.filter((matchItem) => getMatchDate(matchItem.matchDate))
        .map((match, index) => {
          return (
            <React.Fragment key={index}>
              <View style={styles.teamLogo}>
                <Image
                  source={matchDayData?.logo}
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
