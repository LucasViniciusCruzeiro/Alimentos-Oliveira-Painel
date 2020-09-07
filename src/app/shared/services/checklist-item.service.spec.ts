import { TestBed } from '@angular/core/testing';

import { CheckListItemService } from './checklist-item.service';


describe('CheckListItems', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckListItemService = TestBed.get(CheckListItemService);
    expect(service).toBeTruthy();
  });
});
