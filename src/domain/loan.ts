// Type definitions
export type LoanStatus = 'pending' | 'approved' | 'rejected' | 'closed';

export type Loan = Readonly<{
  id: string;
  borrowerName: string;
  amount: number;
  termMonths: number;
  interestRate: number;
  status: LoanStatus;
  createdAt: string;
  expiresAt: string;
}>;

export type LoanParams = {
  id?: string;
  borrowerName: string;
  amount: number;
  termMonths: number;
  interestRate: number;
  status?: LoanStatus;
};

// Utility: Simple UUID generator
const generateId = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

// Factory function
export const createLoan = (params: LoanParams): Loan => {
  const {
    id = generateId(),
    borrowerName,
    amount,
    termMonths,
    interestRate,
    status = 'pending',
  } = params;

  // Validation rules
  if (!borrowerName || borrowerName.length < 2 || borrowerName.length > 100) {
    throw new Error('Borrower name must be between 2 and 100 characters.');
  }

  if (typeof amount !== 'number' || amount < 1000 || amount > 1_000_000) {
    throw new Error('Loan amount must be between 1,000 and 1,000,000.');
  }

  if (typeof termMonths !== 'number' || termMonths < 6 || termMonths > 360) {
    throw new Error('Loan term must be between 6 and 360 months.');
  }

  if (typeof interestRate !== 'number' || interestRate < 0.1 || interestRate > 25) {
    throw new Error('Interest rate must be between 0.1% and 25%.');
  }

  const validStatuses: LoanStatus[] = ['pending', 'approved', 'rejected', 'closed'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid loan status: ${status}`);
  }

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 48 * 60 * 60 * 1000); // 48 hours later

  return Object.freeze({
    id,
    borrowerName,
    amount,
    termMonths,
    interestRate,
    status,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  });
};
