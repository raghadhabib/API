import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response , Application   } from 'express';
import fs from 'fs'



interface Card {
  "question":string,
  "answer":string
}

// Initialize Express app
const app :Application  = express();
const PORT = process.env.PORT || 3000;


//read file function 
const readQuestionsFile = async (): Promise<Card[]> => {
  const filePath: string = './week_2.json';
  try{
  const jsonString = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(jsonString);
   }
  catch (err){
   console.error('Error reading file:', err);
    throw err;
  }
}

//routes
app.get("/JsonFile", async (req: Request, res: Response) => {
   try{
  const data = await readQuestionsFile();
  res.status(200).json(data);
   }
   catch(err){
          res.status(500).json({ error: 'Failed to read questions file' });

   }})

   app.get('/',async (req:Request,res:Response)=>{
      res.status(200).send("Hello World This Raghad Habib, A future lead developer.")
   })








//debugging 

//   app.get("/JsonFile", 
//   async (req: Request, res: Response) =>  {
//   const output = await readQuestionsFile();
 
// //   console.log("Parsed JSON data:");
// //    console.log(data);
// //    const output = data.map((item)=>item.question);
// //    console.log(output); 
//    return res.status(200).json(output);
// })
      
  

//to fix type error in catch listen
const getError = (error:unknown)=>{
 if (error instanceof Error) {
      return error.message;
  }
  return String(error);
}



// run the server
try {
app.listen(PORT, (): void => {
   console.log(`Connected succesfully on port: ${PORT}`);
});
} catch (err) {
   console.error(getError(err));
}

