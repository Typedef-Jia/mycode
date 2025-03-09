# JavaScript常用代码片段

<ArticleMetadata />


## 格式化日期时间
::: details 点击查看
```JavaScript
/**
 * 格式化日期时间
 * @param {*} format 
 * @param {*} date 
 * @returns 
 */
function dateFormat(format, date) {
  if (date == undefined || date == null || !(date instanceof Date)) {
    date = new Date().getTime()
  }

  var myDate = new Date(date)
  let year = myDate.getFullYear()
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()
  let hour = myDate.getHours()
  let minute = myDate.getMinutes()
  let second = myDate.getSeconds()

  month = month < 10 ?'0'+month:month
  day = day < 10 ?'0'+day:day
  hour = hour < 10 ?'0'+hour:hour
  minute = minute < 10 ?'0'+minute:minute
  second = second < 10 ?'0'+second:second

  switch (format){
    case 'Y':
    return year;

    case 'Y-m':
    return year +'-'+month

    case 'Y-m-d':
    return year +'-'+month+'-'+day

    case 'Y-m-d H:i:s':
      return year +'-'+month+'-'+day+' '+hour+':'+minute+':'+second

    case 'H:i:s':
      return hour+':'+minute+':'+second

    default:
      return year +'-'+month+'-'+day+' '+hour+':'+minute+':'+second
  }
}

/**
 * 调用
 */
this.formInline.month = dateFormat('Y-m', new Date()) //月
this.formInline.year = dateFormat('Y', new Date()).toString() //年
this.formInline.date_range = [dateFormat('Y-m-d', new Date()), dateFormat('Y-m-d', new Date())] //区间
```
:::

## JavaScript 数组相关操作
::: details 点击查看
### map方法
map方法操作数组后会返回一个新的数组,
```JavaScript
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    console.log(arr.map(item => {

      return item + 2
    }));
```


### 创建数组
``` JavaScript
const myArray = [100, 200, 300];
```
### 访问数组元素
 ``` JavaScript
const myArray = [100, 200, 300];
console.log(myArray[0]); // 100
console.log(myArray[1]); // 200
```
### 添加数组元素
 ``` JavaScript
// 添加单个元素：
const cart = ['apple', 'orange'];
cart.push('pear'); 
// 添加多个元素：
const numbers = [1, 2];
numbers.push(3, 4, 5);
```
:::

## Base64转图片
::: details 点击查看
```JavaScript
const data = '' // base64字符串
function base64ToImage(base64Str, callback) {
    // 创建新的 Image 对象
    var img = new Image()
    // 设置图片加载成功后的回调函数
    img.onload = function () {
        // 图片加载成功后，调用 callback 函数，并传入 Image 对象
        if (callback && typeof callback === 'function') {
            callback(img)
        }
    }
    // 设置图片加载失败的回调函数
    img.onerror = function (err) {
        console.error('Image load failed', err)
        if (callback && typeof callback === 'function') {
            callback(null)
        }
    }
    // 将 Base64 字符串设置为 img 的 source
    img.src = 'data:image/png;base64,' + base64Str
}

// 使用示例
base64ToImage(data, function (img) {
    if (img) {
        // 图片转换成功，img 是一个 Image 对象
        document.body.appendChild(img) // 将图片添加到页面中
    } else {
        console.error('Base64字符串转图片失败')
    }
})
```
:::

## 倒计时-天-小时-分钟-秒
::: details 点击查看
```JavaScript
function formatCountdown(totalSeconds) {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function startCountdown(totalSeconds, callback) {
    const intervalId = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(intervalId);
            callback('Countdown finished.');
        } else {
            const formattedTime = formatCountdown(totalSeconds);
            totalSeconds -= 1;
            callback(formattedTime);
        }
    }, 1000);

    return intervalId; // Return interval ID so it can be cleared outside the function
}

// 使用示例：
const totalSeconds = 20; // 假设这是从某处获取的倒计时总秒数
const countdownIntervalId = startCountdown(totalSeconds, (time) => {
    if (typeof time === 'string') {
        console.log(time); // 倒计时结束
    } else {
        console.log(`${time.days}天 ${time.hours}小时 ${time.minutes}分钟 ${time.seconds}秒`);
    }
});

// 如果需要在某个时刻取消倒计时，可以调用clearInterval
// clearInterval(countdownIntervalId);

```
::::

## 判断是否移动端
::: code-group
```sh [JavaScript]
const userAgent = () => {
  const u = navigator.userAgent;
  return {
    trident: u.includes('Trident'),
    presto: u.includes('Presto'),
    webKit: u.includes('AppleWebKit'),
    gecko: u.includes('Gecko') && !u.includes('KHTML'),
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: u.includes('Android') || u.includes('Adr'),
    iPhone: u.includes('iPhone'),
    iPad: u.includes('iPad'),
    webApp: !u.includes('Safari'),
    weixin: u.includes('MicroMessenger'),
    qq: !!u.match(/\sQQ/i),
  };
};

const isMobile = () => {
  if (!isBrowser()) {
    return false;
  }
  const { mobile, android, ios } = userAgent();
  return mobile || android || ios || document.body.clientWidth < 750;
};
```

```sh [JavaScript]
const isMobile = (customWidth = 480) => {
    const deviceWidth = document.querySelector('body')?.offsetWidth;
    return deviceWidth && deviceWidth < customWidth;
};
```

:::


## 身份证号码校验
::: details 点击查看
```JavaScript
// 身份证号码校验
function isValidChineseID(id) {
  const coefficientArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
  const remainderArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; // 校验码对应值
  let sum = 0;

  if (!/^\d{17}(\d|x|X)$/.test(id)) return false; // 格式检查

  const idArray = id.split('');
  for (let i = 0; i < 17; i++) {
    sum += idArray[i] * coefficientArray[i];
  }

  const remainder = sum % 11; // 计算余数
  const checkCode = remainderArray[remainder]; // 获取校验码

  const birthDate = id.substring(6, 14);
  if (!isValidDate(birthDate)) return false; // 出生日期检查

  return checkCode === idArray[17].toUpperCase(); // 校验码比对
}

function isValidDate(dateStr) {
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1; // 月份从0开始
  const day = parseInt(dateStr.substring(6, 8), 10);
  const dateObj = new Date(year, month, day);
  return dateObj.getFullYear() === year && dateObj.getMonth() === month && dateObj.getDate() === day;
}
```
::::


## 获取设备信息
::: details 点击查看
```JavaScript
/**
 * @desc 获取浏览器类型和版本
 * @return {String} 
 */
function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/wxwork\/([\d\.]+)/)) ? sys.wxwork = s[1] :
    (s = ua.match(/MicroMessenger\/([\d\.]+)/)) ? sys.wx = s[1] :
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
    (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.wxwork) return ('WxWork: ' + sys.wxwork)
    if (sys.wx) return ('Wx: ' + sys.wx)
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unknown'
}

/**
 * @desc 获取操作系统类型
 * @return {String} 
 */
function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX';
    if (/win/i.test(appVersion)) return 'windows';
    if (/linux/i.test(appVersion)) return 'linux';
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';
    if (/android/i.test(userAgent)) return 'android';
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
}
```
::::

## 倒计时-天-小时-分钟-秒
::: details 点击查看
```JavaScript

```
::::

## 倒计时-天-小时-分钟-秒
::: details 点击查看
```JavaScript

```
::::

## 倒计时-天-小时-分钟-秒
::: details 点击查看
```JavaScript

```
::::