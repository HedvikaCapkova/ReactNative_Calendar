import { ApiMatchData } from '@/constants/types';
import { useEffect } from 'react';

export function useData(
  setMatchData: React.Dispatch<React.SetStateAction<ApiMatchData[] | null>>
) {
  useEffect(() => {
    const fetchMatchData = async (): Promise<void> => {
      const [finishedData, futureData] = await Promise.all([
        fetch(
          'https://tp-fan-server.spectado.com/match/list/finished/?teamId=MUZ&year=2025'
        )
          .then((response) => (response.ok ? response.json() : []))
          .catch(() => []),
        fetch(
          'https://tp-fan-server.spectado.com/match/list/future/?teamId=MUZ&year=2025&includeLive=true'
        )
          .then((response) => (response.ok ? response.json() : []))
          .catch(() => []),
        ,
      ]);

      if (!finishedData.length && !futureData.length) {
        return;
      }

      const matchData: ApiMatchData[] = [...finishedData, ...futureData];

      const month = 10 - 1;
      const year = 2024;

      const filteredMatchData = matchData.filter((match) => {
        const matchDate = new Date(match.matchDate);
        return (
          matchDate.getMonth() === month && matchDate.getFullYear() === year
        );
      });

      setMatchData(filteredMatchData);
    };
    fetchMatchData();
  }, []);
}
