export type User = {
    id: number;
    name?: string;
};

export type ER = {
    id: string;
    name?: string;
    capacity?: number;
    waitTime?: number;
};

export type Patient = {
    PatientName: string;
    SeverityOfIllness: string;
    RelevantInformation: string;
    RoomNumber: number;
    severityRank: number;
    id?: string;
};