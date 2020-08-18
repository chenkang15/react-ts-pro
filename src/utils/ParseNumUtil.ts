/**
 * 将数字转换为千位符 eg:1,000
 * @param num
 */
export const parseNumToKbit = (num: string | number): string => {
    return num.toString().replace(/(\d{1,3})(?=(\d{3})+($|\.))/g, '$1,');
};

/**
 * 将数字转换为K、M、B、T eg:10k
 * @param num 数字
 * @param hasPoint 是否保留小数位
 */
export const parseNumToKMBT = (num: number, hasPoint?: boolean) => {
    let result: number | string = num;
    const parseMap = {
        1000: 'K',
        1000000: 'M',
        1000000000: 'B',
        1000000000000: 'T'
    };

    for (const key in parseMap) {
        if (parseMap.hasOwnProperty(key) && num >= +key && num < +key * 1000) {
            num = num / +key;
            result = `${hasPoint ? num : Math.round(num)}${parseMap[key]}`;
            break;
        }
    }

    return result;
};

/**
 * 将数字转换为百分比，源数字含有几位小数，转换后小数位数-2
 */
export const parseNumToPercent = (num: number) => {
    if (num === Math.floor(num)) { // 整数
        return num * 100;
    }
    const decimal = String(num).split('.')[1];
    const decimalLength = decimal.length;
    if (decimalLength <= 2) {
        return num * 100;
    } else {
        return (num * 100).toFixed(decimalLength - 2);
    }
};
