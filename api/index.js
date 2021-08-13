const express = require('express');
const path = require("path");
const fileUpload = require('express-fileupload')
const { registerRoutes } = require('./routes');
const { setEnvironment } = require('./config/env');
const { connectToDB } = require('./config/db');

/** Init app*/
const app = express();
app.use(fileUpload())
/** Set environment */
setEnvironment(app);
/** Connect to DB */
connectToDB();
/** Set Routes */
registerRoutes(app);
/** Set public folder */
app.use(express.static(path.join(__dirname, "public")));
/** Start the server */
app.listen(3000, () => console.log('api listening on port 3000'));