import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeService } from '../services/employee.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '../dto/create-employee.dto';
import { Employee } from '../interfaces/employee.interface';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll(): Employee[] {
    return this.employeeService.findAll();
  }
  @Get('highest-paid')
  @ApiResponse({
    status: 200,
    description: 'Returns the highest paid employee',
  })
  getHighestPaid(): Employee {
    return this.employeeService.getHighestPaid();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Employee {
    return this.employeeService.findById(Number(id));
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto): Employee {
    return this.employeeService.create(createEmployeeDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Employee {
    return this.employeeService.update(Number(id), updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.employeeService.delete(Number(id));
  }
}
