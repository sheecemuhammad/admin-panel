export type DummyJsonUserAddress = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
};

export type DummyJsonUser = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email: string;
  phone?: string;
  username?: string;
  birthDate?: string;
  image?: string;
  address?: DummyJsonUserAddress;
  company?: {
    department?: string;
    name?: string;
    title?: string;
  };
  role?: string;
};

export type DummyJsonUsersResponse = {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
};
