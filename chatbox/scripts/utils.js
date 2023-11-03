// Get current time
export const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
}


//Format Timestamp
export const formatTimestamp = (timestampWithMilliseconds) => {
    const parts = timestampWithMilliseconds.split(".");
    return parts[0]; // Take only the part before the dot (milliseconds)
}