export type ApiMatchData = {
  homeTeamId: string;
  awayTeamId: string;
  homeTeamScore?: number;
  awayTeamScore?: number;
  matchDate: string;
  isFinished: boolean;
  homeTeam: {
    id: string;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: string;
    name: string;
    logo: string;
  };
};

export type MatchLocation = 'home' | 'away' | null;
