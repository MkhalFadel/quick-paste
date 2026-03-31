const express = require("express");
const router = express.Router();
const {generateLink, getData, deleteLink} = require("../controllers/createController");

router.post("/", async (req, res) => {
   try {
      console.log("DB URL:", process.env.DATABASE_URL);
      const body = req.body;
      if(!body.content)
         return res.status(400).json({error: "Content required"});

      const data = await generateLink(body);
      return res.status(200).json(data)
   
   } catch (error) {
      console.log("API ERROR:", error);
      res.status(500).json({error: "Server error", error});
   }
})

router.get("/view/:id", async(req, res) => {
   try {
      const {id} = req.params;
      const data = await getData(id);
      if(!data) 
         return res.status(404).json({error: "Paste not Found"})

      if(data.expiresAt === null)
         return res.status(200).json(data);
      else if(data.expiresAt && Date.now() > new Date(data.expiresAt)){
         deleteLink(id);
         return res.status(404).json({error: 'Link Expired'});   
      }
      else
         return res.status(200).json(data);

   } catch (error) {
      console.log('API ERROR:', error);
      res.status(500).json({error: "Server error"});
   }
})

router.get("/test-db", async (req, res) => {
   try {
      res.send("DB connected ✅");
   } catch (err) {
      console.error(err);
      res.status(500).send("DB failed ❌");
   }
});

module.exports = router;