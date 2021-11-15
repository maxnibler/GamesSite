"""
This file defines the database models
"""

import datetime
from .common import db, Field, auth
from pydal.validators import *


def get_user_email():
    return auth.current_user.get('email') if auth.current_user else None

def get_time():
    return datetime.datetime.utcnow()


### Define your table below
#
# db.define_table('thing', Field('name'))
#
## always commit your models to avoid problems later

db.define_table(
    'account',
    Field('user', 'reference auth_user'),
    Field('email'),
    Field('creation_date', 'datetime', default=get_time),
    Field('permission_level', 'integer', default=0)
)

db.define_table(
    'blurbs',
    Field('title'),
    Field('tag'),
    Field('body'),
    Field('creation_date', 'datetime', default=get_time),
    Field('created_by', default=get_user_email)
)

db.define_table(
    'lifestyle_category',
    Field('name'),
    Field('visits', 'integer', default=0),
    Field('creation_date', 'datetime', default=get_time),
    Field('created_by', default=get_user_email)
)

db.define_table(
    'lifestyle_subcategory',
    Field('category', 'reference lifestyle_category'),
    Field('name'),
    Field('visits', 'integer', default=0),
    Field('creation_date', 'datetime', default=get_time),
    Field('created_by', default=get_user_email)
)

db.define_table(
    'contributors',
    Field('account', 'reference account'),
    Field('category', 'reference lifestyle_category'),
    Field('subcategory', 'reference lifestyle_subcategory'),
    Field('title'),
    Field('description'),
    Field('visits', 'integer', default=0),
    Field('status', 'integer', default=0),
    Field('creation_date', 'datetime', default=get_time)
)
###-----------------------------------
# Contributors Status Key:
# 0: Application under review
# 1: Application rejected
# 2: Approved, not Deployed
# 3: Active Contributor with page
# 4: Suspended
# 5: Inactive Page
###-----------------------------------

db.commit()
