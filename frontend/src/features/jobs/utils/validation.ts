export const isValidCardValue = (value: string | undefined): boolean => {
    return value !== undefined && value.toLowerCase() !== "undefined" && value.trim() !== "";
}; 