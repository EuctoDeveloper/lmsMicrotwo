import axios from 'axios';
import config from '../configs/config.js';
import https from 'https';
import logger from '../configs/loggers.js';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const apiSecret = config.authAppSecret;

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
          });          

        const response = await axios.get(config.authAppUrl, {
            httpsAgent,
            headers: {
                'x-app-id': 'core',
                'x-app-secret': apiSecret,
                'authorization': token
            }
        });

        if (response.data.status === 'success') {
            req.user= response.data.user;
            console.log(response.data.user.role);
            if(response.data.user.role !== 'admin' && response.data.user.role !== 'instructor') {
                return res.status(403).json({ error: 'Forbidden' });
            }
            next();
        } else {
            res.status(401).json({ error: 'Invalid Request' });
        }
    } catch (error) {
        if(error.response.status === 401) {
            logger.error('Invalid Token', req.headers.authorization);
            res.status(401).json({ error: 'Invalid Request' });
        }
        else if (error.response.status === 403) {
            logger.error('Forbidden', req.headers.authorization);
            res.status(403).json({ error: 'Session Expired' });
        }
        else {
            logger.error('Error verifying token:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default verifyToken;
