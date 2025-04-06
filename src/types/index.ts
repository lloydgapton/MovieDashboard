export interface Movie {
    id: number;
    title: string;
    year: number;
    genre: string;
    rating: number;
  }
  
  export interface MovieFormData {
    id?: number;
    title: string;
    year: string | number;
    genre: string;
    rating: string | number;
  }
  
  export interface FormErrors {
    title?: string;
    year?: string;
    genre?: string;
    rating?: string;
  }