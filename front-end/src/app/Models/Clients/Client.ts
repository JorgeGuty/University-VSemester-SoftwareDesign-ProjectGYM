import User from "../Users/User";

export interface Client extends User {
  name?: string;
  email?: string;
  phone?: string;
  identification?: string;
  balance?: number;
  membershipNumber?: number;
}

export default Client;
