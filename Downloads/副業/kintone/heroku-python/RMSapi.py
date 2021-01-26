import base64
import json
import urllib.request
import datetime
from pytz import timezone
import gspread
import json
import dateutil.parser
import datetime
from oauth2client.service_account import ServiceAccountCredentials

orderInfos = []

serviceSecret=b"SP356967_MCJz0FewG3Qmelnp"
licenseKey=b"SL356967_wW8MJjyWeit7RECD"
headers = {
    'Authorization' : b"ESA " + base64.b64encode(serviceSecret + b':' +licenseKey),
    'Content-Type': 'application/json; charset=utf-8',
}

int_st=-12

jst_st = datetime.datetime.now(timezone('Asia/Tokyo'))+ datetime.timedelta(hours=int_st)
jst_st ="{0:%Y-%m-%dT%H:%M:%S}".format(jst_st)
jst_st = str(jst_st)+"+0900"

jst_ed = datetime.datetime.now(timezone('Asia/Tokyo'))
jst_ed ="{0:%Y-%m-%dT%H:%M:%S}".format(jst_ed)
jst_ed = str(jst_ed)+"+0900"

url_productNum = 'https://api.rms.rakuten.co.jp/es/2.0/order/searchOrder/'
data_productNum = {
    "dateType":1,
    "startDatetime":jst_st,
    "endDatetime":jst_ed
}

req_productNum = urllib.request.Request(url_productNum, json.dumps(data_productNum).encode(), headers)
with urllib.request.urlopen(req_productNum) as res:
    body_productNum = res.read()

json_load_productNum = json.loads(body_productNum)

url = 'https://api.rms.rakuten.co.jp/es/2.0/order/getOrder/'
data = {
    "orderNumberList": json_load_productNum["orderNumberList"]
}

req = urllib.request.Request(url, json.dumps(data).encode(), headers)
with urllib.request.urlopen(req) as res:
    body = res.read()

json_load = json.loads(body)

for orderItem in json_load["OrderModelList"]:
  orderInfo = {
    "orderDate": '',
    "productName": '',
    "orderName": '',
    "deliveryName": '',
    "deliveryMethod": '',
    "deliveryDate": '',
    "deliveryAddress1": '',
    "paymentMethod": '',
    "orderTel": '',
    "orderPost": '',
    "orderAddress1": '',
    "orderAddress2": '',
    "deliveryTime": '',
    "deliveryTel": '',
    "deliveryPost": '',
    "deliveryAddress2": '',
    "remarks": '',
    "totalPay": '',
    "productOption": ''
  }
  order = orderItem
  orderModel = order["OrdererModel"]
  packageModel = order["PackageModelList"][0]
  orderDate = dateutil.parser.parse(order["orderDatetime"])
  orderInfo["orderDate"] = orderDate.strftime("%Y-%m-%d")
  orderInfo["productName"] = packageModel["ItemModelList"][0]["itemName"]
  orderInfo["orderName"] = orderModel["familyName"] + orderModel["firstName"]
  orderInfo["deliveryName"] = packageModel["SenderModel"]["familyName"] + packageModel["SenderModel"]["firstName"]
  orderInfo["deliveryMethod"] = order["DeliveryModel"]["deliveryName"]
  # orderInfo["deliveryDate"] = order[""]
  orderInfo["deliveryAddress1"] = packageModel["SenderModel"]["prefecture"] + packageModel["SenderModel"]["city"]
  orderInfo["paymentMethod"] = order["SettlementModel"]["settlementMethod"]
  orderInfo["orderTel"] = orderModel["phoneNumber1"] + orderModel["phoneNumber2"] + orderModel["phoneNumber3"]
  orderInfo["orderPost"] = orderModel["zipCode1"] + orderModel["zipCode2"]
  orderInfo["orderAddress1"] = orderModel["prefecture"] + orderModel["city"]
  orderInfo["orderAddress2"] = orderModel["subAddress"]
  # orderInfo["deliveryTime"] = order[""]
  orderInfo["deliveryTel"] = packageModel["SenderModel"]["phoneNumber1"] + packageModel["SenderModel"]["phoneNumber2"] + packageModel["SenderModel"]["phoneNumber3"]
  orderInfo["deliveryPost"] = packageModel["SenderModel"]["zipCode1"] + packageModel["SenderModel"]["zipCode2"]
  orderInfo["deliveryAddress2"] = packageModel["SenderModel"]["subAddress"]
  orderInfo["remarks"] = order["remarks"]
  orderInfo["totalPay"] = order["totalPrice"]
  orderInfo["productOption"] = packageModel["ItemModelList"][0]["selectedChoice"]
  orderInfos.append(orderInfo)

scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('nextengine-to-gmail-9975c50044fc.json', scope)
gc = gspread.authorize(credentials)
SPREADSHEET_KEY = '16j1iXV0CkFGTPwwIfU_0S15vN765dakcvw57ow57AbY'
workbook = gc.open_by_key(SPREADSHEET_KEY)
worksheetImport = workbook.worksheet('import')
worksheetBackup = workbook.worksheet('backup')

for objInfo in orderInfos:
  insertInfo = []
  for value in objInfo.values():
    insertInfo.append(value)
  worksheetImport.append_row(insertInfo)
  worksheetBackup.append_row(insertInfo)

# key一覧
# print (order[0].keys())
# print (order[0]["OrdererModel"])
# print (order[0]["prefecture"])