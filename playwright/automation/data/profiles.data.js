export function ProfilesData() {
    return {
        username: `testuser${Date.now()}`,
        email: `test${Date.now()}@gmail.com`,
    }
}

export function InvalidProfilesData() {
    return [
        {
            case: 'ProfileUI-TC03: Update Profile thất bại khi Yourname bỏ trống',
            field: [{ name: 'username', expected: 'valueMissing' }],
            username: '',
            email: `test${Date.now()}@gmail.com`
        },
        {
            case: 'ProfileUI-TC04: Update Profile thất bại khi Email bỏ trống',
            field: [{ name: 'email', expected: 'valueMissing' }],
            username: `testuser${Date.now()}`,
            email: ''
        },
    ]
}

export function passwordChangeData() {
    return [
        {
            case: 'ProfileUI-TC05: Thay đổi mật khẩu trong setting và login lại thành công',
            password: `${Date.now()}`,
        },
        {
            case: 'ProfileUI-TC06: mật khẩu bỏ trống và login lại bằng mật khẩu cũ',
            password: '',
        }


    ]
}