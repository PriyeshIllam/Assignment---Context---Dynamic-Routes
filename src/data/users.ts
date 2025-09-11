// Hardcoded list of users
export const users = [
  { username: "anna", name: "Anna Smith", favourites: [] as string[] },
  { username: "john", name: "John Doe", favourites: [] as string[] },
];

// Type definition for a user
export type UserType = {
  username: string;
  name: string;
  favourites: string[];
};
