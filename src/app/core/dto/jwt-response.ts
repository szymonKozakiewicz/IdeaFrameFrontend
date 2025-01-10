export class JwtResponse {

    AccessToken: string;
    AcessTokenExpiration: Date;

    constructor(accessToken: string, acessTokenExpiration: Date) {
        
        this.AccessToken = accessToken;
        this.AcessTokenExpiration = acessTokenExpiration;

    }
}