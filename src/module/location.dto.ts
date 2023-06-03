export enum LocationStatusEnum {
    Personal = 'personal', // is only family location, is default value when user creates location
    WaitingPublish = 'waiting_publish', // want to publish to system, if wasn't approved move to Personal, if approved move to Publish
    Published = 'published', // public in system, default value when admin creates location
    Hidden = 'hidden', // hidden in system, do not use for Personal location
}

export interface DangerousLocation {
    id: string;
    name: string;
    description: string;
    long: number;
    lat: number;
    status: LocationStatusEnum;
    createdAt?: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
}

export interface CreateLocaitondto {
    name: string;
    description: string;
    long: number;
    lat: number;
}


export interface QueryLocationDto {
    filter?: string;
    sortField?: string;
    status?: string;
}