/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Azalea
 * Github: https://github.com/Saigeie/
 * 2022
 */

export interface Links {
  github: string;
  discord: string;
  other: string[];
}

export interface Config {
  prefix?: string
  developers?: string[];
  testServers?: string[];
  links?: Links;
}
