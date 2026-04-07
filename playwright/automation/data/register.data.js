export function RegisterData() {
    return { username: `tester${Date.now()}`, email: `tester${Date.now()}@gmail.com`, password: '123456' }
}

export function InvalidRegisterAPI() {
    return [
        { case: 'RegisterAPI-TC02: Đăng ký thất bại khi Yourname bỏ trống', username: '', email: 'tester@gmail.com', password: '123' },
        { case: 'RegisterAPI-TC03: Đăng ký thất bại khi Email bỏ trống', username: 'tester', email: '', password: '123' },
        { case: 'RegisterAPI-TC04: Đăng ký thất bại khi Password bỏ trống', username: 'tester', email: 'tester@gmail.com', password: '' },
        { case: 'RegisterAPI-TC05: Đăng ký thất bại khi email sai định dạng', username: 'tester', email: 'testergmail.com', password: '' },
    ]
}

export function InvalidRegisterUI() {
    return [
        { case: 'RegisterUI-TC02: Đăng ký thất bại khi Yourname bỏ trống', username: '', email: 'tester@gmail.com', password: '123', field: [{ name: 'username', expected: 'valueMissing' }] },
        { case: 'RegisterUI-TC03: Đăng ký thất bại khi Email bỏ trống', username: 'tester', email: '', password: '123', field: [{ name: 'email', expected: 'valueMissing' }] },
        { case: 'RegisterUI-TC04: Đăng ký thất bại khi Password bỏ trống', username: 'tester', email: 'tester@gmail.com', password: '', field: [{ name: 'password', expected: 'valueMissing' }] },
        { case: 'RegisterUI-TC05: Đăng ký thất bại khi Yourname, Email, Password đều bỏ trống', username: '', email: '', password: '', field: [{ name: 'username', expected: 'valueMissing' }, { name: 'email', expected: 'valueMissing' }, { name: 'password', expected: 'valueMissing' }] },
        { case: 'RegisterUI-TC06: Đăng ký thất bại khi email sai định dạng', username: 'tester', email: 'testergmail.com', password: '123', field: [{ name: 'email', expected: 'typeMismatch' }] },
    ]
}

export function NegativeRegister() {
    return { username: 'tester', email: `test@gmail.com`, password: '123456' }
}