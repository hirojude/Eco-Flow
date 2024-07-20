export interface Crop {
    CropId: number;
    name: string;
    localName?: string;
    growthStage: string;
  }
  
  export interface Field {
    name: string;
    sensors: string[];
    crops: Crop[];
  }
  
  export interface UserData {
    fields: Field[];
  }
  