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

export type ScoreData = {
  homeTeamScore?: number;
  awayTeamScore?: number;
  isFinished: boolean;
};

export enum ResultFlagsTrl {
  win = 'V',
  loss = 'P',
  draw = 'R',
}

export enum LocationTrl {
  home = 'DOMA',
  away = 'VENKU',
}

export enum MatchLocation {
  home = 'home',
  away = 'away',
}

export type MatchDayData = {
  location: MatchLocation;
  trl: {
    location: LocationTrl;
  };
  logo: string;
  myTeamScore?: number;
  opponentTeamScore?: number;
};

export enum WeekdaysTrl {
  monday = 'PO',
  tuesday = 'ÚT',
  wednesday = 'ST',
  thursday = 'ČT',
  friday = 'PÁ',
  saturday = 'SO',
  sunday = 'NE',
}
