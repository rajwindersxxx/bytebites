// meal planning
export type MealPlanning ={
  recipeId: number;
  date: string;
  title: string;
  mealType: string;
}
// user profile data
export type UpdateProfileForm = {
  username: string;
  id: number;
  email: string;
  file: File[];
}

// use password form
export type UpdatePasswordForm ={
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}
