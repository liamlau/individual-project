export interface Algorithm {
    id: string;
    name: string;
    orientation: Array<string>;
    algorithm: string;
    description: string;
    helpTextMap: Object; // map<number, string>
}