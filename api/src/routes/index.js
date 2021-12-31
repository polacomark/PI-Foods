const { Router } = require('express');
require("dotenv").config();
//const { DataTypes, UUID } = require('sequelize');
const axios = require("axios");
const { API_KEY2} = process.env;
const { Recipe, Diet } = require("../db");
//const diet = require('./diets.js');
//const cors = require("cors");
const router = Router();
//router.use (cors({origin:"http://localhost:3000", credentials: true}));


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/diets', diet)

const apiData=async ()=>{
    try{
    const apiUrl=await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`
        )
        //return apiUrl.data.results;
        const apiInfo = apiUrl.data.results.map((e)=>{
        return{
            id: e.id,
            title: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            spoonacularScore: e.spoonacularScore,
            image: e.image,
            //steps: e.steps.map(ele=>{return{number:ele, step: ele}}),
            steps: (e.analyzedInstructions.length>0 && Array.isArray(e.analyzedInstructions[0].steps))?e.analyzedInstructions[0].steps.map(ele=>`step ${ele.number}: ${ele.step}`) :'No steps found',
            //steps: e.analyzedInstructions ? e.analyzedInstructions[0]steps.map(ele=>`step ${ele.number}: ${ele.step}`): null,
            diets: e.diets
        } 
      });
      return apiInfo;
      
    }catch(error){
        console.log(error)
}
}

const getDbInfo=async()=>{
try{
   let dbRecipe = await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            }
        }
    });
    // const all = dbRecipe.map((e)=>{
    //   return{
    //     id: e.id,
    //     title: e.title,
    //     summary: e.summary,
    //     healthScore: e.healthScore,
    //     spoonacularScore: e.spoonacularScore,
    //     image: e.image,
    //     //analyzedInstructions: e.analyzedInstructions.map(e=> e.steps),
    //     steps: [e.analyzedInstructions.length>0] && Array.isArray(e.analyzedInstructions[0].steps)? e.analyzedInstructions[0].steps.map(ele=>`step ${ele.number}: ${ele.name}`) :'No steps found',
    //     //steps: e.steps.map(ele=>{return{number:ele, step: ele}}),
    //     //steps: e.analyzedInstructions ? e.analyzedInstructions[0]: null,
    //     diets: e.diets.map((d) => {return{name:d}})
    // } 
    // })
    // return all;
 return dbRecipe;
}catch(error){
    console.log(error)
}
}
const getAllRecipes = async () => {
    const apiInfo = await apiData();
    const dbInfo = await getDbInfo();
    //console.log(apiInfo, dbInfo)
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
  };

//   router.get('/recipes', async (req,res) => {
  
//     //requerimos el parametro (name) ingresado por querry
//     const {name} = req.query

//     if (name){
//         //obtenemos las recetas que tengan la palabra ingresada por parametro query
//         const resAxios = await axios.get(
//           `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`
//         )
//         const {results} = resAxios.data
//         const infoQuery = results.map(e=>({
//           id: e.id,
//           title: e.title,
//           summary: e.summary,
//           healthScore: e.healthScore,
//           spoonacularScore: e.spoonacularScore,
//           image: e.image,
//           //analyzedInstructions: e.analyzedInstructions.map(e=> e.steps),
//           //steps:(e.analyzedInstructions.length>0 && Array.isArray(e.analyzedInstructions[0].steps))?e.analyzedInstructions[0].steps.map(ele=>`step ${ele.number}: ${ele.step}`) :'No steps found',
//           steps: e.analyzedInstructions ? e.analyzedInstructions[0]: null,
//           diets: e.diets.map((d) => {return{name:d}})    
//         }))
//         const cl = await getDbInfo()
//         const filtercl = cl.filter(n => n === name.toLowerCase())
//         let recipesName = await infoQuery.concat(filtercl);

//         //si se encuentra devolvemos y si no mje correspondiente
//         recipesName.length?res.status(200).send(recipesName):res.status(404).send('Perdon. No se encontro la receta.');  

//         // si no hay query devolvemos todas las recetas
//     } else {
//         //traigo info
//         let allRecipes = await getAllRecipes();
//         res.status(200).send(allRecipes)
//     }
// })  

router.get('/recipes', async(req,res,next)=>{
    const { name } = req.query;
    const recipesTotal = await getAllRecipes();
    if (name) {
      let recipeTitle = await recipesTotal.filter((r) =>
        r.title.toLowerCase().includes(name.toLowerCase())
      );
      recipeTitle.length
        ? res.status(200).json(recipeTitle)
        : res.status(400).send("This recipe doesn't exist");
    } else {
      res.status(200).json(recipesTotal);
    }
  });
 
  
router.get('/diets', async (req, res)=>{
  const diets=[
      "gluten free",
      "dairy free",
      "paleolithic",
      "ketogenic",
      "lacto ovo vegetarian",
      "vegan",
      "pescatarian",
      "primal",
      "fodmap friendly",
      "whole 30",
  ];
  diets.forEach(el=>{
      Diet.findOrCreate({
          where: {name: el}
      })
  });
  const allDiets = await Diet.findAll()
  res.send(allDiets)
})

  // router.route('/diets')
  // .get(async (req, res) => {
  //     try {
  //         const diets = await dietType.findAll()
  //         res.json(diets);
  //     }
  //     catch (err) {
  //         res.status(404).send(err)
  //     }
  // })
  
  router.post('/recipe', async(req, res, next)=>{
      try{
        let{   
            title,
            summary,
            healthScore,
            spoonacularScore,
            image,
            steps,
            diets
          }=req.body;
          //console.log(req.body)
          //const newRecipes = await 
          Recipe.create({
            title,
            summary,
            healthScore,
            spoonacularScore,
            image,
            steps
          })
         .then((newRecipes)=>{
             newRecipes.addDiets(diets)
             .then(()=>{
                 res.json(newRecipes)
             })
         })
          // diets.map(async (d)=>{
          //     const diet = await Diet.findOne({
          //       where: {
          //           name: d,
          //       },
          //   });
          //   await newRecipes.addDiet(diet);
          //   res.send('Dieta creada con exito')
          // })
        
           
      }catch(error){
        next(error);
      }
     

  });
//   router.get("/recipes/:id", async (req, res, next)=>{
//     const {id} = req.params;  
//     const recipeid = axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
//     .then(results => results.data)
//     .then(res => {
//         let recipe={
//           id: res.id,
//           title: res.title,
//           summary:res.summary,
//           healthScore: res.healthScore,
//           spoonacularScore: res.spoonacularScore,
//           image: res.image,
//           //analyzedInstructions: e.analyzedInstructions.map(e=> e.steps),
//           //steps:(e.analyzedInstructions.length>0 && Array.isArray(e.analyzedInstructions[0].steps))?e.analyzedInstructions[0].steps.map(ele=>`step ${ele.number}: ${ele.step}`) :'No steps found',
//           steps: res.analyzedInstructions ? res.analyzedInstructions[0]: null,
//           diets: res.diets.map((d) => {return{name:d}})
//         }
//         return recipe;
//     })  
//     .catch((err)=>{
//         next(err)
//     });
//     return recipeid;    
//  });
  
  router.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    //const regex = /(\w+\-){4}\w+/g;
    const recipesTotal = await getAllRecipes();
    if (id) {
      let recipeId = await recipesTotal.filter(r => r.id == (id));
      recipeId.length
        ? res.status(200).json(recipeId)
        : res.status(404).send("Recipe not found");
    }
  });

module.exports={
  getAllRecipes,
  getDbInfo,
  apiData
};  
module.exports = router;
