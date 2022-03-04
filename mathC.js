class MathC{
    static randomIntFromInterval(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    static randomFloatFromInterval(min, max, decimal = 3) {
        const tempMin = min * (10 ** decimal);
        const tempMax = max * (10 ** decimal);
        const random = Math.floor(Math.random() * (tempMax - tempMin + 1) + tempMin);
        const floatRandom = random / (10 ** decimal);
        return floatRandom;
    }
}