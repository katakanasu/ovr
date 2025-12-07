// displaynicklogo.js - PERBAIKAN MAPPING
document.addEventListener('DOMContentLoaded', function() {
    console.log("Display nickname/logo script initialized");

    // Team mapping
    const teamMapping = {
        team1: 'name-box-1',     // Blue team name (KIRI atas)
        team2: 'name-box-8',     // Red team name (KANAN atas)
        team3: 'name-box-2',     // Blue team score (KIRI bawah)
        team4: 'name-box-9'      // Red team score (KANAN bawah)
    };

    const nicknameMapping = {
        1: { id: 'name-box-3', type: 'blue', position: 1 },
        2: { id: 'name-box-4', type: 'blue', position: 2 },
        3: { id: 'name-box-5', type: 'blue', position: 3 },
        4: { id: 'name-box-6', type: 'blue', position: 4 },
        5: { id: 'name-box-7', type: 'blue', position: 5 },

        6: { id: 'name-box-10', type: 'red', position: 1 },
        7: { id: 'name-box-11', type: 'red', position: 2 },
        8: { id: 'name-box-12', type: 'red', position: 3 },
        9: { id: 'name-box-13', type: 'red', position: 4 },
        10: { id: 'name-box-14', type: 'red', position: 5 }
    };
    
    // Function untuk update nickname dengan lebih banyak logging
    function updateNickname(inputId, nickname) {
        console.log(`Updating nickname - inputId: ${inputId}, nickname: "${nickname}"`);
        console.log(`Mapping for ${inputId}:`, nicknameMapping[inputId]);
        
        const mapping = nicknameMapping[inputId];
        if (!mapping) {
            console.error(`ERROR: No mapping found for inputId: ${inputId}`);
            console.log("Available mappings:", Object.keys(nicknameMapping));
            return;
        }
        
        const displayElement = document.getElementById(mapping.id);
        if (!displayElement) {
            console.error(`Element not found: ${mapping.id}`);
            
            // Debug: Cari semua elemen dengan name-box
            console.log("All name-box elements:");
            for (let i = 1; i <= 14; i++) {
                const elem = document.getElementById(`name-box-${i}`);
                if (elem) console.log(`  name-box-${i}: FOUND`);
            }
            return;
        }
        
        console.log(`Found element: ${mapping.id}, current text: "${displayElement.textContent}"`);
        
        // Jika nickname kosong, set default
        const displayName = nickname || (mapping.type === 'blue' ? `Blue ${mapping.position}` : `Red ${mapping.position}`);
        
        // Update dengan animasi
        displayElement.style.transition = 'all 0.3s ease';
        displayElement.style.opacity = '0.7';
        displayElement.style.transform = 'translateY(5px)';
        
        setTimeout(() => {
            displayElement.textContent = displayName;
            displayElement.style.opacity = '1';
            displayElement.style.transform = 'translateY(0)';
            displayElement.classList.add('updated');
            
            // Remove animation class after completion
            setTimeout(() => {
                displayElement.classList.remove('updated');
            }, 1000);
            
            console.log(`Updated ${mapping.id} to: "${displayName}"`);
        }, 200);
    }
    
    // Function untuk update team info dengan animasi
    function updateTeamInfo(teamData) {
        console.log("Updating team info:", teamData);
        
        // Update team names
        if (teamData.team1 !== undefined && teamData.team1 !== null) {
            const blueTeamElement = document.getElementById(teamMapping.team1);
            if (blueTeamElement) {
                console.log(`Blue team name: ${teamData.team1}`);
                blueTeamElement.classList.add('team-update');
                setTimeout(() => {
                    blueTeamElement.textContent = teamData.team1;
                    setTimeout(() => {
                        blueTeamElement.classList.remove('team-update');
                    }, 500);
                }, 200);
            }
        }
        
        if (teamData.team2 !== undefined && teamData.team2 !== null) {
            const redTeamElement = document.getElementById(teamMapping.team2);
            if (redTeamElement) {
                console.log(`Red team name: ${teamData.team2}`);
                redTeamElement.classList.add('team-update');
                setTimeout(() => {
                    redTeamElement.textContent = teamData.team2;
                    setTimeout(() => {
                        redTeamElement.classList.remove('team-update');
                    }, 500);
                }, 200);
            }
        }
        
        // Update scores
        if (teamData.team3 !== undefined && teamData.team3 !== null) {
            const blueScoreElement = document.getElementById(teamMapping.team3);
            if (blueScoreElement) {
                console.log(`Blue score: ${teamData.team3}`);
                blueScoreElement.classList.add('score-update');
                setTimeout(() => {
                    blueScoreElement.textContent = teamData.team3;
                    setTimeout(() => {
                        blueScoreElement.classList.remove('score-update');
                    }, 500);
                }, 200);
            }
        }
        
        if (teamData.team4 !== undefined && teamData.team4 !== null) {
            const redScoreElement = document.getElementById(teamMapping.team4);
            if (redScoreElement) {
                console.log(`Red score: ${teamData.team4}`);
                redScoreElement.classList.add('score-update');
                setTimeout(() => {
                    redScoreElement.textContent = teamData.team4;
                    setTimeout(() => {
                        redScoreElement.classList.remove('score-update');
                    }, 500);
                }, 200);
            }
        }
    }
    
    // Function untuk update logo team
    function updateTeamLogo(teamId, logoData) {
        console.log(`Updating team ${teamId} logo: ${logoData}`);
        
        let imageElement;
        
        if (teamId === '1' || teamId === 1) {
            imageElement = document.getElementById('displayImage1'); // Blue team (kiri)
        } else if (teamId === '2' || teamId === 2) {
            imageElement = document.getElementById('displayImage2'); // Red team (kanan)
        } else {
            console.error(`Invalid teamId: ${teamId}`);
            return;
        }
        
        if (imageElement && logoData) {
            // Fade out current logo
            imageElement.style.opacity = '0.3';
            imageElement.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                imageElement.src = logoData;
                imageElement.alt = `Team ${teamId} Logo`;
                imageElement.style.display = 'block';
                
                // Handle image load error
                imageElement.onerror = function() {
                    console.error(`Failed to load logo: ${logoData}`);
                    imageElement.src = '';
                    imageElement.alt = 'Logo not found';
                    imageElement.style.opacity = '1';
                    imageElement.style.transform = 'scale(1)';
                };
                
                // Fade in new logo
                imageElement.onload = function() {
                    setTimeout(() => {
                        imageElement.style.opacity = '1';
                        imageElement.style.transform = 'scale(1)';
                    }, 50);
                };
            }, 300);
        }
    }
    
    // Function untuk memproses nickname update dari localStorage
    function processNicknameUpdate() {
        try {
            const nickData = localStorage.getItem("NICK_UPDATE");
            if (!nickData) return;
            
            const data = JSON.parse(nickData);
            console.log("Nickname update received:", data);
            
            // Validasi data
            if (data.id === undefined || data.value === undefined) {
                console.error("Invalid nickname data:", data);
                return;
            }
            
            updateNickname(data.id, data.value);
            
            // Store last update time
            localStorage.setItem("LAST_NICK_UPDATE", Date.now());
            
            // Clear data setelah diproses
            localStorage.removeItem("NICK_UPDATE");
            
        } catch (error) {
            console.error("Error processing nickname update:", error);
        }
    }
    
    // Function untuk memproses team update
    function processTeamUpdate() {
        try {
            const teamData = localStorage.getItem("TEAM_UPDATE");
            if (!teamData) return;
            
            const data = JSON.parse(teamData);
            console.log("Team update received:", data);
            
            updateTeamInfo(data);
            
            // Store last update time
            localStorage.setItem("LAST_TEAM_UPDATE", Date.now());
            
            // Clear data setelah diproses
            localStorage.removeItem("TEAM_UPDATE");
            
        } catch (error) {
            console.error("Error processing team update:", error);
        }
    }
    
    // Function untuk memproses logo update
    function processLogoUpdate() {
        try {
            const logoData = localStorage.getItem("LOGO_UPDATE");
            if (!logoData) return;
            
            const data = JSON.parse(logoData);
            console.log("Logo update received:", data);
            
            updateTeamLogo(data.team, data.img);
            
            // Store last update time
            localStorage.setItem("LAST_LOGO_UPDATE", Date.now());
            
            // Clear data setelah diproses
            localStorage.removeItem("LOGO_UPDATE");
            
        } catch (error) {
            console.error("Error processing logo update:", error);
        }
    }
    
    // Function untuk mengecek semua update
    function checkForUpdates() {
        processNicknameUpdate();
        processTeamUpdate();
        processLogoUpdate();
    }
    
    // Function untuk initialize semua nickname elements
    function initializeNicknameElements() {
        console.log("Initializing nickname elements...");
        
        // Inisialisasi semua elemen nickname
        for (let slot in nicknameMapping) {
            const mapping = nicknameMapping[slot];
            const element = document.getElementById(mapping.id);
            
            if (element) {
                // Set default text jika kosong
                if (!element.textContent || element.textContent.trim() === '') {
                    const defaultName = mapping.type === 'blue' ? 
                        `Blue ${mapping.position}` : 
                        `Red ${mapping.position}`;
                    
                    element.textContent = defaultName;
                    console.log(`Set default for ${mapping.id}: "${defaultName}"`);
                }
                
                // Ensure proper styling
                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
                element.style.textAlign = 'center';
            }
        }
        
        // Initialize team names
        const blueTeamElement = document.getElementById(teamMapping.team1);
        const redTeamElement = document.getElementById(teamMapping.team2);
        
        if (blueTeamElement && (!blueTeamElement.textContent || blueTeamElement.textContent.trim() === '')) {
            blueTeamElement.textContent = "BLUE TEAM";
        }
        
        if (redTeamElement && (!redTeamElement.textContent || redTeamElement.textContent.trim() === '')) {
            redTeamElement.textContent = "RED TEAM";
        }
        
        // Initialize scores
        const blueScoreElement = document.getElementById(teamMapping.team3);
        const redScoreElement = document.getElementById(teamMapping.team4);
        
        if (blueScoreElement && (!blueScoreElement.textContent || blueScoreElement.textContent.trim() === '')) {
            blueScoreElement.textContent = "0";
        }
        
        if (redScoreElement && (!redScoreElement.textContent || redScoreElement.textContent.trim() === '')) {
            redScoreElement.textContent = "0";
        }
    }
    
    // Setup interval untuk mengecek update
    const updateInterval = setInterval(checkForUpdates, 300);
    
    // Initial initialization
    setTimeout(() => {
        initializeNicknameElements();
        checkForUpdates(); // Check for any pending updates
    }, 200);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(updateInterval);
    });
    
    // Listen for storage events (from control panel)
    window.addEventListener('storage', function(event) {
        if (event.key === "NICK_UPDATE") {
            processNicknameUpdate();
        } else if (event.key === "TEAM_UPDATE") {
            processTeamUpdate();
        } else if (event.key === "LOGO_UPDATE") {
            processLogoUpdate();
        }
    });
    
    // Expose functions for debugging
    window.debugNicknameInfo = function() {
        console.log("=== NICKNAME DEBUG INFO ===");
        console.log("Team Mapping:", teamMapping);
        console.log("Nickname Mapping:", nicknameMapping);
        
        // Check localStorage
        console.log("LocalStorage NICK_UPDATE:", localStorage.getItem("NICK_UPDATE"));
        console.log("LocalStorage TEAM_UPDATE:", localStorage.getItem("TEAM_UPDATE"));
        console.log("LocalStorage LOGO_UPDATE:", localStorage.getItem("LOGO_UPDATE"));
        
        // Check all elements
        for (let slot in nicknameMapping) {
            const mapping = nicknameMapping[slot];
            const elem = document.getElementById(mapping.id);
            console.log(`Slot ${slot} (${mapping.id}):`, 
                elem ? `"${elem.textContent}"` : 'NOT FOUND');
        }
    };
    
    // Test function untuk memastikan semua nickname berfungsi
    window.testAllNicknames = function() {
        console.log("Testing all nicknames...");
        
        // Test blue team
        updateNickname(1, "Blue Player 1");
        updateNickname(2, "Blue Player 2");
        updateNickname(3, "Blue Player 3");
        updateNickname(4, "Blue Player 4");
        updateNickname(5, "Blue Player 5");
        
        // Test red team
        updateNickname(10, "Red Player 1");
        updateNickname(11, "Red Player 2");
        updateNickname(12, "Red Player 3");
        updateNickname(13, "Red Player 4");
        updateNickname(14, "Red Player 5");
        
        console.log("All nicknames tested!");
    };
});