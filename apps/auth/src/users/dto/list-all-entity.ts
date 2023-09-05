import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ListAllEntity {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @MaxLength(6)
  number: string;
}
