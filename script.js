// 로컬 저장소에서 식당 목록 가져오기
let restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];

// 페이지가 로드될 때 식당 목록과 로그 표시
window.onload = function() {
    displayRestaurants();
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
    const shuffledRestaurants = [...restaurants]; // 기존 배열을 복사해서 사용
    shuffledRestaurants.sort(() => Math.random() - 0.5); // 식당 목록 섞기

    const weeklyMenu = {};
    for (let i = 0; i < 5; i++) {
        weeklyMenu[days[i]] = shuffledRestaurants[i];
    }

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

// 지난 주 기록을 표시하는 함수
function displayLog() {
    fetch('logs/')
        .then(response => response.text())
        .then(data => {
            document.getElementById('log-content').innerHTML = data;
        });
}
