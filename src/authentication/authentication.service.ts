import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { addDoc, collection } from 'firebase/firestore/lite';
import { firebaseService } from 'src/firebase/firebase.service';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  Icreate,
  ILogin,
  IloginErrorResponse,
} from 'src/interfaces/authentication.type';

@Injectable()
export class AuthenticationService {
  constructor(private firebaseservice: firebaseService) {}

  async create(Payload: Icreate) {
    const newAcc = await createUserWithEmailAndPassword(
      this.firebaseservice.auth,
      Payload.email,
      Payload.password,
    );
    return newAcc;
  }

  async allUser() {
    const auth = this.firebaseservice.auth;
    const user = auth.currentUser;
    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log('  Email: ' + profile.email);
      });
    }
  }

  async logIn(Payload: ILogin) {
    try {
      const loginForm = await signInWithEmailAndPassword(
        this.firebaseservice.auth,
        Payload.email,
        Payload.password,
      );
      return loginForm;
    } catch (e) {
      if (e.code) {
        switch (e.code) {
          case IloginErrorResponse.USER_NOT_FOUND:
            throw new UnauthorizedException({
              code: 'USER_NOT_FOUND',
              message: e.message || 'USER_NOT_FOUND',
            });
          case IloginErrorResponse.WRONG_PASSWORD:
            throw new UnauthorizedException({
              code: 'WRONG_PASSWORD',
              message: e.message || 'WRONG_PASSWORD',
            });
        }
      }
      return;
    }
  }
  async;
}
