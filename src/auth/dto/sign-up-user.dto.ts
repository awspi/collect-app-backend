import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  xh: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  qq: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  schoolId: number;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
