import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {}

async register(userDto: any): Promise<any> {
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
    
    const newUser = this.usersRepository.create(userDto);
    await this.usersRepository.save(newUser);
    
    return this.login(newUser);
  }
  