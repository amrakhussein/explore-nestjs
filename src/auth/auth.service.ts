import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  //   signin() {}
  async signup(signupAuthDto: AuthDto) {
    console.log({ signupAuthDto });

    // hash password
    const hash = await argon.hash(signupAuthDto.password);

    // save the new user into database
    const { username, email } = signupAuthDto;

    try {
      const newUser = await this.prisma.user.create({
        data: {
          username,
          email,
          hash,
        },
        select: {
          username: true,
          email: true,
          createdAt: true,
        },
      });
      // return data to client
      return newUser;
    } catch (error) {
      // catch non unique entries in sql schema if any
      if (error instanceof PrismaClientKnownRequestError) {
        // duplicate code violation
        if (error.code === 'P2002')
          throw new ForbiddenException('Unique values only are allowed!');
      }
      throw error;
    }
  }

  async signIn(signinAuthDto: AuthDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        username: signinAuthDto.username,
      },
    });
    if (!foundUser)
      throw new ForbiddenException(
        "Either Account doesn't exit or password is incorrect!",
      );

    const passwordMatched = await argon.verify(
      foundUser.hash,
      signinAuthDto.password,
    );

    if (!passwordMatched)
      throw new ForbiddenException(
        "Either Account doesn't exit or password is incorrect!",
      );

    delete foundUser.hash;
    return foundUser;
  }
}
