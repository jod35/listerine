import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from './components/SearchForm'
import List from './components/List'
// import articles from './components/data'






const App=()=>{

    const [articles,setArticles]=useState([]);

    useEffect(()=>{
        fetch('/articles').then(res=>res.json())
        .then(data=>{
            setArticles(data)
        })


    },[])

    return(
        <div className="app container">
            <h1>Listerine</h1>
            <SearchForm  onNewArticle={article=>setArticles(currentArticles=>[...currentArticles,article])}/>
            <List list={articles} />
        </div>
    )
}

ReactDOM.render(<App/>,document.querySelector('#root'))