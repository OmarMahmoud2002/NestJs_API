import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from '../interfaces/employee.interface';

@Injectable()
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'omar mahmoud', age: '30', salary: 50000 },
    { id: 2, name: 'ahmed mohamed', age: '28', salary: 60000 },
    { id: 3, name: 'sara ali', age: '35', salary: 75000 },
    { id: 3, name: 'asd ali', age: '35', salary: 100000000 },
  ];

  findAll(): Employee[] {
    return this.employees;
  }

  findById(id: number): Employee {
    const employee = this.employees.find((emp) => emp.id === id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  create(employee: Omit<Employee, 'id'>): Employee {
    const newEmployee = {
      id: this.employees.length + 1,
      ...employee,
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  update(id: number, updateEmployee: Partial<Employee>): Employee {
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index === -1) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    this.employees[index] = { ...this.employees[index], ...updateEmployee };
    return this.employees[index];
  }

  delete(id: number): void {
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index === -1) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    this.employees.splice(index, 1);
  }

  getHighestPaid(): Employee {
    return [...this.employees].sort((a, b) => b.salary - a.salary)[0];
  }
}
