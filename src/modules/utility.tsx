/**
 * オブジェクト更新用メソッド
 * @param oldObject
 * @param updateObject
 * @returns {{}}
 */
export const updateObject = (oldObject: any, updateObject: any) => {
      return {
          ...oldObject,
          ...updateObject
      }  ;
};
/**
 * formバリデーションUIメソッド
 * inputが赤くなる
 * @param {string} value
 * @param rules
 * @returns {boolean}
 */
export const checkValidity = (value: string, rules: any) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
};

/**
 * formのnameのstate初期値
 * @param props
 * @returns {{elementType: string; elementConfig: {placeholder: string; type: string; required: boolean; maxLength: string}; value; validation: {required: boolean; isEmail: boolean; minLength: number; maxLength: number}; valid: boolean; touched: boolean}}
 */
export const nameConfig = (value: string = '') => {
    return {
        elementType: 'input',
        elementConfig: {
            placeholder: 'ユーザー名',
            type: 'text',
            maxLength: "20",
            required: true,
            autoFocus: true
        },
        value: value,
        validation: {
            required: true,
            isEmail: false,
            minLength: 1,
            maxLength: 20
        },
        valid: false,
        touched: false
    }
};

export const emailConfig = (value: string = '') => {
    return {
        elementType: 'input',
        elementConfig: {
            placeholder: 'メールアドレス',
            type: 'email',
            required: true,
            maxLength: "255"
        },
        value: value,
        validation: {
            required: true,
            isEmail: true,
            minLength: 1,
            maxLength: 255
        },
        valid: false,
        touched: false
    }
};

export const passwordConfig = (placeholder: string) => {
    return {
        elementType: 'input',
        elementConfig: {
            placeholder: placeholder,
            type: 'password',
            required: false,
            maxLength: '16',
            minLength: '0'
        },
        value: '',
        validation: {
            required: true,
            isEmail: false,
            minLength: 8,
            maxLength: 16
        },
        valid: false,
        touched: false
    }
};