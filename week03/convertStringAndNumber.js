// 实现parseInt函数
/**
 * 
18.2.5 parseInt ( string, radix )
The parseInt function produces an integer value dictated by interpretation of the contents of the string argument according to the specified radix. Leading white space in string is ignored. If radix is undefined or 0, it is assumed to be 10 except when the number begins with the code unit pairs 0x or 0X, in which case a radix of 16 is assumed. If radix is 16, the number may also optionally begin with the code unit pairs 0x or 0X.
The parseInt function is the %parseInt% intrinsic object. When the parseInt function is called, the following steps are taken:

1. Let inputString be ? ToString(string).
2. Let S be a newly created substring of inputString consisting of the first code unit that is not a StrWhiteSpaceChar
and all code units following that code unit. (In other words, remove leading white space.) If inputString does not
contain any such code unit, let S be the empty string.
3. Let sign be 1.
4. If S is not empty and the first code unit of S is the code unit 0x002D (HYPHEN-MINUS), set sign to -1.
5. If S is not empty and the first code unit of S is the code unit 0x002B (PLUS SIGN) or the code unit 0x002D
© Ecma International 2019 393
(HYPHEN-MINUS), remove the first code unit from S.
6. Let R be ? ToInt32(radix).
7. Let stripPrefix be true.
8. IfR≠0,then
a. IfR<2orR>36,returnNaN.
b. If R ≠ 16, set stripPrefix to false.
9. ElseR=0,
a. SetRto10.
10. If stripPrefix is true, then
a. If the length of S is at least 2 and the first two code units of S are either "0x" or "0X", then i. Remove the first two code units from S.
ii. SetRto16.
11. If S contains a code unit that is not a radix-R digit, let Z be the substring of S consisting of all code units before the
first such code unit; otherwise, let Z be S.
12. If Z is empty, return NaN.
13. Let mathInt be the mathematical integer value that is represented by Z in radix-R notation, using the letters A-Z and
a-z for digits with values 10 through 35. (However, if R is 10 and Z contains more than 20 significant digits, every significant digit after the 20th may be replaced by a 0 digit, at the option of the implementation; and if R is not 2, 4, 8, 10, 16, or 32, then mathInt may be an implementation-dependent approximation to the mathematical integer value that is represented by Z in radix-R notation.)
14. If mathInt = 0, then
a. If sign = -1, return -0.
b. Return +0.
15. Let number be the Number value for mathInt.
16. Return sign × number.
 */

/**
 * 翻译：
 * parseInt ( string, radix )
 * parseInt函数是一个通过根据进制基数，转化字符串参数为数字的函数
 * 如果以空格开头，那么忽略空格
 * 如果进制radix是 undefined或者0，那么radix就为10，除了这个是以0x或者0X开头，那么radix就为16
 * 
 * 1、先强制转化为字符串
 * 2、
 */

 function ToInt32 (R) {
    R = Number(R);
    if (isNaN(R) || [Infinity, -Infinity, +0, -0].includes(R)) R = 0;
    let int = Math.floor(Math.abs(R));
    let int32bit = int % 2**32;
    return int32bit >= 2** 31 ? int32bit - 2**32: int32bit;
 }
// parseInt
function convertStringToNumber(string, x) {
    if (string === "") return 0;
    x = x || 10;
    string = string.toString().trimLeft() || "";
    let sign = 1;
    if (string.starWith("-")) sign = -1;
    if (string.starWith("+")) {
        string = string.substr(1);
    }
    let R = ToInt32(x);
    let stripPrefix = true;
    if (R != 0) {
        if (R < 2 || R > 32) return NaN;
        if (R !== 16) stripPrefix = false;
    } else {
        R = 10;
    }
    if (stripPrefix) {
        if (string.length > 2 && (string.starWith("0x") || string.starWith("0X"))) {
            string = string.substr(2);
            R = 16;
        }
    }
    let Z;
    if (string.includes(-R)) {
        Z = string.substr(0, string.indexOf(-R))
    } else {
        Z = string;
    }
    if (!Z) return NaN;
    var chars = string.split('');
    var number = 0;
    
    var i = 0;
    while (i < chars.length && chars[i] !== '.') {
        number = number * R;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
    }

    if (chars[i] == '.') {
        i++;
    }
    var fraction = 1;
    while(i < chars.length) {
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
    }
    // fraction = fraction / x;
    return number;
}

console.log(convertStringToNumber("10.02"));

/**
 * 
 * 1. If m is NaN, return the String "NaN".
 * 2. If m is +0 or -0, return the String "0".
 * 3. If m is less than zero, return the string-concatenation of "-" and ! NumberToString(-m).
 * 4. If m is +∞, return the String "Infinity".
 * 5. Otherwise,letn,k,andsbeintegerssuchthatk≥1,10k-1≤s<10k,theNumbervaluefors×10n-kism,andk is as small as possible. Note that k is the number of digits in the decimal representation of s, that s is not divisible by 10, and that the least significant digit of s is not necessarily uniquely determined by these criteria.
 * 6. If k ≤ n ≤ 21, return the string-concatenation of:
 *  the code units of the k digits of the decimal representation of s (in order, with no leading zeroes) n - k occurrences of the code unit 0x0030 (DIGIT ZERO)
 * 7. If 0 < n ≤ 21, return the string-concatenation of:
 *  the code units of the most significant n digits of the decimal representation of s the code unit 0x002E (FULL STOP)
 *  the code units of the remaining k - n digits of the decimal representation of s
 * 8. If -6 < n ≤ 0, return the string-concatenation of:
 *  the code unit 0x0030 (DIGIT ZERO)
 *  the code unit 0x002E (FULL STOP)
 *  -n occurrences of the code unit 0x0030 (DIGIT ZERO)
 *  the code units of the k digits of the decimal representation of s
 * 9. Otherwise, if k = 1, return the string-concatenation of:
 *  the code unit of the single digit of s
 *  the code unit 0x0065 (LATIN SMALL LETTER E)
 *  the code unit 0x002B (PLUS SIGN) or the code unit 0x002D (HYPHEN-MINUS) according to whether n - 1 is positive or negative
 *  the code units of the decimal representation of the integer abs(n - 1) (with no leading zeroes)
 * 10. Return the string-concatenation of:
 *  the code units of the most significant digit of the decimal representation of s the code unit 0x002E (FULL STOP)
 *  the code units of the remaining k - 1 digits of the decimal representation of s the code unit 0x0065 (LATIN SMALL LETTER E)
 *  the code unit 0x002B (PLUS SIGN) or the code unit 0x002D (HYPHEN-MINUS) according to whether n - 1 is positive or negative
 *  the code units of the decimal representation of the integer abs(n - 1) (with no leading zeroes)
 */

/**
 * p61  NumberToString
 * 1、如果是NaN，那么返回"NaN"
 * 2、如果是+0，或者-0，返回"0"
 * 3、如果是小于0，则返回-NumberToString(-m)
 * 4、如果是Infinity，则返回"Infinity"
 * 5、n,k,s都是整数，k >= 1，s不能被10整除，
 * 6、k ≤ n ≤ 21，所以1 <= n <= 21, 位数是 [0 ~ 20]，s的十进制数中有k个0；并且不以0开头
 */

function convertNumberToString (number, x) {
    if (isNaN(number) || isNaN(Number(number))) return "NaN";
    if (number === 0) return "0";
    if (number === Infinity) return "Infinity";
    if (number === -Infinity) return "-Infinity";
    if (String(number).includes("e") || String(number).includes("E")) {
        return String(number).replace("e", "e+").replace("E", "e+");
    }
    var integer = Math.floor(number);
    let fraction = String(number).match(/\.\d+$/);
    if (fraction) {
        fraction = fraction[0].replace('.', '');
    }
    var string = '';
    while (integer > 0) {
        string = String(integer % x) + string;
        integer = Math.floor(integer / x);
    }
    return fraction ? `${string === '' ? '0' : string}.${fraction}` : string;
}

console.log(convertNumberToString(0.0003, 10));

