import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ConfirmEmailEntity } from '../entities/confirm-email.entity';

@Injectable()
export class EmailConfirmRepository extends Repository<ConfirmEmailEntity> {
  constructor(private dataSource: DataSource) {
    super(ConfirmEmailEntity, dataSource.createEntityManager());
  }

  async confirm(
    email: string,
    code: number,
  ): Promise<ConfirmEmailEntity | any> {
    const data = await this.findOneBy({ email });

    if (data?.code === code) {
      return this.update({ email, code }, { isVerified: true });
    } else {
      return {};
    }
  }
}
