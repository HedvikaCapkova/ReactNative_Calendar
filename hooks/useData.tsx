import { ApiMatchData } from '@/constants/types';
import dayjs from 'dayjs';
import useSWR from 'swr';

interface useDataProps {
  month: number;
  year: number;
}

export function useData({ month, year }: useDataProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: finishedData, error: finishedError } = useSWR(
    'https://hcsparta.tpapp.cz/match/list/finished/?teamId=MUZ&year=2025',
    fetcher
  );

  const { data: futureData, error: futureError } = useSWR(
    'https://hcsparta.tpapp.cz/match/list/future/?teamId=MUZ&year=2025&includeLive=true',
    fetcher
  );

  const isLoading = !finishedData && !futureData;
  const isError = finishedError || futureError;

  let filteredMatchData: ApiMatchData[] = [];

  if (finishedData && futureData) {
    const matchData: ApiMatchData[] = [...finishedData, ...futureData];

    filteredMatchData = matchData.filter((match) => {
      const matchDate = dayjs(match.matchDate);
      return matchDate.month() === month && matchDate.year() === year;
    });
  }

  return {
    matchData: filteredMatchData,
    isLoading,
    isError,
  };
}
