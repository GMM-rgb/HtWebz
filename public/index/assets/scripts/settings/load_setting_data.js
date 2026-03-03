const socket = io();

socket.on('loadSettingData', (data) => {
    console.log('Received setting data:', data);
    // Process and apply the received setting data
    
});
