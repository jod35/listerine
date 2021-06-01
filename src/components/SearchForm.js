import React, {useEffect,useState}from 'react'



const SearchForm =({onNewArticle})=>{
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [articles,setArticles]=useState([]);


    useEffect(() => {
        fetch('/articles').then(res => res.json())
            .then(data => {
                setArticles(data)
            })


    }, [])



    const handleInputChange=(event)=>{
        setTitle(event.target.value)
        console.log(title)
    }

    const handleDescriptionChange=(event)=>{
        setDescription(event.target.value)
        console.log(description)
    }

    const article = { title: title, description: description }
    const handleSignup = (event) => {
        event.preventDefault();

        const requestOptions={
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(article)
        }

        fetch('/articles',requestOptions).then(response=>response.json())
        .then(data=>{console.log(data)
            setTitle('')
            setDescription('')

            onNewArticle(article)
            
            
        
        })
        
    }

    return(
       <form onSubmit={handleSignup}>
            <div className="search-form">
                <div className="">
                    <label htmlFor="title">
                        Title
                    <input type="text" value={title} onChange={handleInputChange} className="form-control" />
                    </label>
                </div>
                <div className="">
                    <label htmlFor="desscription">
                        Description
                    <input type="text" value={description} onChange={handleDescriptionChange} className="form-control" />
                    </label>
                </div>
                <button className="btn btn-primary">Save</button>
            </div>
       </form>
    )
}

export default SearchForm;