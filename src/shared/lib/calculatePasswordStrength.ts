export const calculatePasswordStrength = (password: string) => {
  if (!password) {
    return 'none';
  }

  const score = [
    password.length >= 6,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[!-/:-@[-`{-~]/.test(password),
  ].filter(Boolean).length;

  return score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong';
};
