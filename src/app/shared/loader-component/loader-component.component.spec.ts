import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponentComponent } from './loader-component.component';

describe('LoaderComponentComponent', () => {
  let component: LoaderComponentComponent;
  let fixture: ComponentFixture<LoaderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
