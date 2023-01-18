import { IsString, IsNotEmpty, Length } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsNotEmpty()
  qq: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
