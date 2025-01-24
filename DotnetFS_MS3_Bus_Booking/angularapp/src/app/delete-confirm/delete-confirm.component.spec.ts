import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeleteConfirmComponent } from './delete-confirm.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BusService } from '../services/bus.service'; // Adjusted service name

describe('DeleteConfirmComponent', () => {
    let component: DeleteConfirmComponent;
    let fixture: ComponentFixture<DeleteConfirmComponent>;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let mockBusService: jasmine.SpyObj<BusService>; // Adjusted service name

    beforeEach(waitForAsync(() => {
        mockBusService = jasmine.createSpyObj<BusService>('BusService', ['getBus', 'deleteBus'] as any); // Adjusted service name and methods

        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule, FormsModule, HttpClientTestingModule],
            declarations: [DeleteConfirmComponent],
            providers: [
                { provide: BusService, useValue: mockBusService } // Adjusted service name
            ]
        }).compileComponents();
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('should_create_DeleteConfirmComponent', () => {
        expect(component).toBeTruthy();
    });

    fit('DeleteConfirmComponent_should_call_deleteBus_method_when_confirmDelete_is_called', () => {
        const bookingId = 1; // Adjusted ID name
        
        mockBusService['deleteBus'].and.returnValue(of(null)); // Adjusted method name

        component['confirmDelete'](bookingId); // Adjusted parameter name

        expect(mockBusService['deleteBus']).toHaveBeenCalledWith(bookingId); // Adjusted method name and parameter
    });
});
