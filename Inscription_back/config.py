class Config:
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'yourokenman@gmail.com'
    MAIL_PASSWORD = 'ieefnwoeftemqceu'

    MAIL_DEBUG = True
    MAIL_SUPPRESS_SEND = False

    MAIL_DEFAULT_SENDER = ('Flask Mailer', 'fausse.adressse@gmail.com')
    MAIL_MAX_EMAILS = None

    MAIL_ASCII_ATTACHMENTS = False
