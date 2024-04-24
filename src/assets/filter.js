
export function filterString(string, words) {
    if (string === '') return true;
    const wordList = words.slice().split('');
    return wordList.includes(string);
}

export function sliceWord(string) {
    if (string.length > 30) {
        if (window.innerWidth < 500) {
            return string.slice(0, 30).padEnd(34, '.');
        }
        return string.slice(0, 40).padEnd(44, '.');
    }
    return string;
    
}

export function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent));
}


export function generateImageName(type) {
    const timestamp = new Date().getTime();
    return `${type}_${timestamp}`
}
  
export function displayTime(time) {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const remains = seconds % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${remains < 10 ? '0' : ''}${remains}`;
    return formattedTime;
}

export function padNames(string, num) {
    if (string.length <= num) {
        return string;
    }
    else {
        return string.slice(0,num - 3).padEnd(num, '.')
    }
}