const express = require('express');
const morgan = require('morgan');

express()

.use(morgan('tiny'))


.use(express.static('public'))
.use(express.json())

.get('*', (req, res) => {
    res
        .status(404)
        .json({
            status: 404,
            message: 'This is obviously not the page you are looking for.',
        });
})

.listen(8000, () => console.log(`Listening on port 8000`));