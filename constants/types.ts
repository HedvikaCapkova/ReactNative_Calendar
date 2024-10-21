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

export enum ResultFlags {
  win = 'V',
  loss = 'P',
  draw = 'R',
}

export enum LocationTrans {
  home = 'DOMA',
  away = 'VENKU',
}

export enum MatchLocation {
  home = 'home',
  away = 'away',
}

export type MatchDayData = {
  location: MatchLocation;
  trans: {
    location: LocationTrans;
  };
  logo: string;
  myTeamScore?: number;
  opponentTeamScore?: number;
};
