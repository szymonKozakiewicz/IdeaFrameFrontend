export class AuthorisationError extends Error {
    constructor(message: string = 'User is not authorised') {
        super(message);
        this.name = 'AuthorisationError';
    }
}