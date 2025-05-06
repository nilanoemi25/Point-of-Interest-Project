export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
  }
  
  export interface Category {
    name: string; 
    _id: string;
  }
  
  export interface POI {
    name:string;
    category: Category | string; 
    description:string;
    latitude: number;
    longitude:number;
    categoryid?: string; 
  }
  
  export interface Db {
    userStore: any;
    candidateStore: any;
    donationStore: any;
  }