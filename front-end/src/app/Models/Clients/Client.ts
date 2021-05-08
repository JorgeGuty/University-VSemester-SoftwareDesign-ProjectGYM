import User from "../Users/User";

export interface Client extends User {
  email?: string;
  phone?: string;
  identification?: string;
  balance?: number;
}

export default Client;
