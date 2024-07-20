export interface Field {
    crops: any;
    sensors: never[];
    id: string;
    name: string;
  }
  
  export interface Plant {
    name: string;
    image: string;
    growthStage: string;
    progress: number;
  }
  
  export interface Sensor {
    type: 'temperature' | 'humidity' | 'soilMoisture';
    value: number;
  }
  
  export interface IrrigationLog {
    timestamp: string;
    amount: number;
  }
  