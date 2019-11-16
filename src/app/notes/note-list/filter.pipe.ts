import { Pipe, PipeTransform } from '@angular/core';

import { Note } from '../note.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  public transform(notes: Note[], searchTerm: string): any {
    if (!notes) {
      return [];
    } else if (!searchTerm) {
      return notes;
    }

    searchTerm = searchTerm.toLowerCase();
    return notes.filter(note => this.searchMatchesNote(note, searchTerm));
  }

  public searchMatchesNote(note: Note, searchTerm: string): boolean {
    const searchableContent = this.removeHtmlTagsFromString(note.content);
    return (
      this.searchMatchesText(searchableContent, searchTerm) ||
      this.searchMatchesText(note.title, searchTerm) ||
      this.searchMatchesText(note.location, searchTerm) ||
      this.searchMatchesTags(note, searchTerm)
    );
  }

  public removeHtmlTagsFromString(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, '');
  }

  public searchMatchesText(text: string, searchTerm: string): boolean {
    return text.toLowerCase().includes(searchTerm);
  }

  public searchMatchesTags(note: Note, searchTerm: string): boolean {
    return Object.keys(note.tags).some(
      tag => tag.toLowerCase().indexOf(searchTerm) >= 0
    );
  }
}
