import { useData } from '@/hooks/useData';
import dayjs from 'dayjs';
import dayjs_localeData from 'dayjs/plugin/localeData.js';
import dayjs_localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import {
  default as dayjs_weekday,
  default as weekday,
} from 'dayjs/plugin/weekday';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CalendarDay from './CalendarDay';
import ArrowLeft from './navigation/ArrowLeft';
import ArrowRight from './navigation/ArrowRight';

dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(dayjs_localeData);
dayjs.extend(dayjs_localizedFormat);
dayjs.extend(dayjs_weekday);

console.log(dayjs.locale());

const daysInWeek = 7;
const gap = 12;
const flexBasisValue = `${(100 - gap) / daysInWeek}%`;

interface CalendarProps {
  myTeamId: string;
}

export const Calendar = ({ myTeamId }: CalendarProps): JSX.Element | null => {
  const [currentYear, setCurrentYear] = useState<number>(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month());

  // useReducer

  const { matchData, isLoading, isError } = useData({
    month: currentMonth,
    year: currentYear,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading data...</Text>;
  }

  if (!matchData) {
    return null;
  }

  const currentDate = dayjs().year(currentYear).month(currentMonth);
  const firstDayOfMonth = currentDate.startOf('month');
  const daysInMonth = currentDate.daysInMonth();
  const startingDayOfWeek = firstDayOfMonth.weekday();
  const lastDayOfMonth = currentDate.endOf('month').weekday();

  const generateCalendarDays = () => {
    const days: (number | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    if (lastDayOfMonth < 6) {
      const remainingDays = 6 - lastDayOfMonth;
      for (let i = 0; i < remainingDays; i++) {
        days.push(null);
      }
    }

    return days;
  };

  const weekDays = dayjs.weekdaysShort(true);
  const calendarDays = generateCalendarDays();

  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRowContainer}>
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.arrow}
            onPress={goToPreviousMonth}>
            <ArrowLeft></ArrowLeft>
          </Pressable>
          <Text style={styles.monthYearText}>
            {currentDate.format('MMMM YYYY')}
          </Text>
          <Pressable
            style={styles.arrow}
            onPress={goToNextMonth}>
            <ArrowRight></ArrowRight>
          </Pressable>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <View style={styles.weekdayHeader}>
          {weekDays.map((day) => (
            <View
              key={day}
              style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => {
            return (
              <CalendarDay
                key={index}
                daysArrItem={day}
                displayedMonth={currentMonth}
                displayedYear={currentYear}
                matchData={matchData}
                myTeamId={myTeamId}></CalendarDay>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#041025',
  },
  headerRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  },
  activeIcon: {
    backgroundColor: '#49A2E2',
  },
  arrow: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'center',
    color: '#95C9EE',
  },
  calendarContainer: {
    overflow: 'hidden',
  },
  weekdayHeader: {
    flexDirection: 'row',
    paddingVertical: 14,
    gap: 2,
  },
  weekdayCell: {
    flexGrow: 1,
    flexBasis: flexBasisValue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayText: {
    fontWeight: 400,
    color: '#95C9EE',
    fontSize: 16,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
});
