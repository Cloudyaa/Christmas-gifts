import express from "express";
import "express-async-errors";
import {engine} from "express-handlebars";
import methodOverride from "method-override";
import {homeRouter} from "./routes/home.js";
import {childsRouter} from "./routes/childs.js";
import {giftsRouter} from "./routes/gifts.js";
import {handleError} from "./utils/errors.js";
import "./utils/db.js";
import {handlebarsHelpers} from "./utils/handlebarsHelpers.js";



const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static('public'));
//app.use(express.json());
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');


app.use('/', homeRouter);
app.use('/childs', childsRouter);
app.use('/gifts', giftsRouter);

app.use(handleError);



app.listen(3000, 'localhost', () => {
      console.log('Listening on http://localhost:3000');
    }
);


