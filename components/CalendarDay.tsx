import dayjs from 'dayjs';
import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ApiMatchData,
  LocationTrl,
  MatchDayData,
  MatchLocation,
  ResultFlagsTrl,
  ScoreData,
} from '../constants/types';

const gap = 12;
const daysInWeek = 7;
const flexBasisValue = `${(100 - gap) / daysInWeek}%`;

interface CalendarDayProps {
  daysArrItem: number | null;
  displayedMonth: number;
  displayedYear: number;
  matchData: ApiMatchData[];
  myTeamId: string;
}

export default function CalendarDay({
  daysArrItem,
  displayedMonth,
  displayedYear,
  matchData,
  myTeamId,
}: CalendarDayProps) {
  const getMatchDate = (matchDate: string) => {
    const matchDayjs = dayjs(matchDate);
    return (
      matchDayjs.date() === daysArrItem &&
      matchDayjs.month() === displayedMonth &&
      matchDayjs.year() === displayedYear
    );
  };

  const matchDayData = useMemo<MatchDayData | null>(() => {
    if (!matchData || daysArrItem === null) return null;

    const match = matchData.find((matchItem) =>
      getMatchDate(matchItem.matchDate)
    );
    if (
      !(
        match &&
        (match.homeTeamId === myTeamId || match.awayTeamId === myTeamId)
      )
    )
      return null;

    if (match.homeTeamId === myTeamId) {
      return {
        location: MatchLocation.home,
        trl: {
          location: LocationTrl.home,
        },
        logo: match.awayTeam.logo,
        myTeamScore: match.homeTeamScore,
        opponentTeamScore: match.awayTeamScore,
      };
    } else {
      return {
        location: MatchLocation.away,
        trl: {
          location: LocationTrl.away,
        },
        logo: match.homeTeam.logo,
        myTeamScore: match.awayTeamScore,
        opponentTeamScore: match.homeTeamScore,
      };
    }
  }, [matchData, daysArrItem, displayedMonth, displayedYear]);

  const getResultFlag = (myTeamScore: number, opponentTeamScore: number) => {
    if (myTeamScore > opponentTeamScore) {
      return ResultFlagsTrl.win;
    } else if (myTeamScore < opponentTeamScore) {
      return ResultFlagsTrl.loss;
    }
    return ResultFlagsTrl.draw;
  };

  const getFinishedMatchResult = (match: ScoreData) => {
    if (
      !(
        match.isFinished &&
        match.homeTeamScore !== undefined &&
        match.awayTeamScore !== undefined &&
        matchDayData?.myTeamScore !== undefined &&
        matchDayData?.opponentTeamScore !== undefined
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
        !daysArrItem && styles.emptyCell,
        matchDayData ? styles.dayCellMatch : null,
      ]}>
      <View
        style={[
          styles.dayHeader,
          matchDayData?.location === MatchLocation.home
            ? styles.homeMatchHeader
            : matchDayData?.location === MatchLocation.away
            ? styles.awayMatchHeader
            : styles.dayHeaderNumber,
        ]}>
        <Text
          style={[
            styles.dayNumber,
            matchDayData ? styles.dayNumberWithMatch : null,
          ]}>
          {daysArrItem !== null ? daysArrItem : ''}
        </Text>
        <Text style={styles.matchLocationText}>
          {matchDayData?.trl.location}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dayNumber: {
    color: '#D1E0FA',
    fontWeight: 700,
    fontSize: 12,
    textAlign: 'center',
  },
  matchLocationText: {
    color: '#fff',
    fontWeight: 400,
    fontSize: 9,
    textAlign: 'center',
  },
  homeMatchHeader: {
    backgroundColor: '#112342',
  },
  awayMatchHeader: {
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
    color: '#D1E0FA',
    fontSize: 12,
    fontWeight: 400,
    paddingBottom: 5,
  },
  dayNumberWithMatch: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 12,
  },
  emptyCell: {
    backgroundColor: '#041025',
    opacity: 0,
  },
});
