export interface MinVersion {
    major: number;
    minor: number;
    patch: number;
}
export interface MobileCapabilities {
    min_version: MinVersion;
}
export interface Capabilities {
    name: string;
    properlyCityCode: string;
    isInBounds: boolean;
    capability: {
        enabled: boolean;
        supportsEstimate: boolean;
        supportsTourBookings: boolean;
        outsideToronto: boolean;
        phoneLink: string;
        phoneDisplay: string;
    };
}
export declare const getMobileCapabilities: () => Promise<MobileCapabilities>;
export declare const getCapabilitiesByCityCode: ({ properlyCityCode, }: {
    properlyCityCode: string;
}) => Promise<Capabilities>;
export declare const getCapabilitiesByLatLng: ({ lat, lng, }: {
    lat: number;
    lng: number;
}) => Promise<Capabilities>;
