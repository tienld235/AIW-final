const articlesApi = "http://localhost:8080/api/articles";

export const getAllArticles= ()=>{
    return articlesApi+"?sort=-time";
}

export const getLimitArticles=(limit, page)=>{
    return articlesApi+"?limit="+limit+"&page="+page;
}

export const getArticle = (id) =>{
    return articlesApi+"/"+id;
}

export const getRelatedArticles=(categoryID, limit, page)=>{
    return articlesApi+"?category="+categoryID+"&limit="+limit+"&page="+page;
}

export const getArticlesByTags=(id)=>{
    return articlesApi+"?tags="+id;
}

export default {getAllArticles, getLimitArticles, getArticle, getRelatedArticles, getArticlesByTags};