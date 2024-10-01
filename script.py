import random
import datetime
import os

# 음식점 목록
restaurants = ["식당1", "식당2", "식당3", "식당4", "식당5", "식당6", "식당7"]

def assign_restaurants_to_days(restaurants):
    days = ["월", "화", "수", "목", "금"]
    random.shuffle(restaurants)
    week_menu = {day: restaurants[i] for i, day in enumerate(days)}
    return week_menu

def save_weekly_menu(week_menu):
    current_week = datetime.datetime.now().strftime("%Y-%W")
    log_dir = "logs"
    os.makedirs(log_dir, exist_ok=True)
    filename = os.path.join(log_dir, f"week_{current_week}.md")
    
    with open(filename, "w", encoding="utf-8") as f:
        f.write(f"# Week {current_week} Menu\n\n")
        for day, restaurant in week_menu.items():
            f.write(f"- **{day}**: {restaurant}\n")
    return filename

# 실행 예시
week_menu = assign_restaurants_to_days(restaurants)
save_weekly_menu(week_menu)
