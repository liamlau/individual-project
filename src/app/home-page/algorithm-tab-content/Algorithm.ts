export interface Algorithm {
    id: string;
    name: string;
    orientation: string;
    algorithm: string;
    description: string;
    helpTextMap: Object; // map<number, string>
}