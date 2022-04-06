export interface Links {
    github: string;
    discord: string;
    other: string[]
}

export interface Config {
    developers?: string[];
    testServers?: string[];
    links?: Links
}