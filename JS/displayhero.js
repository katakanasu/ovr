// displayhero.js - DIPERBAIKI
document.addEventListener('DOMContentLoaded', function() {
    console.log("Display hero script initialized");
    
    // Hero data yang benar
    const heroData = [
        { name: 'Agudo', img: '/../Assets/HeroPick/Agudo.png' },
        { name: 'Alessio', img: '/../Assets/HeroPick/Alessio.png' },
        { name: 'Allain', img: '/../Assets/HeroPick/Allain.png' },
        { name: 'Angela', img: '/../Assets/HeroPick/Angela.png' },
        { name: 'Arke', img: '/../Assets/HeroPick/Arke.png' },
        { name: 'Arli', img: '/../Assets/HeroPick/Arli.png' },
        { name: 'Arthur', img: '/../Assets/HeroPick/Arthur.png' },
        { name: 'Ata', img: '/../Assets/HeroPick/Ata.png' },
        { name: 'Athena', img: '/../Assets/HeroPick/Athena.png' },
        { name: 'Augran', img: '/../Assets/HeroPick/Augran.png' },
        { name: 'Biron', img: '/../Assets/HeroPick/Biron.png' },
        { name: 'Butterfly', img: '/../Assets/HeroPick/Butterfly.png' },
        { name: 'Cai Yan', img: '/../Assets/HeroPick/Cai Yan.png' },
        { name: 'Charlotte', img: '/../Assets/HeroPick/Charlotte.png' },
        { name: 'Cirrus', img: '/../Assets/HeroPick/Cirrus.png' },
        { name: 'Consort Yu', img: '/../Assets/HeroPick/Consort yu.png' },
        { name: 'Da qiao', img: '/../Assets/HeroPick/Da Qiao.png' },
        { name: 'Daji', img: '/../Assets/HeroPick/Daji.png' },
        { name: 'Dharma', img: '/../Assets/HeroPick/Dharma.png' },
        { name: 'Di Renjie', img: '/../Assets/HeroPick/Di Renjie.png' },
        { name: 'Dian Wei', img: '/../Assets/HeroPick/Dian Wei.png' },
        { name: 'Diaochan', img: '/../Assets/HeroPick/Diaochan.png' },
        { name: 'Dolia', img: '/../Assets/HeroPick/Dolia.png' },
        { name: 'Donghuang', img: '/../Assets/HeroPick/Donghuang.png' },
        { name: 'Dr Bian', img: '/../Assets/HeroPick/Dr Bian.png' },
        { name: 'Dun', img: '/../Assets/HeroPick/Dun.png' },
        { name: 'Dyadia', img: '/../Assets/HeroPick/Dyadia.png' },
        { name: 'Erin', img: '/../Assets/HeroPick/Erin.png' },
        { name: 'Fang', img: '/../Assets/HeroPick/Fang.png' },
        { name: 'Frost', img: '/../Assets/HeroPick/Frost.png' },
        { name: 'Fuzi', img: '/../Assets/HeroPick/Fuzi.png' },
        { name: 'Ganmo', img: '/../Assets/HeroPick/Ganmo.png' },
        { name: 'Gao', img: '/../Assets/HeroPick/Gao.png' },
        { name: 'Garo', img: '/../Assets/HeroPick/Garo.png' },
        { name: 'Guan Yu', img: '/../Assets/HeroPick/Guan Yu.png' },
        { name: 'Guiguzi', img: '/../Assets/HeroPick/Guiguzi.png' },
        { name: 'Han Xin', img: '/../Assets/HeroPick/Han Xin.png' },
        { name: 'Heino', img: '/../Assets/HeroPick/Heino.png' },
        { name: 'Hou Yi', img: '/../Assets/HeroPick/Hou Yi.png' },
        { name: 'Huang Zhong', img: '/../Assets/HeroPick/Huang Zhong.png' },
        { name: 'Jing', img: '/../Assets/HeroPick/Jing.png' },
        { name: 'Kaizer', img: '/../Assets/HeroPick/Kaizer.png' },
        { name: 'Kongming', img: '/../Assets/HeroPick/Kongming.png' },
        { name: 'Kui', img: '/../Assets/HeroPick/Kui.png' },
        { name: 'Lady Sun', img: '/../Assets/HeroPick/Lady Sun.png' },
        { name: 'Lady Zhen', img: '/../Assets/HeroPick/Lady Zhen.png' },
        { name: 'Lam', img: '/../Assets/HeroPick/Lam.png' },
        { name: 'Lanling', img: '/../Assets/HeroPick/Lanling.png' },
        { name: 'Li Bai', img: '/../Assets/HeroPick/Li Bai.png' },
        { name: 'Li Xin', img: '/../Assets/HeroPick/Li Xin.png' },
        { name: 'Lian Po', img: '/../Assets/HeroPick/Lian Po.png' },
        { name: 'Liang', img: '/../Assets/HeroPick/Liang.png' },
        { name: 'Liu Bang', img: '/../Assets/HeroPick/Liu Bang.png' },
        { name: 'Liu Bei', img: '/../Assets/HeroPick/Liu Bei.png' },
        { name: 'Liu Shan', img: '/../Assets/HeroPick/Liu Shan.png' },
        { name: 'Loong', img: '/../Assets/HeroPick/Loong.png' },
        { name: 'Lu Bu', img: '/../Assets/HeroPick/Lu Bu.png' },
        { name: 'Luara', img: '/../Assets/HeroPick/Luara.png' },
        { name: 'Luban No.7', img: '/../Assets/HeroPick/Luban No.7.png' },
        { name: 'Luna', img: '/../Assets/HeroPick/Luna.png' },
        { name: 'Mai Shiranui', img: '/../Assets/HeroPick/Mai Shiranui.png' },
        { name: 'Marco Polo', img: '/../Assets/HeroPick/Marco Polo.png' },
        { name: 'Mayene', img: '/../Assets/HeroPick/Mayene.png' },
        { name: 'Meng Ya', img: '/../Assets/HeroPick/Meng Ya.png' },
        { name: 'Menki', img: '/../Assets/HeroPick/Menki.png' },
        { name: 'Mi Yue', img: '/../Assets/HeroPick/Mi Yue.png' },
        { name: 'Milady', img: '/../Assets/HeroPick/Milady.png' },
        { name: 'Ming', img: '/../Assets/HeroPick/Ming.png' },
        { name: 'Mozi', img: '/../Assets/HeroPick/Mozi.png' },
        { name: 'Mulan', img: '/../Assets/HeroPick/Mulan.png' },
        { name: 'Musashi', img: '/../Assets/HeroPick/Musashi.png' },
        { name: 'Nakoruru', img: '/../Assets/HeroPick/Nakoruru.png' },
        { name: 'Nezha', img: '/../Assets/HeroPick/Nezha.png' },
        { name: 'Nuwa', img: '/../Assets/HeroPick/Nuwa.png' },
        { name: 'Pei', img: '/../Assets/HeroPick/Pei.png' },
        { name: 'Sakeer', img: '/../Assets/HeroPick/Sakeer.png' },
        { name: 'Shangguan', img: '/../Assets/HeroPick/Shangguan.png' },
        { name: 'Shi', img: '/../Assets/HeroPick/Shi.png' },
        { name: 'Shoyue', img: '/../Assets/HeroPick/Shoyue.png' },
        { name: 'Sima Yi', img: '/../Assets/HeroPick/Sima Yi.png' },
        { name: 'Sun Bin', img: '/../Assets/HeroPick/Sun Bin.png' },
        { name: 'Sun Ce', img: '/../Assets/HeroPick/Sun Ce.png' },
        { name: 'Ukyo Tachibana', img: '/../Assets/HeroPick/Ukyo Tachibana.png' },
        { name: 'Wukong', img: '/../Assets/HeroPick/Wukong.png' },
        { name: 'Wuyan', img: '/../Assets/HeroPick/Wuyan.png' },
        { name: 'Xiang Yu', img: '/../Assets/HeroPick/Xiang Yu.png' },
        { name: 'Xiao Qiao', img: '/../Assets/HeroPick/Xiao Qiao.png' },
        { name: 'Xuan Ce', img: '/../Assets/HeroPick/Xuan Ce.png' },
        { name: 'Yang Jian', img: '/../Assets/HeroPick/Yang Jian.png' },
        { name: 'Yao', img: '/../Assets/HeroPick/Yao.png' },
        { name: 'Yaria', img: '/../Assets/HeroPick/Yaria.png' },
        { name: 'Ying', img: '/../Assets/HeroPick/Ying.png' },
        { name: 'Yixing', img: '/../Assets/HeroPick/Yixing.png' },
        { name: 'Yuhuan', img: '/../Assets/HeroPick/Yuhuan.png' },
        { name: 'Zhang Fei', img: '/../Assets/HeroPick/Zhang Fei.png' },
        { name: 'Zhou Yu', img: '/../Assets/HeroPick/Zhou Yu.png' },
        { name: 'Zhuangzi', img: '/../Assets/HeroPick/Zhuangzi.png' },
        { name: 'Zilong', img: '/../Assets/HeroPick/Zilong.png' },
        { name: 'Ziya', img: '/../Assets/HeroPick/Ziya.png' },
    ];

    // PERBAIKAN: Slot mapping yang benar (sesuai dengan HTML yang diperbaiki)
    const slotMapping = {
        1: { nickname: 'name-box-3', image: 'image-display-1', nameImageBox: 'name-image-box-3', pickElement: '.pick[data-slot="1"]' },
        2: { nickname: 'name-box-4', image: 'image-display-2', nameImageBox: 'name-image-box-4', pickElement: '.pick[data-slot="2"]' },
        3: { nickname: 'name-box-5', image: 'image-display-3', nameImageBox: 'name-image-box-5', pickElement: '.pick[data-slot="3"]' },
        4: { nickname: 'name-box-6', image: 'image-display-4', nameImageBox: 'name-image-box-6', pickElement: '.pick[data-slot="4"]' },
        5: { nickname: 'name-box-7', image: 'image-display-5', nameImageBox: 'name-image-box-7', pickElement: '.pick[data-slot="5"]' },
        10: { nickname: 'name-box-10', image: 'image-display-6', nameImageBox: 'name-image-box-10', pickElement: '.pick[data-slot="10"]' },
        11: { nickname: 'name-box-11', image: 'image-display-7', nameImageBox: 'name-image-box-11', pickElement: '.pick[data-slot="11"]' },
        12: { nickname: 'name-box-12', image: 'image-display-8', nameImageBox: 'name-image-box-12', pickElement: '.pick[data-slot="12"]' },
        13: { nickname: 'name-box-13', image: 'image-display-9', nameImageBox: 'name-image-box-13', pickElement: '.pick[data-slot="13"]' },
        14: { nickname: 'name-box-14', image: 'image-display-10', nameImageBox: 'name-image-box-14', pickElement: '.pick[data-slot="14"]' }
    };
    
    // Function untuk mendapatkan hero image path
    function getHeroImagePath(heroName) {
        if (!heroName || heroName.trim() === '') return '';
        
        // Cari hero dengan case-insensitive
        const hero = heroData.find(h => 
            h.name.toLowerCase() === heroName.toLowerCase().trim()
        );
        
        if (hero) {
            console.log(`Found hero image: ${hero.img} for ${heroName}`);
            return hero.img;
        } else {
            console.warn(`Hero not found in data: ${heroName}`);
            // Coba format nama untuk mencari file
            const formattedName = heroName.replace(/[^a-zA-Z0-9]/g, '');
            return `/../Assets/HeroPick/${formattedName}.png`;
        }
    }
    
    // Function untuk mendapatkan hero icon path
    function getHeroIconPath(heroName) {
        if (!heroName) return '';
        const formattedName = heroName.replace(/[^a-zA-Z0-9]/g, '');
        return `/../Assets/HeroPick/${formattedName}.png`;
    }
    
    // Function untuk menampilkan hero pick dengan animasi
    function displayHeroPick(slotId, heroName) {
        const mapping = slotMapping[slotId];
        if (!mapping) {
            console.error(`No mapping found for slotId: ${slotId}`);
            return;
        }
        
        console.log(`Displaying hero: "${heroName}" in slot ${slotId}`);
        
        // Update hero image
        const imageElement = document.getElementById(mapping.image);
        if (imageElement) {
            const imagePath = getHeroImagePath(heroName);
            
            // Add fade animation
            imageElement.classList.add('fade-out');
            
            setTimeout(() => {
                imageElement.src = imagePath;
                imageElement.alt = heroName;
                
                // Handle image load error
                imageElement.onerror = function() {
                    console.error(`Failed to load hero image: ${imagePath}`);
                    imageElement.src = '';
                    imageElement.alt = 'Hero image not found';
                    
                    // Show text in nickname box as fallback
                    const nicknameElement = document.getElementById(mapping.nickname);
                    if (nicknameElement) {
                        nicknameElement.textContent = heroName;
                    }
                };
                
                // Fade in new image
                setTimeout(() => {
                    imageElement.classList.remove('fade-out');
                    imageElement.classList.add('fade-in');
                    setTimeout(() => imageElement.classList.remove('fade-in'), 500);
                }, 50);
            }, 300);
        }
        
        // Update hero icon in name-image-box
        const nameImageBox = document.getElementById(mapping.nameImageBox);
        if (nameImageBox) {
            const iconPath = getHeroIconPath(heroName);
            nameImageBox.innerHTML = '';
            
            if (iconPath) {
                const iconImg = document.createElement('img');
                iconImg.src = iconPath;
                iconImg.alt = `${heroName} Icon`;
                iconImg.style.width = '40px';
                iconImg.style.height = '40px';
                iconImg.style.objectFit = 'contain';
                
                iconImg.onerror = function() {
                    console.log(`Hero icon not found: ${iconPath}`);
                    // Show text as fallback
                    nameImageBox.innerHTML = `<span style="color: white; font-size: 14px; font-weight: bold;">${heroName}</span>`;
                };
                
                nameImageBox.appendChild(iconImg);
            }
        }
        
        // Highlight the pick box
        const pickElement = document.querySelector(mapping.pickElement);
        if (pickElement) {
            // Blue team: slots 1-5, Red team: slots 10-14
            if (slotId >= 1 && slotId <= 5) {
                pickElement.classList.add('highlight-blue');
                setTimeout(() => pickElement.classList.remove('highlight-blue'), 2000);
            } else if (slotId >= 10 && slotId <= 14) {
                pickElement.classList.add('highlight-red');
                setTimeout(() => pickElement.classList.remove('highlight-red'), 2000);
            }
        }
    }
    
    // Function untuk reset pick
    function resetPick(slotId) {
        const mapping = slotMapping[slotId];
        if (!mapping) return;
        
        console.log(`Resetting slot ${slotId}`);
        
        // Clear hero image
        const imageElement = document.getElementById(mapping.image);
        if (imageElement) {
            imageElement.classList.add('fade-out');
            setTimeout(() => {
                imageElement.src = '';
                imageElement.alt = '';
                imageElement.classList.remove('fade-out');
            }, 300);
        }
        
        // Clear hero icon
        const nameImageBox = document.getElementById(mapping.nameImageBox);
        if (nameImageBox) nameImageBox.innerHTML = '';
    }
    
    // Function untuk memproses pick/ban update
    function processPickBanUpdate() {
        try {
            const pickBanData = localStorage.getItem("PICKBAN_UPDATE");
            if (!pickBanData) return;
            
            const data = JSON.parse(pickBanData);
            console.log("Pick/Ban data received:", data);
            
            // Process picks (slots 1-5, 10-14)
            if ((data.slot >= 1 && data.slot <= 5) || (data.slot >= 10 && data.slot <= 14)) {
                if (data.hero && data.hero.trim() !== '') {
                    displayHeroPick(data.slot, data.hero);
                } else {
                    resetPick(data.slot);
                }
            }
            
            // Store last update time
            localStorage.setItem("LAST_PICKBAN_UPDATE", Date.now());
            
            // Clear data setelah diproses
            localStorage.removeItem("PICKBAN_UPDATE");
            
        } catch (error) {
            console.error("Error processing pick/ban update:", error);
        }
    }
    
    // Function untuk reset semua picks
    function resetAllPicks() {
        console.log("Resetting all picks");
        for (const slotId in slotMapping) {
            resetPick(parseInt(slotId));
        }
    }
    
    // Function untuk mengecek command dari control panel
    function checkControlCommands() {
        try {
            const cmdData = localStorage.getItem("CONTROL_CMD");
            if (!cmdData) return;
            
            const [command, timestamp] = cmdData.split("|");
            console.log("Command received:", command);
            
            switch(command) {
                case "resetAllPicks":
                    resetAllPicks();
                    break;
                case "showDraft":
                    document.querySelector('.mainbox').style.opacity = '1';
                    break;
                case "hideDraft":
                    document.querySelector('.mainbox').style.opacity = '0.5';
                    break;
                default:
                    console.log(`Unknown command: ${command}`);
            }
            
            // Clear command setelah diproses
            localStorage.removeItem("CONTROL_CMD");
            
            // Send response back
            localStorage.setItem("DISPLAY_RESPONSE", `${command}_executed|${Date.now()}`);
            
        } catch (error) {
            console.error("Error processing command:", error);
        }
    }
    
    // Function untuk mengecek semua update
    function checkForUpdates() {
        processPickBanUpdate();
        checkControlCommands();
    }
    
    // Setup interval untuk mengecek update
    const updateInterval = setInterval(checkForUpdates, 300);
    
    // Initial check
    setTimeout(checkForUpdates, 150);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(updateInterval);
    });
    
    // Initialize defaults
    function initializeDefaults() {
        console.log("Initializing hero display defaults");
        // Clear all picks on startup
        setTimeout(resetAllPicks, 200);
    }
    
    // Initialize setelah delay kecil
    setTimeout(initializeDefaults, 300);
    
    // Expose functions for debugging
    window.displayHeroPick = displayHeroPick;
    window.resetAllPicks = resetAllPicks;
    window.heroData = heroData;
    window.slotMapping = slotMapping;
});
