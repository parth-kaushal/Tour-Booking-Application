import jwt from 'jsonwebtoken'

// jwt private key -> KaushalParth$3123

export const verifyToken = (req, res, next) => {
   const token = req.cookies.accessToken

   if (!token) {
      return res.status(401).json({ success: false, message: "You are not authorize!" })
   }

   // if token is exist then verify the token
   jwt.verify(token, "KaushalParth$3123", (err, user) => {
      if (err) {
         return res.status(401).json({ success: false, message: "Token is invalid" })
      }

      req.user = user
      next()
   })
}


export const verifyUser = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authenticated" })
      }
   })
}


export const verifyAdmin = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authorize" })
      }
   })
} 