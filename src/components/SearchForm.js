import React , {useState}from 'react'



const SearchForm =()=>{
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');

    const handleInputChange=(event)=>{
        setTitle(event.target.value)
        console.log(title)
    }

    const handleDescriptionChange=(event)=>{
        setDescription(event.target.value)
        console.log(description)
    }

    const handleSignup = (event) => {
        event.preventDefault();

        const requestOptions={
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({title:title,description:description})
        }

        fetch('/articles',requestOptions).then(response=>response.json())
        .then(data=>{console.log(data)
            setTitle('')
            setDescription('')
        
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