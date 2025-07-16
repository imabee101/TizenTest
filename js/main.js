// Log that the script is running
console.log('Big Clock application started');

// Function to update the clock display
function updateClock() {
    try {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 becomes 12
        
        // Format time (hours and minutes only)
        const timeStr = hours + ':' + String(minutes).padStart(2, '0');
        
        // Update display with AM/PM
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.innerHTML = timeStr + ' <span id="ampm">' + ampm + '</span>';
        } else {
            console.error('Clock element not found');
        }
    } catch (e) {
        console.error('Error updating clock:', e);
    }
}

// Initialize the clock when the page loads
function init() {
    console.log('Initializing clock...');
    
    // Set initial time immediately
    updateClock();
    
    // Update the clock every second
    setInterval(updateClock, 1000);
    
    console.log('Clock initialized');
    
    // Handle visibility changes
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // Update time immediately when coming back to the app
            updateClock();
        }
    });
}

// Handle TV remote control
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 10009: // RETURN button
            console.log('Return button pressed');
            if (window.tizen && tizen.application) {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (e) {
                    console.error('Error exiting application:', e);
                }
            } else {
                console.log('Tizen API not available');
            }
            break;
        case 10252: // PLAY/PAUSE button
            // Add any play/pause functionality if needed
            break;
    }
});

// Start the application when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already ready
    init();
}
