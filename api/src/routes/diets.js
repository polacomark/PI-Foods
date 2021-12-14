// const express = require('express');
// //const { set } = require('../app');

// const diet = require('./index');
// const router = express.Router()
// const { Diet } = require('../db');

// reuter.get('/diets', async (req, res)=>{
//     const diets=[
//         "gluten free",
//         "dairy free",
//         "paleolithic",
//         "ketogenic",
//         "lacto ovo vegetarian",
//         "vegan",
//         "pescatarian",
//         "primal",
//         "fodmap friendly",
//         "whole 30",
//     ];
//     diets.forEach(el=>{
//         Diet.findOrCreate({
//             where: {name: el}
//         })
//     });
//     const allDiets = await Diet.findAll()
//     res.send(allDiets)
// })

// // router.get('/diets', async (req, res) => {
// //     try {
// //         let typesDiet = await Diet.findAll();

// //         res.status(200).json(typesDiet);
// //     } catch (error){
// //         console.log(error);
// //     }
// // })

// module.exports = router