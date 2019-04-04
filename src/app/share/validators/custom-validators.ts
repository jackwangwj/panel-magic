import {
    AbstractControl,
    ValidationErrors,
} from '@angular/forms'

export function isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0
}

//自定义校验正则
const regs = {
    weixin: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
    qq: /^[1-9][0-9]{4,14}/,
    mobile: /^[1][3,4,5,7,8][0-9]{9}$/,
    tel: /^\d{3}-{0,1}\d{7,8}|\d{4}-{0,1}\d{7,8}$/,
    contact:/^(\d{3}-{0,1}\d{7,8}|\d{4}-{0,1}\d{7,8})|([1][3,4,5,7,8][0-9]{9})$/
}

function getCustomerValidatorResult(flag: string, control: AbstractControl){
    switch (flag) {
        case 'weixin':
            return regs.weixin.test(control.value) ? null : { 'weixin': true }
        case 'qq':
            return regs.qq.test(control.value) ? null : { 'qq': true }
        case 'mobile':
            return regs.mobile.test(control.value) ? null : { 'mobile': true }
        case 'tel':
            return regs.tel.test(control.value) ? null : { 'tel': true }
        case 'contact':
            return regs.tel.test(control.value) ? null : { 'contact': true }
    }
}

/**
 * 包含一些自定义校验工具的类
 * @author GR-05
 */
export class CustomValidators {

    //校验微信
    static weixin(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) {
            return null
        }
        return getCustomerValidatorResult('weixin', control)
    }
    //校验微信
    static qq(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) {
            return null
        }
        return getCustomerValidatorResult('qq', control)
    }
    //校验微信
    static mobile(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) {
            return null
        }
        return getCustomerValidatorResult('mobile', control)
    }
    //校验固话
    static tel(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) {
            return null
        }
        return getCustomerValidatorResult('tel', control)
    }
    //校验联系方式
    static contact(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) {
            return null
        }
        return getCustomerValidatorResult('contact', control)
    }
    //数组必须有数据
    static arrayHasData(control:AbstractControl):ValidationErrors | null {
        let result
        if (isEmptyInputValue(control.value)) {
            return null
        } else if (Array.isArray(control.value) && control.value.length > 0) {
            result = true
        }
        return result ? null : { 'arrayHasData': true }
    }
}
