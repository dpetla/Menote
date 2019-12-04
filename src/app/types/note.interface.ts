export interface Note {
  id?: string;
  uid: string;
  title: string;
  content: string;
  dateCreated: Date;
  dateUpdated: Date;
  location: string;
  weather: string;
  mood: string;
  tags: any;
  images: any;
}
