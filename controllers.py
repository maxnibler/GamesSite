"""
This file defines actions, i.e. functions the URLs are mapped into
The @action(path) decorator exposed the function at URL:

    http://127.0.0.1:8000/{app_name}/{path}

If app_name == '_default' then simply

    http://127.0.0.1:8000/{path}

If path == 'index' it can be omitted:

    http://127.0.0.1:8000/

The path follows the bottlepy syntax.

@action.uses('generic.html')  indicates that the action uses the generic.html template
@action.uses(session)         indicates that the action uses the session
@action.uses(db)              indicates that the action uses the db
@action.uses(T)               indicates that the action uses the i18n & pluralization
@action.uses(auth.user)       indicates that the action requires a logged in user
@action.uses(auth)            indicates that the action requires the auth object

session, db, T, auth, and tempates are examples of Fixtures.
Warning: Fixtures MUST be declared with @action.uses({fixtures}) else your app will result in undefined behavior
"""

from py4web import action, request, abort, redirect, URL
from yatl.helpers import A
from .common import db, session, T, cache, auth, logger, authenticated, unauthenticated, flash
from py4web.utils.url_signer import URLSigner
from .models import get_user_email, get_time
from .helpers import check_admin, names_list

url_signer = URLSigner(session)

### Main (mostly static) Pages

@action('index')
@action.uses(db, auth, 'index.html')
def index():
    row = db(db.auth_user.email == get_user_email()).select().first()
    if row != None:
        account = db(db.account.email == row.email).select().first()
        if account == None:
            db.account.update_or_insert(
                (db.account.email == row.email),
                email = row.email,
                user = row.id
            )
        elif account.email == 'max.nibler@gmail.com':
            db.account.update_or_insert(
                (db.account.email == row.email),
                permission_level = 4
            )
    return dict(
        check_admin_url=URL('check_user_permission'),
        admin=check_admin()
    )

@action('about')
@action.uses(db, auth, 'about.html')
def index():
    about_blurb = db(db.blurbs.tag == 'about_text').select().first()
    if about_blurb != None:
        textblock = about_blurb.body
        title = about_blurb.title
    else:
        textblock = ""
        title = ""
    return dict(
        textblock=textblock,
        title=title,
        update_blurb_url=URL('update_blurb', signer=url_signer),
        check_admin_url=URL('check_user_permission'),
        admin=check_admin()
    )

@action('DungeonMaster')
@action.uses(db, auth, 'DungeonMaster.html')
def index():
    return dict(
        check_admin_url=URL('check_user_permission'),
        admin=check_admin()
    )

### generic update endpoints

@action('update_blurb', method=["GET", "POST"])
@action.uses(db, auth.user, session, url_signer.verify())
def update_blurb():
    if check_admin() == 0:
        return 'rejected'
    body = request.json.get('body')
    title = request.json.get('title')
    tag = request.json.get('tag')
    db.blurbs.update_or_insert(
        (db.blurbs.tag == tag),
        created_by = get_user_email(),
        title = title,
        body = body,
        tag = tag,
        creation_date = get_time(),
    )
    return 'ok'

### Basic Utility Endpoints

@action('check_user_permission', method=["GET"])
@action.uses(db, session, auth)
def check_user_permission():
    admin = check_admin()
    if admin > 0:
        return dict(admin=admin)
    else:
        return dict(admin=0)

### Admin Page and Endpoints

@action('admin_page')
@action.uses(db, session, auth, 'admin_page.html')
def admin_page():
    if check_admin() < 3:
        redirect(URL('index'))
    return dict(
        admin=check_admin(),
        get_accounts_url=URL('get_accounts', signer=url_signer),
        check_admin_url=URL('check_user_permission'),
    )

@action('get_accounts', method=["GET", "POST"])
@action.uses(db, session, auth.user, url_signer.verify())
def get_accounts():
    if check_admin() == 0:
        return 'rejected'
    level = request.params.get('permission_level')
    if int(level) < 0:
        rows = db(db.account.permission_level >= 0).select().as_list()
    else:
        rows = db(db.account.permission_level == int(level)).select().as_list()
    return dict(rows=rows)


