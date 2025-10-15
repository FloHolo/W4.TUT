import type { Loan } from './loan';

export interface LoanRepo {
  create(loan: Loan): Promise<void>;
  list(): Promise<Loan[]>; //personally added it
  getById(id: string): Promise<Loan | null>;
  update(loan: Loan): Promise<void>; //personally added it
}
