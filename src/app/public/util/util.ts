/**
 * 保留小数点取整，不四舍五入
 */
export function toInteger(value: number, dig: number = 2): number {
	if (value != undefined || value != null) {
		return dig == 0
			? Math.floor(value)
			: Math.floor(value * 10 ** dig) / 10 ** dig
	} else {
		return value
	}
}

/*
截取字符串中的数字
*/
export function interceptionNumber(t: string): number {
	return <any>t.replace(/[^\d\.]/g, '') * 1
}

/*
根据时间戳获取唯一的id值
参数isStr表示是否返回带nr字符
 */
export function uniqueId(isStr: boolean = true): string | number {
	if (isStr == true) {
		return `nr${new Date().getTime()}`
	} else if (isStr == false) {
		return `${new Date().getTime()}`
	}
}

/*
负责合并两个对象共同有的值，后者替换前者
 */
export function assignData(after: any, before: any): void {
	if (isObject(after) && isObject(before)) {
		for (let e in after) {
			after[e] = before[e] || after[e]
		}
	}
}

/*
将其转化为布尔值
 */
export function toBoolean(value: any): boolean {
	switch (value) {
		case '':
			return true
		case 'false':
		case '0':
			return false
		default:
			return !!value
	}
}

/*
验证是否为整数
 */
export function isInt(value: any): boolean {
	if (isNaN(value)) {
		return false
	}
	let x = parseFloat(value)
	return (x | 0) === x
}

/*
验证是否为对象
 */
export function isObject(value: any): boolean {
	const type = typeof value
	return !!value && (type === 'object' || type === 'function')
}

/*
验证是否为手机号
 */
export function isPhone(value: string | number): boolean {
	return /^1[34578]\d{9}$/.test(value + '')
}

/*
验证是否为邮箱
 */
export function isEmail(value: string): boolean {
	return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
}
