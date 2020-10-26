declare module '@mauriciorobayo/pyptron' {
  interface BaseMap {
    key: string;
    name: string;
  }

  interface CategoryMap extends BaseMap {
    emoji: string;
  }

  interface CityMap extends BaseMap {
    categories: Record<string, CategoryMap>;
  }

  interface CityDataOptions {
    category: string;
    date?: Date;
    days?: number;
  }

  interface Message {
    message: string;
    url: string;
  }

  interface Link {
    name: string;
    url: string;
  }

  interface HourData {
    comment: string;
    hours: [string, string][];
    days: number[];
  }

  interface PypData {
    date: string;
    exceptions: string;
    excludedDays: number[];
    hours: HourData[];
    maps: Link[];
    observations: string;
    scheme: number;
    skipHolidays: boolean;
    numbers: number[];
    vehicleClasses: string[];
  }

  interface CategoryData {
    emoji: string;
    key: string;
    messages: Message[];
    name: string;
    decrees: Link[];
    path: string;
    data: PypData[];
  }

  interface CityData {
    name: string;
    messages: Message[];
    path: string;
    categories: Record<string, CategoryData>;
  }

  export function getCitiesMap(): Record<string, CityMap>;
  export function getCityData(city: string, options: CityDataOptions): CityData;
}
