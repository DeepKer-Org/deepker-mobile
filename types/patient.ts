export interface Patient {
    dni: string;
    name: string;
    location: string;
    finalDiagnosis?: string;
    associatedDoctors?: string[];
}