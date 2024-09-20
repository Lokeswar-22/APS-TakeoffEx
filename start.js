const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 3000;
const config = require('./config');
if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing APS_CLIENT_ID or APS_CLIENT_SECRET env. variables.');
    return;
}

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name: 'aps_session',
    keys: ['aps_secure_key'],
    maxAge: 14 * 24 * 60 * 60 * 1000
}));
app.use(express.json({ limit: '50mb' }));
app.use('/api/aps', require('./routes/oauth'));
app.use('/api/aps', require('./routes/datamanagement'));
app.use('/api/aps', require('./routes/user'));
app.use('/api/aps', require('./routes/takeoff.packages'));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode).json(err);
});
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
