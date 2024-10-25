import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { SignupComponent } from './signup.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  // Add this to handle unknown elements

class MockAuthService {
  register(request: any) {
    return of({ success: true });
  }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [ { provide: AuthService, useClass: MockAuthService } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add this line
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_signup_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_Signup_word_exists_in_signup_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Signup');
  });

  fit('Frontend_should_check_if_the_Email_input_field_exists_signup_component', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    expect(emailInput).toBeTruthy();
  });

  fit('Frontend_should_display_validation_message_on_clicking_the_submit_button_signup_component', () => {
    const userNameInput = fixture.debugElement.query(By.css('input[placeholder="UserName"]')).nativeElement;
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    const mobileInput = fixture.debugElement.query(By.css('input[placeholder="Mobile"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[placeholder="Password"]')).nativeElement;
    const confirmPasswordInput = fixture.debugElement.query(By.css('input[placeholder="Confirm Password"]')).nativeElement;

    userNameInput.value = '';
    emailInput.value = '';
    mobileInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    userNameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    mobileInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Change the button text to "Signup" to match the HTML
    const submitButton = fixture.debugElement.queryAll(By.css('button')).find(button => button.nativeElement.textContent.trim() === 'Signup').nativeElement;
    submitButton.click();
    fixture.detectChanges();

    const pageContent = fixture.debugElement.nativeElement.textContent;
    expect(pageContent).toContain('User Name is required');
    expect(pageContent).toContain('Email is required');
    expect(pageContent).toContain('Mobile Number is required');
    expect(pageContent).toContain('Password is required');
    expect(pageContent).toContain('Confirm Password is required');
  });
});
