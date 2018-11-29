const categoriesApi = `http://localhost:8080/api/categories`; 

export const getAllCategories = ()=>{
    return categoriesApi;
}

export const getCategory =(id) =>{
    return categoriesApi+"/"+id;
}

export default {getAllCategories, getCategory};