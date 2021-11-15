
from .common import db, session, auth
from .models import get_user_email

def check_admin():
    account = db(db.account.email == get_user_email()).select().first()
    if account == None:
        return False
    if account.permission_level > 0:
        return account.permission_level
    return 0

def names_list(list):
    new_list = []
    for i in range(len(list)):
        if 'name' in list[i]:
            new_list.append(list[i]['name'])
    return new_list
