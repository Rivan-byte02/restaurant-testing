import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TableService } from './table.service';
import { Table } from './entities/table.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tables')
@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new table' })
  @ApiResponse({ status: 201, description: 'Table created successfully.' })
  create(@Body() tableData: Partial<Table>): Promise<Table> {
    return this.tableService.create(tableData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tables' })
  @ApiResponse({ status: 200, description: 'Return all tables.' })
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a table by ID' })
  @ApiResponse({ status: 200, description: 'Return a single table.' })
  findOne(@Param('id') id: number): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a table' })
  @ApiResponse({ status: 200, description: 'Table updated successfully.' })
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<Table>,
  ): Promise<Table> {
    return this.tableService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a table' })
  @ApiResponse({ status: 200, description: 'Table deleted successfully.' })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.tableService.remove(id);
    return { message: 'Table deleted successfully' }
  }
}
