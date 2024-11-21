export interface WiFiScheme {
    wifiSchemeId?: number;
    schemeName: string;
    description: string;
    region: string;
    speed: string;
    dataLimit: string;
    fee: number;
    availabilityStatus: string; // "Available" or "Unavailable"
  }
  