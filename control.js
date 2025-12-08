// Section toggle functionality
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Deactivate all toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
        sectionElement.classList.add('active');
    }
    
    // Activate corresponding button
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        const btnText = btn.textContent || btn.innerText;
        if (btnText.includes(getButtonTextForSection(sectionId))) {
            btn.classList.add('active');
        }
    });
}

function getButtonTextForSection(sectionId) {
    const map = {
        'system-control': 'System Control',
        'nickname': 'Nickname',
        'pick': 'Pick Heroes',
        'ban': 'Ban Heroes',
        'team': 'Team Info',
        'timer': 'Timer'
    };
    return map[sectionId] || '';
}

// Communication functions
function send(cmd) {
    const timestamp = Date.now();
    localStorage.setItem("CONTROL_CMD", cmd + "|" + timestamp);
    console.log("Command sent:", cmd, "at", timestamp);
    
    // Clear after sending to prevent duplicate processing
    setTimeout(() => {
        if (localStorage.getItem("CONTROL_CMD") === cmd + "|" + timestamp) {
            localStorage.removeItem("CONTROL_CMD");
        }
    }, 100);
}

function sendInput(id) {
    const inputElement = document.getElementById("input" + id);
    if (!inputElement) return;
    
    const value = inputElement.value;
    const data = {
        id: id,
        value: value,
        time: Date.now()
    };
    localStorage.setItem("NICK_UPDATE", JSON.stringify(data));
    console.log("Nick update sent:", data);
}

function sendTeam() {
    const team1 = document.getElementById("team1");
    const team2 = document.getElementById("team2");
    const team3 = document.getElementById("team3");
    const team4 = document.getElementById("team4");
    
    if (!team1 || !team2 || !team3 || !team4) return;
    
    const data = {
        team1: team1.value,
        team2: team2.value,
        team3: team3.value,
        team4: team4.value,
        time: Date.now()
    };
    localStorage.setItem("TEAM_UPDATE", JSON.stringify(data));
    console.log("Team update sent:", data);
}

function sendLogo(teamId) {
    const fileInput = document.getElementById("file" + teamId);
    if (!fileInput || !fileInput.files[0]) return;
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function () {
        const data = {
            team: teamId,
            img: reader.result,
            time: Date.now()
        };
        localStorage.setItem("LOGO_UPDATE", JSON.stringify(data));
        console.log("Logo update sent for team:", teamId);
    };
    
    reader.onerror = function () {
        console.error("Error reading file for team:", teamId);
    };
    
    reader.readAsDataURL(file);
}

// ================ PICK/BAN FUNCTIONS ================

// Hero list - REMOVED duplicate filterDropdown function
function sendPickBanFromDropdown(slotId, heroName) {
    const searchInput = document.getElementById(`search-${slotId}`);
    if (searchInput) {
        searchInput.value = heroName;
    }

    const isBan = (slotId >= 6 && slotId <= 9) || (slotId >= 15 && slotId <= 18);
    
    const data = {
        slot: slotId,
        hero: heroName,
        isBan: isBan,
        time: Date.now()
    };
    
    localStorage.setItem("PICKBAN_UPDATE", JSON.stringify(data));
    console.log("Pick/Ban update sent:", data);
    
    // Close dropdown
    const dropdownItems = document.getElementById(`dropdown-items-${slotId}`);
    if (dropdownItems) {
        dropdownItems.style.display = 'none';
    }
}

// Hero list untuk control panel
const heroNames = [
    'Agudo', 'Alessio', 'Allain', 'Angela', 'Arke', 'Arli', 'Arthur', 'Ata', 'Athena', 'Augran',
    'Biron', 'Butterfly', 'Cai Yan', 'Charlotte', 'Cirrus', 'Consort Yu', 'Da qiao', 'Daji', 'Dharma',
    'Di Renjie', 'Dian Wei', 'Diaochan', 'Dolia', 'Donghuang', 'Dr Bian', 'Dun', 'Dyadia', 'Erin',
    'Fang', 'Frost', 'Fuzi', 'Ganmo', 'Gao', 'Garo', 'Guan Yu', 'Guiguzi', 'Han Xin', 'Heino',
    'Hou Yi', 'Huang Zhong', 'Jing', 'Kaizer', 'Kongming', 'Kui', 'Lady Sun', 'Lady Zhen', 'Lam',
    'Lanling', 'Li Bai', 'Li Xin', 'Lian Po', 'Liang', 'Liu Bang', 'Liu Bei', 'Liu Shan', 'Loong',
    'Lu Bu', 'Luara', 'Luban No.7', 'Luna', 'Mai Shiranui', 'Marco Polo', 'Mayene', 'Meng Ya',
    'Menki', 'Mi Yue', 'Milady', 'Ming', 'Mozi', 'Mulan', 'Musashi', 'Nakoruru', 'Nezha', 'Nuwa',
    'Pei', 'Sakeer', 'Shangguan', 'Shi', 'Shoyue', 'Sima Yi', 'Sun Bin', 'Sun Ce', 'Ukyo Tachibana',
    'Wukong', 'Wuyan', 'Xiang Yu', 'Xiao Qiao', 'Xuan Ce', 'Yang Jian', 'Yao', 'Yaria', 'Ying',
    'Yixing', 'Yuhuan', 'Zhang Fei', 'Zhou Yu', 'Zhuangzi', 'Zilong', 'Ziya'
];

// Fungsi filterDropdown untuk control panel ONLY
function filterDropdown(id) {
    const searchInput = document.getElementById(`search-${id}`);
    if (!searchInput) return;
    
    const searchValue = searchInput.value.toLowerCase().trim();
    const dropdownItems = document.getElementById(`dropdown-items-${id}`);
    if (!dropdownItems) return;
    
    dropdownItems.innerHTML = '';
    
    if (!searchValue) {
        dropdownItems.style.display = 'none';
        return;
    }
    
    const filteredHeroes = heroNames.filter(hero => 
        hero.toLowerCase().includes(searchValue)
    );
    
    if (filteredHeroes.length === 0) {
        dropdownItems.style.display = 'none';
        return;
    }
    
    filteredHeroes.forEach(hero => {
        const item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.textContent = hero;
        item.onclick = () => {
            sendPickBanFromDropdown(id, hero);
        };
        dropdownItems.appendChild(item);
    });
    
    dropdownItems.style.display = 'block';
}

function showAllHeroesInDropdown(id) {
    const dropdownItems = document.getElementById(`dropdown-items-${id}`);
    if (!dropdownItems) return;
    
    dropdownItems.innerHTML = '';
    
    heroNames.forEach(hero => {
        const item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.textContent = hero;
        item.onclick = () => {
            sendPickBanFromDropdown(id, hero);
        };
        dropdownItems.appendChild(item);
    });
    
    dropdownItems.style.display = 'block';
}

// Fungsi untuk reset semua pick/ban
function resetAllPickBan() {
    for (let i = 1; i <= 18; i++) {
        const searchInput = document.getElementById(`search-${i}`);
        if (searchInput) {
            searchInput.value = '';
        }
        const dropdownItems = document.getElementById(`dropdown-items-${i}`);
        if (dropdownItems) {
            dropdownItems.innerHTML = '';
            dropdownItems.style.display = 'none';
        }
    }
    
    // Kirim command reset ke display
    send('resetAllDropdowns');
    console.log("All picks/bans reset");
}

// Update connection status
function updateConnectionStatus() {
    const statusElement = document.getElementById('connection-status');
    if (statusElement) {
        if (typeof localStorage !== 'undefined') {
            statusElement.textContent = '🟢 Online';
            statusElement.style.color = '#4CAF50';
        } else {
            statusElement.textContent = '🔴 Offline';
            statusElement.style.color = '#F44336';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Control panel initialized");
    
    updateConnectionStatus();
    
    // Setup untuk setiap input pick/ban
    for (let i = 1; i <= 18; i++) {
        const input = document.getElementById(`search-${i}`);
        if (input) {
            input.addEventListener('input', function() {
                filterDropdown(i);
            });
            
            input.addEventListener('focus', function() {
                showAllHeroesInDropdown(i);
            });
            
            input.addEventListener('blur', function(e) {
                setTimeout(() => {
                    const dropdownItems = document.getElementById(`dropdown-items-${i}`);
                    if (dropdownItems) {
                        dropdownItems.style.display = 'none';
                    }
                }, 200);
            });
        }
    }

    // Event listener untuk klik di mana saja di dokumen
    document.addEventListener('click', function(e) {
        const isDropdownClick = e.target.matches('.dropdown-item') || 
                               e.target.matches('.dropdown-input') ||
                               e.target.closest('.dropdown-items');
        
        if (!isDropdownClick) {
            for (let i = 1; i <= 18; i++) {
                const dropdownItems = document.getElementById(`dropdown-items-${i}`);
                if (dropdownItems) {
                    dropdownItems.style.display = 'none';
                }
            }
        }
    });
    
    // Update tombol reset pick
    const resetPickBtn = document.querySelector('button[onclick*="resetAllDropdowns"]');
    if (resetPickBtn) {
        resetPickBtn.onclick = function() {
            resetAllPickBan();
        };
    }
    
    // Setup input event listeners for nickname inputs
    for (let i = 1; i <= 10; i++) {
        const input = document.getElementById(`input${i}`);
        if (input) {
            let timeout;
            input.addEventListener('input', function() {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    sendInput(i);
                }, 300);
            });
        }
    }
    
    // Setup team input event listeners
    const teamInputs = ['team1', 'team2', 'team3', 'team4'];
    teamInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            let timeout;
            input.addEventListener('input', function() {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    sendTeam();
                }, 300);
            });
        }
    });
});

// Heartbeat untuk control panel
function setupControlHeartbeat() {
    setInterval(() => {
        localStorage.setItem("CONTROL_HEARTBEAT", Date.now());
        
        // Check for display heartbeat
        const displayHeartbeat = localStorage.getItem("DISPLAY_HEARTBEAT");
        if (displayHeartbeat) {
            const timeDiff = Date.now() - parseInt(displayHeartbeat);
            if (timeDiff < 3000) {
                document.getElementById('connection-status').textContent = '🟢 Connected';
                document.getElementById('connection-status').style.color = '#4CAF50';
            } else {
                document.getElementById('connection-status').textContent = '🟡 Display Disconnected';
                document.getElementById('connection-status').style.color = '#FF9800';
            }
        }
    }, 2000);
}

// Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... kode yang sudah ada ...
    setupControlHeartbeat();
});

// Debug function
function debugDisplay() {
    console.log("=== DEBUG DISPLAY ===");
    
    // Check all name boxes
    for (let i = 1; i <= 14; i++) {
        const element = document.getElementById(`name-box-${i}`);
        if (element) {
            console.log(`name-box-${i}: "${element.textContent}"`);
        }
    }
    
    // Check all images
    for (let i = 1; i <= 10; i++) {
        const element = document.getElementById(`image-display-${i}`);
        if (element) {
            console.log(`image-display-${i}:`, element.src ? "LOADED" : "EMPTY");
        }
    }
}

// Panggil debug function secara berkala
setInterval(debugDisplay, 5000);