const firstKeyNumber = 10000;
let keyCounter = 0;

export default function generateUniqueKey(): number {
    const value = keyCounter;
    keyCounter = keyCounter + 1;
    return value + firstKeyNumber;
}
