import React ,{useEffect,useState} from "react";
import axios from "axios";

const News = () => {
    const [newsVar, setNews] = useState("");
    const [errorVar, setError] = useState("");
    const APIURL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d559daa0478749de8eccbdf09dcb5735';

    useEffect(() => {
        axios.get(APIURL)
        .then((response) => {
            if(response.data.articles.length > 0)
                setNews(response.data.articles); //all news is stored . all ll
            else
                setError("No News Found. ERRORRR");
        })
        .catch(() => setError("Error fetching news. Eror"));  
    }, []);
    return (
        <div>
            <h2>Latest News!</h2>
            {
                errorVar ? (
                    <p style={{ color: "red" }}>{errorVar}</p>
                ) : newsVar.length > 0 ? (
                    <ul>
                        {newsVar.map((article, index) => (
                            <li key={index}>
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                <a href={article.url} style={{color: "blue"}}>{article.url}</a>
                                <img src={article.urlToImage} alt={article.title || "News Iamge"} style={{width:"100%", maxWidth:"600px", height: "auto", borderRadius: "2px" }}></img>
                                <br/>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                                <hr />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading</p>
                )}    
        </div>
        )}
export default News;