import {createPool} from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_christmas_gifts',
    namedPlaceholders: true,
    decimalNumbers: true,
});


