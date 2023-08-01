set startsla = createobject("wscript.shell")
strUser = CreateObject("WScript.Network").UserName
startsla.run"cmd /k taskkill /im JUPITER-DTGI.exe /f", 0
 wscript.sleep 200
startsla.run"cmd /k  taskkill /im JUPITER-DTGI.exe /f", 0 
wscript.sleep 20000
startsla.run"cmd /k C:/Users/"+strUser+"/AppData/Local/Programs/jupiter-dtgi/JUPITER-DTGI.exe", 0