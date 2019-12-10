export interface CurrencyManagerConfigDisk {
  [key: string]: {
    driver: string;
    [key: string]: unknown;
  };
}

export interface CurrencyManagerConfigConfig {
  /**
   * The default disk returned by `disk()`.
   */
  default?: string;
  disks?: CurrencyManagerConfigDisk;
}
