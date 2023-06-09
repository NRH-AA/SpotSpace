// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./review.js');
const reviewImagesRouter = require('./reviewimage.js');
const spotImagesRouter = require('./spotimage.js');
const bookings = require('./bookings.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/bookings', bookings);

// Test access
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});




// File Upload
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require('fs');

const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET
    },
});

router.post('/upload', upload.single('image'), async (req, res) => {
    const file = req.file;
    const fileContent = fs.readFileSync(file.path);
    
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file.filename,
        Body: fileContent,
        ContentType: file.mimetype
    }
    
    // Upload file commands
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    
    if (response) {
        // Define image we are trying to get and which bucket its from
        const getObjectParams = {
            Bucket: process.env.S3_BUCKET,
            Key: file.filename
        }
        
        // Get url commands
        const urlCommand = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, urlCommand, { expiresIn: 1800 });
        
        // Send name and url so we can save the name in the database
        return res.json({name: file.filename, url});
    }
    
    return res.status(400).json({'errors': ['Failed to upload file']});
});

// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

module.exports = router;
