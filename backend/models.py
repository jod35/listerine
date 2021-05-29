from flask_sqlalchemy import SQLAlchemy

sa=SQLAlchemy()

class Article(sa.Model):
    id=sa.Column(sa.Integer(),primary_key=True)
    title=sa.Column(sa.String(50),nullable=False)
    description=sa.Column(sa.Text(),nullable=False)

    def __repr__(self):
        return self.title

    def save(self):
        sa.session.add(self)
        sa.session.commit()

    def delete(self):
        sa.session.delete(self)
        sa.session.commit()


    @classmethod
    def get_by_id(cls,id):
        return cls.query.get_or_404(id)