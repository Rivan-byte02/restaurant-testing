import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  create(tableData: Partial<Table>): Promise<Table> {
    const table = this.tableRepository.create(tableData);
    return this.tableRepository.save(table);
  }

  findAll(): Promise<Table[]> {
    return this.tableRepository.find();
  }

  async findOne(id: number): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return table;
  }

  async update(id: number, updateData: Partial<Table>): Promise<Table> {
    await this.tableRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const table = await this.findOne(id);
    await this.tableRepository.remove(table);
  }
}
