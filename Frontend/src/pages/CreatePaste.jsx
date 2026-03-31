import PasteBox from "../components/PasteBox";
import { useState } from "react";
import { sendData } from "../API/links";
import { copyText } from "../utils";

export function CreatePaste() {
   
   const [value, setValue] = useState("");
   const [expiresIn, setExpiresIn] = useState("");
   const [link, setLink] = useState("");

   async function generateLink(body)
   {
      const data = await sendData(body);
      setLink(`https://quick-paste-bice.vercel.app/view/${data.id}`);
   }
   
   return (
      <div style={styles.container}>
         <h1>Create a Paste</h1>

         <PasteBox setValue={setValue} />

         <div style={styles.controls}>
         <select style={styles.select} onChange={(e) => setExpiresIn(e.target.value)}>
            <option value="">No Expiration</option>
            <option value="1h">1 Hour</option>
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
         </select>

         <button style={styles.button} onClick={() => generateLink({content: value, expiresIn})}>
            Create Paste
         </button>
         </div>

         {/* Result link (show after creation later) */}
         <div style={styles.result}>
         <input
            type="text"
            placeholder="Generated link will appear here..."
            readOnly
            value={link}
            style={styles.input}
         />
         <button style={styles.copyBtn} onClick={() => copyText(link)}>Copy</button>
         </div>
      </div>
   );
}

const styles = {
   container: {
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "1rem"
   },
   controls: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem"
   },
   select: {
      padding: "0.5rem"
   },
   button: {
      padding: "0.5rem 1rem",
      background: "#111",
      color: "#fff",
      border: "none",
      cursor: "pointer"
   },
   result: {
      display: "flex",
      marginTop: "1rem",
      gap: "0.5rem"
   },
   input: {
      flex: 1,
      padding: "0.5rem"
   },
   copyBtn: {
      padding: "0.5rem 1rem"
   }
};

export default CreatePaste;