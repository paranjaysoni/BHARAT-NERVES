export interface CurrentUser {
  name: string;
  role: string;
  organization: string;
}

export const currentUser: CurrentUser = {
  name: "National Operations Commander",
  role: "Administrator",
  organization: "Bharat Nerves Platform"
};
