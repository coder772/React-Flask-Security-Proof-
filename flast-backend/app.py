import os

from flask import Flask, render_template_string
from flask_security import Security, current_user, auth_required, hash_password, \
     SQLAlchemySessionUserDatastore
from db import db_session, init_db
from models import User,Role
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS, cross_origin
from flask_mail import Mail
from flask import json
from config import SECRET_KEY,SECURITY_PASSWORD_SALT,MAIL_PASSWORD,MAIL_SERVER,MAIL_USERNAME,MAIL_PORT

app = Flask(__name__)
app.config['DEBUG'] = True

app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", SECRET_KEY)
app.config['SECURITY_PASSWORD_SALT'] = os.environ.get("SECURITY_PASSWORD_SALT",SECURITY_PASSWORD_SALT)
app.config['SECURITY_FLASH_MESSAGES'] = False
app.config['SECURITY_RECOVERABLE'] = True
app.config['SECURITY_TRACKABLE'] = True
app.config['SECURITY_CHANGEABLE'] = True
app.config['SECURITY_CONFIRMABLE'] = True
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_POST_CONFIRM_VIEW'] = "/confirmed"
app.config['SECURITY_CONFIRM_ERROR_VIEW'] = "/confirm-error"
app.config['SECURITY_RESET_VIEW'] = "/reset-password"
app.config['SECURITY_RESET_ERROR_VIEW'] = "/reset-password"
app.config['SECURITY_REDIRECT_BEHAVIOR'] = "spa"
app.config['SECURITY_CSRF_PROTECT_MECHANISMS'] = ["session", "basic"]
app.config['SECURITY_EMAIL_SENDER'] = 'tamjeedhur@gmail.com'
app.config['SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS'] = True
app.config['SECURITY_CSRF_COOKIE_NAME'] = "XSRF-TOKEN"
app.config['SECURITY_SEND_REGISTER_EMAIL'] = True
app.config['WTF_CSRF_CHECK_DEFAULT'] = False
app.config['WTF_CSRF_TIME_LIMIT'] = None
app.config['WTF_CSRF_ENABLED'] = False
app.config['MAIL_SERVER'] = MAIL_SERVER
app.config['MAIL_PORT'] = MAIL_PORT
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = MAIL_USERNAME
app.config['MAIL_PASSWORD'] = MAIL_PASSWORD

mail = Mail(app)
cors = CORS(app, 
    supports_credentials=True,
    resources="/*",
    allow_headers="*",
    origins=["http://localhost:3000","http://localhost:5000"],
    expose_headers="*"
)

app.config['CORS_HEADERS'] = 'Content-Type'
CSRFProtect(app)

user_datastore = SQLAlchemySessionUserDatastore(db_session, User, Role)
security = Security(app, user_datastore)

@app.before_first_request
def create_user():
    init_db()
    if not user_datastore.find_user(email="test@me.com"):
        user_datastore.create_user(email="test@me.com", password=hash_password("password"))
    db_session.commit()

@app.route("/")
@auth_required()
def home():
    data = {"message": "success", "user_email": current_user.email}
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == '__main__':
    app.run()