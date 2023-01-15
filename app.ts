import * as express from "express";
import {urlencoded} from "express";
import "express-async-errors";
import {engine} from "express-handlebars";
import * as methodOverride from "method-override";
import {homeRouter} from "./routes/home";
import {childsRouter} from "./routes/childs";
import {giftsRouter} from "./routes/gifts";
import {handleError} from "./utils/errors";
import "./utils/db";
import {handlebarsHelpers} from "./utils/handlebarsHelpers";

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
  extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/childs', childsRouter);
app.use('/gifts', giftsRouter);

app.use(handleError);

app.listen(3001, 'localhost', () => {
      console.log('Listening on http://localhost:3001');
    }
);


