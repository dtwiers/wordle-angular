export enum MatchType {
  None = 0,
  Partial = 1,
  Full = 2,
}
export type MatchResponseCharacter = {
  attempt: string;
  matchType: MatchType;
};

export type MatchResponse = MatchResponseCharacter[];



export type Game = MatchResponse[];