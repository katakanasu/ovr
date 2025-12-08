// connection-manager.js - OPTIMIZED VERSION
// Manages connection status and communication - Lightweight & Efficient

document.addEventListener('DOMContentLoaded', function() {
    console.log("Connection Manager - Optimized Version");
    
    // DOM Elements
    const statusIndicator = document.getElementById('status-indicator');
    
    // Configuration
    const CONFIG = {
        HEARTBEAT_INTERVAL: 10000,      // 10 seconds (was 2000)
        TIMEOUT_THRESHOLD: 15000,       // 15 seconds (was 3000)
        CHECK_INTERVAL: 5000,           // 5 seconds for status check
        MAX_LOG_INTERVAL: 30000,        // Log every 30 seconds max
        RETRY_DELAY: 5000,              // 5 seconds for retry
        MAX_RETRIES: 3                  // Max retry attempts
    };
    
    // State Management
    let state = {
        isConnected: false,
        lastControlHeartbeat: 0,
        lastDisplayHeartbeat: 0,
        retryCount: 0,
        lastLogTime: 0,
        lastStatusUpdate: 0,
        isTabActive: true,
        heartbeatInterval: null,
        checkInterval: null,
        storageHandler: null
    };
    
    // ==================== CORE FUNCTIONS ====================
    
    /**
     * Update connection status efficiently
     */
    function updateConnectionStatus() {
        const now = Date.now();
        
        // Skip if too frequent (debounce)
        if (now - state.lastStatusUpdate < 1000) return;
        state.lastStatusUpdate = now;
        
        // Check localStorage availability
        if (typeof localStorage === 'undefined') {
            setOffline('LocalStorage unavailable');
            return;
        }
        
        try {
            // Send heartbeat only if needed
            if (now - state.lastDisplayHeartbeat > CONFIG.HEARTBEAT_INTERVAL) {
                localStorage.setItem("DISPLAY_HEARTBEAT", now.toString());
                state.lastDisplayHeartbeat = now;
            }
            
            // Check control panel heartbeat
            const controlHeartbeat = localStorage.getItem("CONTROL_HEARTBEAT");
            
            if (controlHeartbeat) {
                const heartbeatTime = parseInt(controlHeartbeat);
                const timeDiff = now - heartbeatTime;
                
                if (timeDiff < CONFIG.TIMEOUT_THRESHOLD) {
                    // Connected
                    if (!state.isConnected || timeDiff > 5000) {
                        setOnline();
                        state.retryCount = 0; // Reset retry counter
                        
                        // Log connection status periodically
                        if (now - state.lastLogTime > CONFIG.MAX_LOG_INTERVAL) {
                            console.log(`Connected - Last heartbeat: ${timeDiff}ms ago`);
                            state.lastLogTime = now;
                        }
                    }
                } else {
                    // Timeout - disconnected
                    if (state.isConnected) {
                        setOffline(`No heartbeat for ${Math.round(timeDiff/1000)}s`);
                        
                        // Try to recover
                        if (state.retryCount < CONFIG.MAX_RETRIES) {
                            state.retryCount++;
                            console.warn(`Connection lost. Retry attempt ${state.retryCount}/${CONFIG.MAX_RETRIES}`);
                        }
                    }
                }
                
                state.lastControlHeartbeat = heartbeatTime;
            } else {
                // No heartbeat found
                setOffline('Control Panel not detected');
            }
            
        } catch (error) {
            console.error('Connection check error:', error);
            setOffline('Error checking connection');
        }
    }
    
    /**
     * Set status to online
     */
    function setOnline() {
        if (!state.isConnected) {
            state.isConnected = true;
            
            if (statusIndicator) {
                statusIndicator.classList.remove('offline');
                statusIndicator.title = 'Connected to Control Panel';
                statusIndicator.classList.add('pulse');
                
                setTimeout(() => {
                    statusIndicator.classList.remove('pulse');
                }, 500);
            }
            
            // Log only on state change
            const now = Date.now();
            if (now - state.lastLogTime > 5000) {
                console.log('✓ Control Panel Connected');
                state.lastLogTime = now;
            }
        }
    }
    
    /**
     * Set status to offline
     */
    function setOffline(reason = 'Unknown') {
        if (state.isConnected) {
            state.isConnected = false;
            
            if (statusIndicator) {
                statusIndicator.classList.add('offline');
                statusIndicator.title = `Disconnected: ${reason}`;
            }
            
            // Log only on state change
            const now = Date.now();
            if (now - state.lastLogTime > 5000) {
                console.warn(`✗ Control Panel Disconnected: ${reason}`);
                state.lastLogTime = now;
            }
        }
    }
    
    // ==================== EVENT HANDLERS ====================
    
    /**
     * Setup optimized storage event listener
     */
    function setupStorageListener() {
        // Use debounced handler to avoid excessive calls
        let storageTimeout = null;
        
        state.storageHandler = function(event) {
            // Only process important keys
            if (['CONTROL_HEARTBEAT', 'NICK_UPDATE', 'TEAM_UPDATE', 'LOGO_UPDATE'].includes(event.key)) {
                
                // Debounce processing
                if (storageTimeout) {
                    clearTimeout(storageTimeout);
                }
                
                storageTimeout = setTimeout(() => {
                    // Update connection status on heartbeat
                    if (event.key === 'CONTROL_HEARTBEAT') {
                        updateConnectionStatus();
                        
                        // Pulse indicator on heartbeat
                        if (statusIndicator && !statusIndicator.classList.contains('pulse')) {
                            statusIndicator.classList.add('pulse');
                            setTimeout(() => {
                                statusIndicator.classList.remove('pulse');
                            }, 300);
                        }
                    }
                    
                    storageTimeout = null;
                }, 100); // 100ms debounce
            }
        };
        
        window.addEventListener('storage', state.storageHandler);
    }
    
    /**
     * Setup heartbeat system
     */
    function setupHeartbeat() {
        // Initial heartbeat
        try {
            localStorage.setItem("DISPLAY_HEARTBEAT", Date.now().toString());
            state.lastDisplayHeartbeat = Date.now();
        } catch (error) {
            console.error('Failed to send initial heartbeat:', error);
        }
        
        // Setup heartbeat interval (less frequent)
        state.heartbeatInterval = setInterval(() => {
            if (state.isTabActive) { // Only send heartbeat if tab is active
                try {
                    localStorage.setItem("DISPLAY_HEARTBEAT", Date.now().toString());
                    state.lastDisplayHeartbeat = Date.now();
                } catch (error) {
                    console.error('Heartbeat failed:', error);
                }
            }
        }, CONFIG.HEARTBEAT_INTERVAL);
        
        // Setup status check interval
        state.checkInterval = setInterval(() => {
            updateConnectionStatus();
        }, CONFIG.CHECK_INTERVAL);
    }
    
    // ==================== TAB VISIBILITY ====================
    
    /**
     * Handle tab visibility changes
     */
    function setupVisibilityHandler() {
        document.addEventListener('visibilitychange', function() {
            state.isTabActive = !document.hidden;
            
            if (state.isTabActive) {
                // Tab became active - update immediately
                updateConnectionStatus();
                console.log('Tab active - connection monitoring resumed');
            } else {
                // Tab inactive - reduce logging
                console.log('Tab inactive - connection monitoring reduced');
            }
        });
    }
    
    // ==================== INITIALIZATION ====================
    
    /**
     * Initialize connection manager
     */
    function initialize() {
        console.log('Initializing Connection Manager...');
        
        // Set initial status
        if (statusIndicator) {
            statusIndicator.title = 'Initializing...';
        }
        
        // Setup event listeners
        setupStorageListener();
        setupVisibilityHandler();
        
        // Start heartbeat system
        setupHeartbeat();
        
        // Initial connection check with delay
        setTimeout(() => {
            updateConnectionStatus();
            console.log('Connection Manager ready');
        }, 1000);
        
        // Check if control panel exists
        setTimeout(() => {
            const controlHeartbeat = localStorage.getItem("CONTROL_HEARTBEAT");
            if (!controlHeartbeat) {
                console.info('⚠️ Control Panel not detected. Waiting for connection...');
                if (statusIndicator) {
                    statusIndicator.title = 'Waiting for Control Panel...';
                }
            }
        }, 3000);
    }
    
    // ==================== CLEANUP ====================
    
    /**
     * Cleanup resources
     */
    function cleanup() {
        if (state.heartbeatInterval) {
            clearInterval(state.heartbeatInterval);
            state.heartbeatInterval = null;
        }
        
        if (state.checkInterval) {
            clearInterval(state.checkInterval);
            state.checkInterval = null;
        }
        
        if (state.storageHandler) {
            window.removeEventListener('storage', state.storageHandler);
            state.storageHandler = null;
        }
        
        console.log('Connection Manager cleaned up');
    }
    
    // ==================== PUBLIC API ====================
    
    /**
     * Manual connection check
     */
    window.checkConnection = function() {
        updateConnectionStatus();
        console.log('Manual connection check triggered');
        return state.isConnected;
    };
    
    /**
     * Get connection status
     */
    window.getConnectionStatus = function() {
        return {
            isConnected: state.isConnected,
            lastHeartbeat: state.lastControlHeartbeat,
            timeSinceLastHeartbeat: Date.now() - state.lastControlHeartbeat,
            retryCount: state.retryCount,
            config: CONFIG
        };
    };
    
    /**
     * Test connection
     */
    window.testConnection = function() {
        console.log('=== Connection Test ===');
        console.log('Current State:', state);
        console.log('LocalStorage Available:', typeof localStorage !== 'undefined');
        
        if (typeof localStorage !== 'undefined') {
            console.log('DISPLAY_HEARTBEAT:', localStorage.getItem("DISPLAY_HEARTBEAT"));
            console.log('CONTROL_HEARTBEAT:', localStorage.getItem("CONTROL_HEARTBEAT"));
            console.log('NICK_UPDATE:', localStorage.getItem("NICK_UPDATE") ? 'Exists' : 'Empty');
            console.log('TEAM_UPDATE:', localStorage.getItem("TEAM_UPDATE") ? 'Exists' : 'Empty');
            console.log('LOGO_UPDATE:', localStorage.getItem("LOGO_UPDATE") ? 'Exists' : 'Empty');
        }
        
        updateConnectionStatus();
        console.log('Connection Test Complete');
    };
    
    /**
     * Reset connection
     */
    window.resetConnection = function() {
        console.log('Resetting connection...');
        cleanup();
        state.retryCount = 0;
        initialize();
    };
    
    /**
     * Update configuration
     */
    window.updateConnectionConfig = function(newConfig) {
        Object.assign(CONFIG, newConfig);
        console.log('Configuration updated:', CONFIG);
        
        // Restart intervals with new config
        if (state.heartbeatInterval) {
            clearInterval(state.heartbeatInterval);
        }
        if (state.checkInterval) {
            clearInterval(state.checkInterval);
        }
        
        setupHeartbeat();
    };
    
    // ==================== STARTUP ====================
    
    // Start with a small delay to avoid blocking initial render
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        setTimeout(initialize, 500);
    }
    
    // Setup cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
    window.addEventListener('pagehide', cleanup);
    
    // Handle page refresh
    window.addEventListener('unload', function() {
        // Send final heartbeat
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem("DISPLAY_HEARTBEAT", '0'); // Indicate disconnect
            } catch (error) {
                // Silent fail
            }
        }
    });
    
    // Auto-recovery on focus
    window.addEventListener('focus', function() {
        if (!state.isConnected) {
            setTimeout(updateConnectionStatus, 1000);
        }
    });
    
    // ==================== DEBUG MODE ====================
    
    // Enable debug mode with query parameter
    if (window.location.search.includes('debug=connection')) {
        console.log('🔧 Connection Debug Mode Enabled');
        
        // More frequent updates in debug mode
        CONFIG.HEARTBEAT_INTERVAL = 5000;
        CONFIG.CHECK_INTERVAL = 2000;
        
        // Log all storage events in debug mode
        window.addEventListener('storage', function(event) {
            console.debug(`Storage Event: ${event.key} = ${event.newValue ? event.newValue.substring(0, 50) + '...' : 'null'}`);
        });
    }
});