export interface Note {
  id?: string;
  uid: string;
  title: string;
  content: string;
  dateCreated: { seconds: number; nanoseconds: number };
  dateUpdated: { seconds: number; nanoseconds: number };
  location: string;
  weather: string;
  mood: string;
  tags: string[];
  images: any;
}
