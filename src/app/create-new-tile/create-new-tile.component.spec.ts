import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTileComponent } from './create-new-tile.component';

describe('CreateNewTileComponent', () => {
  let component: CreateNewTileComponent;
  let fixture: ComponentFixture<CreateNewTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
