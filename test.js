const func = (int, count) => {
    let chislo = int;
    let array = [];
    while ( chislo > 10 ) {
        const item = chislo % 10;
        array.push(item)
        chislo = Math.floor(chislo / 10);
    }
    const result = array.reduce((acc, val) => acc * val, 1) * chislo;
    return result;
}


console.log(func(39));
console.log(func(1000));