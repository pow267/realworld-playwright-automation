export function LoginData() {
    return { email: 'test@gmail.com', password: '123456' }
}

export function InvalidLoginAPI() {
    return [
        { case: 'LoginAPI-TC02: Đăng nhập khi Email bỏ trống', email: '', password: '123456' },
        { case: 'LoginAPI-TC03: Đăng nhập khi Password bỏ trống', email: 'test@gmail.com', password: '' },
        { case: 'LoginAPI-TC04: Đăng nhập khi email sai định dạng', email: 'testgmail.com', password: '123456' },
    ]
}

export function NegativeLoginAPI() {
    return [
        { case: 'LoginAPI-TC05: Đăng nhập khi Email sai', email: 'testzxc@gmail.com', password: '123456' },
        { case: 'LoginAPI-TC06: Đăng nhập khi Password sai', email: 'test@gmail.com', password: '1234567' },
        { case: 'LoginAPI-TC07: Đăng nhập khi email và password sai', email: 'test1gmail.com', password: '1234567' },
    ]
}


export function InvalidLoginUI() {
    return [
        { case: 'LoginUI-TC02: Đăng nhập khi Email bỏ trống', email: '', password: '123456', field: [{ name: 'email', expected: 'valueMissing' }] },
        { case: 'LoginUI-TC03: Đăng nhập khi Password bỏ trống', email: 'test@gmail.com', password: '', field: [{ name: 'password', expected: 'valueMissing' }] },
        { case: 'LoginUI-TC04: Đăng nhập khi Email, Password bỏ trống', email: '', password: '', field: [{ name: 'email', expected: 'valueMissing' }, { name: 'password', expected: 'valueMissing' }] },
        { case: 'LoginUI-TC05: Đăng nhập khi email sai định dạng', email: 'testgmail.com', password: '123456', field: [{ name: 'email', expected: 'typeMismatch' }] },
    ]
}


export function NegativeLoginUI() {
    return [
        { case: 'LoginUI-TC06: Đăng nhập khi Email sai', email: `test${Date.now()}@gmail.com`, password: '123456', field: 'email', expected: 'Email not found sign in first' },
        { case: 'LoginUI-TC07: Đăng nhập khi Password sai', email: 'test@gmail.com', password: `${Date.now()}`, field: 'password', expected: 'Wrong email/password combination' },
        { case: 'LoginUI-TC08: Đăng nhập khi email và password sai', email: `test${Date.now()}@gmail.com`, password: `${Date.now()}`, field: 'email', expected: 'Email not found sign in first' },
    ]
}