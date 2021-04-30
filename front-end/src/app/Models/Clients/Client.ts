import User from "../Users/User";

export interface Cliente extends User {
  email?: string;
  phone?: string;
  identification?: string;
  balance?: number;
}

export default Cliente;
