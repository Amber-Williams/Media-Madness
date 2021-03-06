import sys
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time

def main():
    try:
        print("E2E TEST STARTED")
        options = Options()
        options.headless = False
        options.add_experimental_option("detach", True)
        driver0 = webdriver.Chrome(ChromeDriverManager().install(), options=options)
        driver1 = webdriver.Chrome(ChromeDriverManager().install(), options=options)
        driver2 = webdriver.Chrome(ChromeDriverManager().install(), options=options)

        print("Drivers created")
        # Pulls up central screen and gets room code
        url_central = "http://localhost:3000/central"
        driver0.get(url_central)
        room_code = WebDriverWait(driver0, 5).until(
            EC.element_to_be_clickable((By.ID, "roomCodeId"))
        )
        room_code_id = room_code.text
        print(f'Room is: {room_code_id}')

        # Pulls up both users and submits to both to same room
        log_in_user(driver1, room_code_id, '1')
        log_in_user(driver2, room_code_id, '2')
        print('Logged in both users into room')

        time.sleep(2)
        # Starts game from central screen
        start_game = WebDriverWait(driver0, 5).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Start Game')]"))
        )
        start_game.click()
        print('Game started')

        
        # Both users submit answer
        submit_answer(driver1, "homer")
        submit_answer(driver2, "bart")
        print('Submitted answers')
        

        # Both select what gif they like
        select_winner(driver1)
        select_winner(driver2)
        print('Selected winner')

        print("PASSED")
        driver0.close()
        driver1.close()
        driver2.close()
        print('Drivers closed')
    except:
        print("FAILED")
        driver0.close()
        driver1.close()
        driver2.close()
        print('Drivers closed')

def log_in_user(driver, room_code_id, num):
    url_user = "http://localhost:3000/user"
    driver.get(url_user)

    room_code_text_box = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.ID, "roomCodeIs"))
    )
    room_code_text_box.click()
    room_code_text_box.send_keys(room_code_id)

    username_text_box = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.ID, "userIs"))
    )
    username_text_box.click()
    username_text_box.send_keys(f"user {num}")

    submit = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Submit')]"))
    )
    submit.click()

def submit_answer(driver, search_term):
    search_box = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.ID, "searched"))
    )
    search_box.click()
    search_box.send_keys(search_term)

    submit_search_term = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Search')]"))
    )
    submit_search_term.click()

    select_gif = WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@class='gifsLoaded']/ul/li/img[1]"))
    )
    select_gif.click()

    submit = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Submit')]"))
    )
    submit.click()

def select_winner(driver):
    select_winner = WebDriverWait(driver, 30).until(
        EC.element_to_be_clickable((By.XPATH, "//div[@class='gifsLoaded']/ul/li/img[1]"))
    )
    select_winner.click()


if __name__ == '__main__':
    main()