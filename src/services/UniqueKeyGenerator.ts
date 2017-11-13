let firstKeyNumber = 10000;
let keyCounter = 0;

export default function generateUniqueKey(): number {
    let value = keyCounter;
    keyCounter = keyCounter + 1;
    return value + firstKeyNumber;
}