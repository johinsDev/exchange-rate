export interface CurrencyManagerConfigDisk {
  [key: string]: {
    driver: string;
    [key: string]: unknown;
  };
}

export interface CurrencyManagerConfig {
  default?: string;
  defaultCurrency?: string;
  disks?: CurrencyManagerConfigDisk;
}
