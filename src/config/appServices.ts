import { LoanRepoCosmos } from '../infra/cosmos-loan-repo';

let instance: LoanRepoCosmos | null = null;

export function getLoanRepo(): LoanRepoCosmos {
  if (!instance) {
    const key = process.env.COSMOS_KEY;
    if (!key) {
      throw new Error('Missing required environment variable: COSMOS_KEY');
    }

    instance = new LoanRepoCosmos({
      endpoint: 'https://loan-dev-vilius.documents.azure.com:443/',
      databaseId: 'loan-db',
      containerId: 'loans',
      key,
    });
  }

  return instance;
}
