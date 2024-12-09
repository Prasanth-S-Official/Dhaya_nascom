import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/models/trainer.model';

@Component({
  selector: 'app-trainer-management',
  templateUrl: './trainer-management.component.html',
  styleUrls: ['./trainer-management.component.css']
})
export class TrainerManagementComponent implements OnInit {
  trainerForm: FormGroup;
  successPopup = false;
  fileError = '';
  resumeBase64 = '';
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private trainerService: TrainerService
  ) {
    this.trainerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      expertise: ['', Validators.required],
      experience: ['', Validators.required], // Marked as required
      certification: ['', Validators.required], // Marked as required
      joiningDate: ['', Validators.required],
      status: ['Active'],
      resume: [''], // Base64 string
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchTrainer(this.id);
    }
  }

  fetchTrainer(id: number): void {
    this.trainerService.getTrainerById(id).subscribe(
      (response) => {
        this.trainerForm.patchValue(response);
        this.resumeBase64 = response.resume || '';
      },
      () => this.router.navigate(['/error'])
    );
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        this.fileError = 'Invalid file type. Only PDF, DOC, and DOCX are allowed.';
        this.resumeBase64 = '';
        return;
      }

      this.convertFileToBase64(file).then(
        (base64String) => {
          this.resumeBase64 = base64String;
          this.trainerForm.patchValue({
            resume: base64String,
          });
          this.fileError = '';
        },
        (error) => {
          console.error('Error converting file to base64:', error);
          this.fileError = 'Error processing the file.';
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
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
    if (this.trainerForm.valid) {
      const formData = { ...this.trainerForm.value, resume: this.resumeBase64 };

      if (this.id) {
        this.trainerService.updateTrainer(this.id, formData).subscribe(
          () => this.showSuccessPopup(),
          (error) => console.error('Error updating trainer:', error)
        );
      } else {
        this.trainerService.addTrainer(formData).subscribe(
          () => this.showSuccessPopup(),
          (error) => console.error('Error adding trainer:', error)
        );
      }
    }
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/coordinator/view/trainers']);
  }

  navigateBack(): void {
    this.router.navigate(['/coordinator/view/trainers']);
  }
}
