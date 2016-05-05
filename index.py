#!/usr/bin/env python
#coding:utf-8
__author__ = "Ganker"

from flask import Flask, render_template
from livereload import Server

app = Flask(__name__);

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    server = Server(app.wsgi_app)
    server.serve(port="8080", host="0.0.0.0")