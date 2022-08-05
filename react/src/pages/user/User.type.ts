export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin?: Date;
  role: UserRole;
}

export const userClass: User = {
  id: "",
  name: "",
  role: "USER",
  email: "",
};
