import { CosmosClient, Container } from '@azure/cosmos';
import type { Loan } from '../domain/loan';
import type { LoanRepo } from '../domain/loan-repo';

interface Options {
  endpoint: string;
  databaseId: string;
  containerId: string;
  key?: string;
}

interface LoanDTO {
  id: string;
  borrowerName: string;
  device: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}

export class LoanRepoCosmos implements LoanRepo {
  private container: Container;

  constructor(options: Options) {
    const client = new CosmosClient({
      endpoint: options.endpoint,
      key: options.key,
    });

    this.container = client
      .database(options.databaseId)
      .container(options.containerId);
  }

  private toDTO(loan: Loan): LoanDTO {
    return {
      id: loan.id,
      borrowerName: loan.borrowerName,
      device: loan.device,
      status: loan.status,
      createdAt: loan.createdAt,
      expiresAt: loan.expiresAt,
    };
  }

  private fromDTO(dto: LoanDTO): Loan {
    return {
      id: dto.id,
      borrowerName: dto.borrowerName,
      device: dto.device,
      status: dto.status as Loan['status'],
      createdAt: dto.createdAt,
      expiresAt: dto.expiresAt,
    };
  }

  async create(loan: Loan): Promise<void> {
    const dto = this.toDTO(loan);
    await this.container.items.create(dto);
  }

  async list(): Promise<Loan[]> {
    const query = 'SELECT * FROM c';
    const { resources } = await this.container.items
      .query<LoanDTO>(query)
      .fetchAll();

    return resources.map((dto) => this.fromDTO(dto));
  }

  async getById(id: string): Promise<Loan | null> {
    try {
      const { resource } = await this.container.item(id, id).read<LoanDTO>();
      return resource ? this.fromDTO(resource) : null;
    } catch (err: any) {
      if (err.code === 404) return null;
      throw err;
    }
  }

  async update(loan: Loan): Promise<void> {
    const dto = this.toDTO(loan);
    await this.container.item(dto.id, dto.id).replace(dto);
  }
}
