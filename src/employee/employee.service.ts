import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { NotificationService } from 'src/plugin/notification.service.';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private notificationService: NotificationService,
  ) {}

  async createEmployee(employee: CreateEmployeeDto) {
    if (employee.cargo == 'Entrenador' || employee.cargo == 'Conserje') {
      console.log(employee);
      const newEmployee = this.employeeRepository.create(employee);
      const savedEmployee = await this.employeeRepository.save(newEmployee);
      await this.notificationService.sendNotification(
        `Nuevo empleado ${employee.cargo} creado: ${employee.employeeFirstName}`,
      );
      return savedEmployee;
    }

    return new HttpException(
      'Solo hay 2 cargos, Conserje o Entrenador',
      HttpStatus.CONFLICT,
    );
  }

  async deleteEmployee(id: number) {
    const employeeFound = await this.employeeRepository.findOne({
      where: { id },
    });
    if (!employeeFound) {
      throw new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.employeeRepository.delete({ id });
    await this.notificationService.sendNotification(
      `Empleado eliminado con ID: ${id}`,
    );
  }

  async updateEmployee(id: number, employee: UpdateEmployeeDto) {
    const employeeFound = await this.employeeRepository.findOne({
      where: { id },
    });
    if (!employeeFound) {
      throw new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND);
    }

    if (employee.cargo == 'Entrenador' || employee.cargo == 'Conserje') {
      const updatedEmployee = Object.assign(employeeFound, employee);
      await this.employeeRepository.save(updatedEmployee);
      await this.notificationService.sendNotification(
        `Empleado actualizado: ${employee.employeeFirstName} con ID: ${id}`,
      );
      return updatedEmployee;
    }

    throw new HttpException(
      'Solo hay 2 cargos, Conserje o Entrenador',
      HttpStatus.CONFLICT,
    );
  }

  getEmployees() {
    return this.employeeRepository.find();
  }

  async getEmployee(id: number) {
    const employeeFound = await this.employeeRepository.findOne({
      where: { id },
    });
    if (!employeeFound) {
      return new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND);
    }

    return employeeFound;
  }
}
