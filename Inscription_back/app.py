from flask import Flask, flash, request, redirect, url_for,jsonify
import cv2
from pytesseract import pytesseract
import cv2
import json
from flask_cors import CORS
import signature_extractor
from signature import match 
import os
from werkzeug.utils import secure_filename
import secrets
from flask_mysqldb import MySQL
from config import Config
from flask_mail import Mail, Message

secret = secrets.token_urlsafe(32)


path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
UPLOAD_FOLDER ='C:\\Users\\Fujitsu\\Signature-Matching\\assets'
pytesseract.tesseract_cmd = path_to_tesseract


app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = { 'pdf', 'png', 'jpg', 'jpeg'}
app.secret_key = secret
app.config.from_object(Config)
mail = Mail(app)

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Bh1533SY'
app.config['MYSQL_DB'] = 'bd'
app.config['MYSQL_HOST'] = 'localhost'
mysql = MySQL(app)

@app.route('/api/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST': 
        cont = request.json
         # retrieve form data
        user = cont['matricule']
        password = cont['password']  
        # check if login credentials are correct
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM admis WHERE matricule=%s AND password=%s''', (user, password))
        account = cur.fetchone()
        return json.dumps(account)

@app.route('/api/exist/<CIN>', methods=['GET', 'POST'])
def exist(CIN):
    if request.method == 'GET': 
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM admis WHERE matricule=%s''', (CIN,))
        account = cur.fetchone()
        print(account)
        if account:
            return json.dumps(True)
        return json.dumps(False)


@app.route('/api/update/', methods=['POST'])
def update_record():
    # Connect to the database
    cont = request.get_json()
    print(cont)
    prenom = cont['prenom']
    nom =cont['nom']
    cursor = mysql.connection.cursor()
    # Write the UPDATE statement

    cursor.execute('''UPDATE admis SET nom=%s, prenom=%s, email =%s, tel=%s WHERE matricule=%s''', (cont['nom'], prenom,cont['email'], cont['tel'],cont['matricule']))
    mysql.connection.commit()
    return json.dumps(True)


@app.route('/api/user/<matricule>', methods=['GET'])
def getUser(matricule):  
        # check if login credentials are correct
        cur = mysql.connection.cursor()
        cur.execute('''SELECT nom ,prenom ,email,tel,imagecin,final FROM admis WHERE matricule=%s ''', (matricule,))
        account = cur.fetchone()
        return json.dumps(account)

def grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# noise removal
def remove_noise(image):
    return cv2.medianBlur(image,5)
  
# thresholding
def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
# dilation
def dilate(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.dilate(image, kernel, iterations = 1)
     
# erosion
def erode(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.erode(image, kernel, iterations = 1)
# opening - erosion followed by dilation
def opening(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)
# canny edge detection
def canny(image):
    return cv2.Canny(image, 100, 200)
# skew correction
def deskew(image):
    coords = np.column_stack(np.where(image > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)
    else:
        angle = -angle
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return rotated
# template matching
def match_template(image, template):
    return cv2.matchTemplate(image, template, cv2.TM_CCOEFF_NORMED) 

def prenom(phrase):
   i=0
   while True:
      if phrase[i+95]==" ":
         return i+95
      i=i+1

def nom(phrase):
   debutnom=prenom(phrase)+7
   i=0
   while True:
      if phrase[i+debutnom]==" ":
         return i+debutnom
      i=i+1





@app.route('/api/ocr/<url>', methods=['GET', 'POST'])
def ocr(url):
    if request.method == 'POST':
        return "hihi"
    else:
        img = cv2.imread("./assets/"+url)
        retouche = thresholding(grayscale(remove_noise(img)))
        text = pytesseract.image_to_string(retouche)
        
        l={"prenom":text[95:prenom(text)],"nom":text[107:nom(text)],"cin":text[nom(text)+136:nom(text)+144]}
        json_disk = json.dumps(l)
        return json_disk.encode()


@app.route('/api/signature/<url>', methods=['GET'])
def signature(url):
   signature_extractor.signature_extractor(url)
   path1 ="C:\\Users\\Fujitsu\\Signature-Matching\\assets\\output.png"
   path2 ="C:\\Users\\Fujitsu\\Signature-Matching\\assets\\"+url
   result = match(path1=path1,path2= path2)
   print(result)
   #result = json.dumps(match(path1=path1,path2= path2))
   if (result > 70):
    return json.dumps(True)
   else:
    return json.dumps(False)


# @app.route('/api/Verify/', methods = ['POST', 'GET'])
# def verifier(cin):
#     for i in L:
#         if (i==cin):
#             return json.dumps(True)
#     return json.dumps(False)

#UpLoad file :
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload/<cin>', methods = ['POST', 'GET'])
def upload_file(cin):
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return json.dumps("No file part")
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return json.dumps("No selected file")
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            name = cin +'.'+filename.rsplit('.', 1)[1].lower()
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], name))
            return json.dumps(name)

@app.route("/api/upload/bd/", methods=["POST"])
def upload():
    cur = mysql.connection.cursor()
    cont = request.get_json()
    if cont: 
            insert_blob_query = '''UPDATE admis SET imageCin = %s WHERE matricule= %s'''
            cur.execute(insert_blob_query, (True,cont["matricule"]))
            mysql.connection.commit()
            return json.dumps("File uploaded successfully")

@app.route("/api/send/<matricule>/<acc>")
def send(matricule,acc):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT email, nom,prenom FROM admis WHERE matricule=%s ''', (matricule,))
    account = cur.fetchone()
    print(account[0])
    msg = Message(
        "Confirmation d'inscription",
        recipients=[account[0]]
    )
    #msg.body = 'Corps de mon message'
    if(acc == 1):
         msg.html = " Cher "+ account[1]+" "+account[2] +",\n Nous sommes heureux de vous informer que votre inscription à notre plateforme  a été reçue et acceptée. \n Bien à vous."
    else:
        msg.html = " Cher "+ account[1]+" "+account[2] +",\n Vous vennez de modifier vos informations personnelles sur notre plateforme. Est ce qu'il s'agit bien de vous?\n Bien à vous."

    mail.send(msg)
    insert_blob_query = '''UPDATE admis SET final = %s WHERE matricule= %s'''
    cur.execute(insert_blob_query, (True,matricule))
    mysql.connection.commit()
    return json.dumps('Message envoyé')



