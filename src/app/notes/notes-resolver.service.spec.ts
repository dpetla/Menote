import { TestBed } from '@angular/core/testing';

import { NotesResolverService } from './notes-resolver.service';

describe('NotesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesResolverService = TestBed.get(NotesResolverService);
    expect(service).toBeTruthy();
  });
});
