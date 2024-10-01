// 로컬 저장소에서 식당 목록 가져오기
let restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
let weeklyMenu = JSON.parse(localStorage.getItem('weeklyMenu')) || null;
let menuLog = JSON.parse(localStorage.getItem('menuLog')) || [];

// 페이지가 로드될 때 식당 목록, 이번 주 식단, 지난 식단 기록 표시
window.onload = function() {
    displayRestaurants();
    if (weeklyMenu) {
        displayWeeklyMenu(weeklyMenu);
    }
    displayLog();
}

// 식당 추가
function addRestaurant() {
    const restaurantName = document.getElementById("restaurant-name").value;
    if (restaurantName && !restaurants.includes(restaurantName)) {
        restaurants.push(restaurantName);
        localStorage.setItem('restaurants', JSON.stringify(restaurants));
        displayRestaurants();
    }
}

// 식당 제거
function removeRestaurant() {
    const restaurantName = document.getElementById("restaurant-name").value;
    if (restaurantName && restaurants.includes(restaurantName)) {
        restaurants = restaurants.filter(r => r !== restaurantName);
        localStorage.setItem('restaurants', JSON.stringify(restaurants));
        displayRestaurants();
    }
}

// 등록된 식당 목록 표시
function displayRestaurants() {
    const restaurantList = document.getElementById("restaurants");
    restaurantList.innerHTML = '';
    restaurants.forEach(restaurant => {
        const li = document.createElement("li");
        li.textContent = restaurant;
        restaurantList.appendChild(li);
    });
}

// 주간 식단 생성
function generateWeeklyMenu() {
    if (restaurants.length < 5) {
        alert("최소 5개의 식당이 필요합니다.");
        return;
    }

    const days = ["월", "화", "수", "목", "금"];
    const shuffledRestaurants = [...restaurants];
    shuffledRestaurants.sort(() => Math.random() - 0.5); // 식당 목록 섞기

    const newWeeklyMenu = {};
    for (let i = 0; i < 5; i++) {
        newWeeklyMenu[days[i]] = shuffledRestaurants[i];
    }

    // 새로운 식단을 기록하고 저장
    addToLog(weeklyMenu);  // 이전 식단을 로그에 추가
    weeklyMenu = newWeeklyMenu;  // 새로운 식단을 이번 주 식단으로 설정
    localStorage.setItem('weeklyMenu', JSON.stringify(weeklyMenu));

    displayWeeklyMenu(weeklyMenu);
}

// 이번 주 식단을 HTML에 표시
function displayWeeklyMenu(menu) {
    const weeklyMenuElement = document.getElementById("weekly-menu");
    weeklyMenuElement.innerHTML = '';

    for (const day in menu) {
        const li = document.createElement("li");
        li.textContent = `${day}: ${menu[day]}`;
        weeklyMenuElement.appendChild(li);
    }
}

// 지난 주 기록을 로컬 저장소에 추가하고 업데이트
function addToLog(oldMenu) {
    if (oldMenu) {
        menuLog.push(oldMenu);  // 이전 메뉴를 로그에 추가
        localStorage.setItem('menuLog', JSON.stringify(menuLog));
        displayLog();  // 로그를 다시 표시
    }
}

// 지난 주 식단 기록을 화면에 표시
function displayLog() {
    const logContent = document.getElementById("log-content");
    logContent.innerHTML = '';  // 기존 로그 지우기

    menuLog.forEach((menu, index) => {
        const div = document.createElement("div");
        div.className = "log-entry";
        div.innerHTML = `<h3>지난 주 식단 ${index + 1}</h3>`;
        const ul = document.createElement("ul");

        for (const day in menu) {
            const li = document.createElement("li");
            li.textContent = `${day}: ${menu[day]}`;
            ul.appendChild(li);
        }

        div.appendChild(ul);
        logContent.appendChild(div);
    });
}
