import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

@Component({
  selector: 'app-admin-wifi-scheme',
  templateUrl: './admin-wifi-scheme.component.html',
  styleUrls: ['./admin-wifi-scheme.component.css']
})
export class AdminWifiSchemeComponent implements OnInit {
  wifiSchemeForm: FormGroup;
  successPopup = false;
  errorMessage = '';
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private wifiSchemeService: WifiSchemeService
  ) {
    this.wifiSchemeForm = this.fb.group({
      schemeName: ['', Validators.required],
      description: ['', Validators.required],
      region: ['', Validators.required],
      speed: ['', Validators.required],
      dataLimit: ['', Validators.required],
      fee: ['', [Validators.required, Validators.min(0.01)]],
      availabilityStatus: ['Available', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchWiFiScheme(this.id);
    }
  }

  fetchWiFiScheme(id: number): void {
    this.wifiSchemeService.getWiFiSchemeById(id).subscribe(
      (response) => {
        this.wifiSchemeForm.patchValue(response);
      },
      () => {
        this.router.navigate(['/error']);
      }
    );
  }

  onSubmit(): void {
    if (this.wifiSchemeForm.valid) {
      const formData = this.wifiSchemeForm.value;

      const wifiScheme: WifiScheme = {
        ...formData,
        wifiSchemeId: this.id || undefined,
      };

      if (this.id) {
        this.wifiSchemeService.updateWiFiScheme(this.id, wifiScheme).subscribe(
          () => this.showSuccessPopup(),
          () => this.showErrorPopup('Error updating WiFi scheme')
        );
      } else {
        this.wifiSchemeService.addWiFiScheme(wifiScheme).subscribe(
          () => this.showSuccessPopup(),
          () => this.showErrorPopup('Error adding WiFi scheme')
        );
      }
    } else {
      this.errorMessage = 'All fields are required.';
    }
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  showErrorPopup(message: string): void {
    this.errorMessage = message;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.errorMessage = '';
    this.wifiSchemeForm.reset();
    this.router.navigate(['/admin/view/schemes']);
  }

  navigateBack(): void {
    this.router.navigate(['/admin/view/schemes']);
  }
}