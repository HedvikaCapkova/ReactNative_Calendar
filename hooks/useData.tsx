import { ApiMatchData } from '@/constants/types';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface useDataProps {
  month: number;
  year: number;
  setMatchData: React.Dispatch<React.SetStateAction<ApiMatchData[] | null>>;
}

export function useData({ month, year, setMatchData }: useDataProps) {
  useEffect(() => {
    const fetchMatchData = async (): Promise<void> => {
      const [finishedData, futureData] = await Promise.all([
        fetch(
          'https://hcsparta.tpapp.cz/match/list/finished/?teamId=MUZ&year=2025'
        )
          .then((response) => (response.ok ? response.json() : []))
          .catch(() => []),
        fetch(
          'https://hcsparta.tpapp.cz/match/list/future/?teamId=MUZ&year=2025&includeLive=true'
        )
          .then((response) => (response.ok ? response.json() : []))
          .catch(() => []),
        ,
      ]);

      if (!finishedData.length && !futureData.length) {
        return;
      }

      const matchData: ApiMatchData[] = [...finishedData, ...futureData];

      const filteredMatchData = matchData.filter((match) => {
        const matchDate = dayjs(match.matchDate);
        return matchDate.month() === month && matchDate.year() === year;
      });

      setMatchData(filteredMatchData);
    };
    fetchMatchData();
  }, [month, year]);
}
