import Service from "./Service";

export class Instructor {
  id?: number;
  name?: string;
  identification?: string;
  email?: string;
  type?: string;
  services?: Service[];
}

export default Instructor;
