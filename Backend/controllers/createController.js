const pool = require("../Database/connection")
const { nanoid } = require("nanoid")

function getExpiration(expiresIn)
{
   if(!expiresIn) return null;

   const map = {
      "1h": 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000
   };

   return new Date(Date.now() + map[expiresIn]);
}

async function generateLink(data)
{
   try {
      const expiresAt = getExpiration(data.expiresIn)
      const id = nanoid(8);
      await pool.query('INSERT INTO links(id, content, "expiresAt") VALUES($1, $2, $3)', [id, data.content, expiresAt])
      return { id };
   } catch (error) {
      console.log('CONTROLLER ERROR:', error)
      throw error;
   }
}

async function getData(id)
{
   try {
      const result = await pool.query(
         "SELECT * FROM links WHERE id = $1",
         [id]
      );

      const paste = result.rows[0];

      if (!paste) return null;

      if (paste.expiresAt && Date.now() > new Date(paste.expiresAt)) {
         await deleteLink(id);
         return null;
      }

      return paste;

   } catch (error) {
      console.log('CONTROLLER ERROR:', error);
      throw error;
   }
}

async function deleteLink(id)
{
   try {
      await pool.query("DELETE FROM links WHERE id = $1", [id]);
   } catch (error) {
      console.log("CONTROLLER ERROR: ", error)
      throw error;
   }
}

module.exports = {generateLink, getData, deleteLink}