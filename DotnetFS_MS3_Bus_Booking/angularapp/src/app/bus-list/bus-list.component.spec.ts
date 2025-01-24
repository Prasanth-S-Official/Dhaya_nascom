import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BusListComponent } from './bus-list.component';
import { BusService } from '../services/bus.service';

describe('BusListComponent', () => {
    let component: BusListComponent;
    let fixture: ComponentFixture<BusListComponent>;
    let mockBusService: jasmine.SpyObj<BusService>;
    beforeEach(waitForAsync(() => {
        mockBusService = jasmine.createSpyObj<BusService>('BusService', ['getBuses', 'deleteBus'] as any);

        TestBed.configureTestingModule({
            declarations: [BusListComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [{ provide: BusService, useValue: mockBusService }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BusListComponent);
        component = fixture.componentInstance;
    });

    fit('should_create_BusListComponent', () => {
        expect(component).toBeTruthy();
    });

    fit('BusListComponent_should_call_loadBuses_on_ngOnInit', () => {
        spyOn((component as any), 'loadBuses');
        fixture.detectChanges();
        expect((component as any).loadBuses).toHaveBeenCalled();
    });

});
