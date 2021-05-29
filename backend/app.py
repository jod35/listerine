from flask import Flask,request,jsonify,make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import Article,sa
from marshmallow import Schema,fields

import os


BASE_DIR = os.path.dirname(os.path.realpath(__file__))

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///'+ os.path.join(BASE_DIR,'site.db')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False


sa.init_app(app)

cors=CORS(app)

class ArticleSchema(Schema):
    title=fields.String(required=True)
    description=fields.String(required=True)



@app.route('/articles')
def get_all_articles():
    articles=Article.query.all()

    article_schema=ArticleSchema()

    return make_response(jsonify(
        article_schema.dump(articles,many=True)
    )),200


@app.route('/articles',methods=['POST'])
def create_an_article():
    data=request.get_json()

    new_article=Article(
        title=data.get('title'),
        description=data.get('description')
    )

    new_article.save()

    article_schema=ArticleSchema()

    return make_response(
        jsonify(article_schema.dump(new_article))
    ),201



@app.route('/article/<int:id>', methods=['GET'])
def get_article(id):
    article=Article.get_by_id(id)

    article_schema=ArticleSchema()

    return make_response(
        jsonify(article_schema.dump(article))
    )


@app.route('/article/<int:id>', methods=['PUT'])
def update_article(id):
    article=Article.get_by_id(id)

    article_schema=ArticleSchema()

    data=request.get_json()

    article.title=data.get('title')
    article.description=data.get('description')


    sa.session.commit()

    return make_response(
        jsonify(article_schema.dump(article))
    )


@app.route('/article/<int:id>', methods=['DELETE'])
def delete_article(id):
    article=Article.get_by_id(id)

    article.delete()

    article_schema=ArticleSchema()

    return make_response(
        jsonify(article_schema.dump(article))
    )


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"message":"Resource not found"}))

@app.errorhandler(500)
def internal_error(error):
    return make_response(jsonify({"message":"Internal error"}))

if __name__ == '__main__':
    app.run(debug=True)