import { Note } from '../types/note.interface';

export function isObjectEmpty(obj): boolean {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

// TODO: convert to pipe
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
