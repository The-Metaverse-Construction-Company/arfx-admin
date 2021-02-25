export interface AdminResponse {
  success: boolean;
  result: AdminResult;
  errors: string[];
}

export interface AdminResult {
  admin: Admin;
  token: string;
}

export interface Admin {
  email: Email;
  firstName: string;
  lastName: string;
  roleLevel: number;
  createdAt: number;
  updatedAt: number;
  _id: string;
  __v: number;
}

export interface Email {
  value: string;
  verified: boolean;
  verifiedAt: number;
}
