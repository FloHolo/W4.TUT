// Type definitions
export type LoanStatus = 'pending' | 'approved' | 'rejected' | 'closed';

export type Loan = Readonly<{
  id: string;
  borrowerName: string;
  device: string;
  status: LoanStatus;
  createdAt: string;
  expiresAt: string;
}>;

export type LoanParams = {
  id?: string;
  borrowerName: string;
  device: string;
  status?: LoanStatus;
};

// Utility: Simple UUID generator
const generateId = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

// Factory function
export const createLoan = (params: LoanParams): Loan => {
  const {
    id = generateId(),
    borrowerName,
    device,
    status = 'pending',
  } = params;

  // Validation rules
  if (!borrowerName || borrowerName.length < 2 || borrowerName.length > 100) {
    throw new Error('Borrower name must be between 2 and 100 characters.');
  }

  if (!device || device.length < 2 || device.length > 100) {
    throw new Error('Device name must be between 2 and 100 characters.');
  }

  const validStatuses: LoanStatus[] = [
    'pending',
    'approved',
    'rejected',
    'closed',
  ];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid loan status: ${status}`);
  }

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 48 * 60 * 60 * 1000); // 48 hours later

  return Object.freeze({
    id,
    borrowerName,
    device,
    status,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  });
};
