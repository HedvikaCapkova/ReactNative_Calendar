import { ApiMatchData, WeekdaysTrl } from '@/constants/types';
import { useData } from '@/hooks/useData';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarDay from './CalendarDay';

dayjs.extend(updateLocale);
dayjs.extend(weekday);

dayjs.updateLocale('en', {
  weekStart: 1,
});

const daysInWeek = 7;
const gap = 12;
const flexBasisValue = `${(100 - gap) / daysInWeek}%`;

interface CalendarProps {
  year: number;
  month: number;
  myTeamId: string;
}

export const Calendar = ({
  year,
  month,
  myTeamId,
}: CalendarProps): JSX.Element | null => {
  const [matchData, setMatchData] = useState<ApiMatchData[] | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month());

  useData({ month: currentMonth, year: currentYear, setMatchData });

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

  const weekDays: WeekdaysTrl[] = [
    WeekdaysTrl.monday,
    WeekdaysTrl.tuesday,
    WeekdaysTrl.wednesday,
    WeekdaysTrl.thursday,
    WeekdaysTrl.friday,
    WeekdaysTrl.saturday,
    WeekdaysTrl.sunday,
  ];
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
      <Text style={styles.header}>{currentDate.format('MMMM YYYY')}</Text>
      <TouchableOpacity onPress={goToPreviousMonth}>
        <Text style={styles.text}>BACK</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToNextMonth}>
        <Text style={styles.text}>NEXT</Text>
      </TouchableOpacity>

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
    paddingHorizontal: 24,
    paddingVertical: 19,
  },
  header: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    fontWeight: 400,
    fontSize: 12,
    color: '#fff',
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
