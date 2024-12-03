export type UserRole = 'farmer' | 'bank' | 'insurance';

export function isLoggedIn(): boolean {
  return sessionStorage.getItem('isLoggedIn') === 'true';
}

export function login(): void {
  sessionStorage.setItem('isLoggedIn', 'true');
}

export function logout(): void {
  sessionStorage.removeItem('isLoggedIn');
}

export function getUserRole(email: string): UserRole | null {
  if (email.includes('@farmer.com')) return 'farmer';
  if (email.endsWith('@bank.com')) return 'bank';
  if (email.endsWith('@insurance.com')) return 'insurance';
  return null;
}

export function getRedirectPath(email: string): string {
  const role = getUserRole(email);
  switch (role) {
    case 'farmer':
      return '/';
    case 'bank':
      return '/bank/dashboard';
    case 'insurance':
      return '/insurance/dashboard';
    default:
      return '/';
  }
}