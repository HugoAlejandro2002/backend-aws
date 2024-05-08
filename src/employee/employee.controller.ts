import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  getEmployees(): Promise<Employee[]> {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  getEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.getEmployee(id);
  }

  @Post()
  createEmployee(@Body() newUser: CreateEmployeeDto) {
    return this.employeeService.createEmployee(newUser);
  }

  @Delete(':id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.deleteEmployee(id);
  }

  @Patch(':id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(id, user);
  }
}
