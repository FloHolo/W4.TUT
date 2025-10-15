import type { Loan } from './loan';

export interface LoanRepo {
  create(loan: Loan): Promise<void>;
  get(id: string): Promise<Loan | null>;
}
