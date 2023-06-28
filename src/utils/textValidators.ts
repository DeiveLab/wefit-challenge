export const stringHasOnlyNumbers = (text: string): boolean => {
    return /^\d+$/.test(text);
}