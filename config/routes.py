import os
from app import app
from controllers import cocktails, auth

# register your blueprints here...
app.register_blueprint(cocktails.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')

@app.route('/', defaults={'path': ''})  # homepage
@app.route('/<path:path>')  # anything else eg: app.js /css/style.css
def catch_all(path):
    if os.path.isfile('public/' + path):  # if path is a file
        return app.send_static_file(path)  # send back the file

    # otherwise send back index.html
    return app.send_static_file('index.html')
