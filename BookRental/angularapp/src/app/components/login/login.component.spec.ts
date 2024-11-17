import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

class MockAuthService {
  login(request: any) {
    return of({ token: 'dummyToken', role: 'Employee', id: '1', userName: 'John Doe' });
  }
  setUserInfo(userData: any) { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [ { provide: AuthService, useClass: MockAuthService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_login_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_check_if_the_Login_word_exists_in_login_component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Login');
  });

  fit('Frontend_should_check_if_the_Email_input_field_exists_login_component', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    expect(emailInput).toBeTruthy();
  });

  fit('Frontend_should_display_validation_message_on_clicking_the_login_button_login_component', () => {
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[placeholder="Password"]')).nativeElement;
    emailInput.value = '';
    passwordInput.value = '';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const loginButton = fixture.debugElement.queryAll(By.css('button')).find(button => button.nativeElement.textContent.trim() === 'Login').nativeElement;
    loginButton.click();
    fixture.detectChanges();

    const pageContent = fixture.debugElement.nativeElement.textContent;
    expect(pageContent).toContain('Email is required');
  });
});
