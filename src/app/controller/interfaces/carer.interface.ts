export interface Carer {
  carerId?: number;
  name: string;
  uid?: string;
  surname: string;
  email: string;
  password: string;
}

export interface Auth {
  username: string;
  password: string;
}
