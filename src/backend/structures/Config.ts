/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */


export interface Emojis {
  reply: string;
  right_skip: string;
  left_skip: string;
  right_arrow: string;
  left_arrow: string;
}
export interface Links {
  github: string;
  discord: string;
  other: string[];
}

export interface Config {
  prefix?: string
  developers?: string[];
  testServers?: string[];
  emojis: Emojis;
  links?: Links;
}
