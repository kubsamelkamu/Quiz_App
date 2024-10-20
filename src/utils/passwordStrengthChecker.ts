export const passwordStrengthChecker = (password: string) => {
    let strength = 0;
    if (password.length > 8) strength += 1;
  
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  
    if (strength === 0 || strength === 1) return "Weak";
    if (strength === 2) return "Medium";
    if (strength >= 3) return "Strong";
  
    return "Weak"; 
  };
  