from flask import Flask,render_template,request
import pickle
import numpy as np

top_fifty = pickle.load(open('top_fifty.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))
books = pickle.load(open('books.pkl', 'rb'))
similar = pickle.load(open('similar.pkl', 'rb'))
age_recommendations = pickle.load(open('age_recommendations.pkl' , 'rb'))

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html',
                           book_name=list(top_fifty['Book-Title'].values),
                           author=list(top_fifty['Book-Author'].values),
                           image=list(top_fifty['Image-URL-L'].values),
                           votes=list(top_fifty['no_of_ratings'].values),
                           rating=list(top_fifty['avg_of_ratings'].values),
                           )
@app.route('/searchbooks')
def searchbooks_ui():
    return render_template('searchbooks.html')

@app.route('/contactus')
def contus():
    return render_template('contactus.html')

@app.route('/recommend_books',methods=['post'])
def searchbooks():
    user_input = request.form.get('user_input')

    index = np.where(pt.index == user_input)[0][0]
    similar_books = sorted(list(enumerate(similar[index])), key=lambda x: x[1], reverse=True)[1:11]

    data = []
    for i in similar_books:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-L'].values))

        data.append(item)

    print(data)

    return render_template('searchbooks.html', data=data)

@app.route('/agewise')
def agewisebooks():
        return render_template('agewise.html', age_recommendations=age_recommendations)
if __name__ == '__main__':
    app.run(debug=True)
