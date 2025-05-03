// meal planning
export type MealPlanning = {
  recipeId: number;
  date: string;
  title: string;
  mealType: string;
};
// user profile data
export type UpdateProfileForm = {
  username?: string;
  id?: number;
  email?: string;
  file?: File[];
  userPoints?: number;
  image?: string;
};

// use password form
export type UpdatePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};
export type UserData = {
  id: number;
  email: string;
  username: string;
  image: string;
  password: string;
  confirmPassword: string;
  userPoints: string;
};
