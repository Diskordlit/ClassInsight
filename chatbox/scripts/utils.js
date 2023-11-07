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

// Convert Video to Audio
export const convertToAudio = (videoBlob) => {
    return new Promise((resolve, reject) => {
        const ffmpeg = require('ffmpeg.js/ffmpeg-mp4.js');
        const ffmpegWorker = new Worker(ffmpeg);

        ffmpegWorker.postMessage({
            type: 'run',
            MEMFS: [{ name: 'input.mp4', data: videoBlob }],
            arguments: ['-i', 'input.mp4', 'output.wav']
        });

        ffmpegWorker.onmessage = function (e) {
            const message = e.data;
            switch (message.type) {
                case 'stdout':
                    console.log('FFmpeg stdout: ' + message.data);
                    break;
                case 'stderr':
                    console.error('FFmpeg stderr: ' + message.data);
                    break;
                case 'exit':
                    console.log('FFmpeg process exited with code ' + message.data);
                    break;
                case 'done':
                    const audioBlob = new Blob([message.data.MEMFS[0].data], { type: 'audio/wav' });
                    resolve(audioBlob);
                    ffmpegWorker.terminate();
                    break;
            }
        };

        ffmpegWorker.onerror = function (error) {
            reject(error);
        };
    });
}