
export function getStatusOfInputsRequiredErrorsAndInputsBorders(loginError: any, passwordError: any, passwordInput: HTMLElement, loginInput: HTMLElement) {
    const loginErrorStatus: string = loginError ? 'P' : 'N';
    const passwordErrorStatus: string = passwordError ? 'P' : 'N';
    const passwordInputBorderStatus: string = passwordInput.classList.contains('is-invalid') ? 'P' : 'N';
    const loginInputBorderStatus: string = loginInput.classList.contains('is-invalid') ? 'P' : 'N';
    const result: string = loginErrorStatus + passwordErrorStatus + loginInputBorderStatus + passwordInputBorderStatus;
    return result;
}



export function getStatusOfRepeatPasswordInputBorderAndErrors(matchError: any, requiredError: any, repeatPasswordInput: HTMLElement) {
    const matchErrorStatus: string = matchError ? 'P' : 'N';
    const requiredErrorStatus: string = requiredError? 'P' : 'N';
    const repeatPasswordInputBorderStatus: string = repeatPasswordInput.classList.contains('is-invalid') ? 'P' : 'N';

    const result: string = matchErrorStatus + requiredErrorStatus + repeatPasswordInputBorderStatus;
    return result;
}


export function getStatusOfPasswordInputBorderAndErrors(lenghtError: any, requiredError: any, passwordInput: HTMLElement) {
    const matchErrorStatus: string = lenghtError ? 'P' : 'N';
    const requiredErrorStatus: string = requiredError? 'P' : 'N';
    const repeatPasswordInputBorderStatus: string = getStatusOfPasswordBorder(passwordInput);

    const result: string = matchErrorStatus + requiredErrorStatus + repeatPasswordInputBorderStatus;
    return result;
}


export function getStatusOfOnePasswordErrorAndStatusOfBorder(error:any,passwordInput: HTMLElement)
{
    const errorStatus: string = error ? 'P' : 'N';
    const borderStatus=getStatusOfPasswordBorder(passwordInput);
    const result:string=errorStatus+borderStatus;
    return result;
}

export function getStatusOfPasswordBorder(passwordInput: HTMLElement)
{
    return passwordInput.classList.contains('is-invalid') ? 'P' : 'N';
}