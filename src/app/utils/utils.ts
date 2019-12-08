import { Note } from '../types/note.interface';

export function isObjectEmpty(obj): boolean {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function formatTempString(temp: number): string {
  return Math.round(temp) + String.fromCharCode(176) + 'C';
}

export function convertPayloadToNotes(actions) {
  return actions.map(action => {
    const data = action.payload.doc.data();
    const id = action.payload.doc.id;
    return { id, ...data } as Note;
  });
}

export function transformTagsToArray(note: Note): Note {
  if (note && !Array.isArray(note.tags)) {
    const array = [];
    if (note.tags) {
      const keys = Object.keys(note.tags);
      const values = Object.values(note.tags);
      values.forEach((value, index) => value && array.push(keys[index]));
    }
    note.tags = [...array];
  }
  return note;
}
