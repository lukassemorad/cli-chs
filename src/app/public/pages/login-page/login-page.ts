import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, HlmButton, HlmInput, HlmLabel, ...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required),
  });

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.auth.login(email ?? '', password ?? '');

    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
    this.router.navigateByUrl(redirectTo ?? '/');
  }
}
