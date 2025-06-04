import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'omar iti' })
  @IsString()
  name: string;

  @ApiProperty({ example: '30'})
  @IsString()
  age: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(0)
  salary: number;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}