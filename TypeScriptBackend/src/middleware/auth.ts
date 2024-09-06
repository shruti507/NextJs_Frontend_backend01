// import { Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { Request } from 'express';


// interface DecodedToken {
//   id: string; // Adjust according to the structure of your decoded token
//   // Add other properties of the decoded token if needed
// }

// // Middleware function for authenticating requests using JSON Web Tokens (JWT)
// export default function auth(req: Request, res: Response, next: NextFunction): void {
//     const token = req.header('token'); // Retrieve the token from the request headers
//     if (!token) {
//         res.status(401).json({ msg: 'No token, authorization denied' }); // If no token is provided, respond with a 401 status code and an error message
//         return; // Ensure no further code is executed
//     }

//     try {
//         const decoded = jwt.verify(token, 'secret') as DecodedToken; // Verify the token using the secret key and cast to DecodedToken
//         req.user = decoded; // Attach the decoded user information to the request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         res.status(400).json({ msg: 'Token is not valid' }); // If token verification fails, respond with a 400 status code and an error message
//     }
// }

