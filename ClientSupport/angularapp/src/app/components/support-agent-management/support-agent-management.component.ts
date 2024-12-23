import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportAgentService } from 'src/app/services/support-agent.service';
import { SupportAgent } from 'src/app/models/support-agent.model';

@Component({
  selector: 'app-support-agent-management',
  templateUrl: './support-agent-management.component.html',
  styleUrls: ['./support-agent-management.component.css']
})
export class SupportAgentManagementComponent implements OnInit {
  agentForm: FormGroup;
  successPopup = false;
  fileError = '';
  profileBase64 = '';
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private agentService: SupportAgentService
  ) {
    this.agentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      expertise: ['', Validators.required],
      experience: ['', Validators.required],
      shiftTiming: ['', Validators.required],
      remarks: [''],
      profile: [''], // Base64 string for profile
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchAgent(this.id);
    }
  }

  fetchAgent(id: number): void {
    this.agentService.getAgentById(id).subscribe(
      (response) => {
        this.agentForm.patchValue(response);
        this.profileBase64 = response.profile || '';
      },
      () => this.router.navigate(['/error'])
    );
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.fileError = 'Invalid file type. Only JPG, JPEG, and PNG are allowed.';
        this.profileBase64 = '';
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB max size
      if (file.size > maxSizeInBytes) {
        this.fileError = 'File size exceeds the maximum limit of 5MB.';
        this.profileBase64 = '';
        return;
      }

      this.convertImageToBase64(file).then(
        (base64String) => {
          this.profileBase64 = base64String;
          this.agentForm.patchValue({ profile: base64String });
          this.fileError = '';
        },
        (error) => {
          console.error('Error converting image to Base64:', error);
          this.fileError = 'Error processing the image.';
        }
      );
    }
  }

  convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const formData: SupportAgent = {
        ...this.agentForm.value,
        profile: this.profileBase64,
        status: 'Available', // Default status
      };

      if (this.id) {
        this.agentService.updateAgent(this.id, formData).subscribe(
          () => this.showSuccessPopup(),
          (error) => console.error('Error updating agent:', error)
        );
      } else {
        this.agentService.addAgent(formData).subscribe(
          () => this.showSuccessPopup(),
          (error) => console.error('Error adding agent:', error)
        );
      }
    }
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/manager/view/agents']);
  }

  navigateBack(): void {
    this.router.navigate(['/manager/view/agents']);
  }
}
