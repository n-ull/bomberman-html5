let express = require('express');
let app = express();

app.get("/", (req, res) => {
	res.send("Ok");
});

app.listen(3000, ()=>{
	console.log(`Iniciado en http://localhost:3000`);
});