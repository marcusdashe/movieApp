const express = require("express")
const userHandlers = require("../controls/user-controllers")
const coinbaseHandlers = require("../controls/coinbase-controllers")

const router = express.Router()


/** User End Points */

router.get("/user", userHandlers.getAllUsers)

router.post("/user/create", userHandlers.createUser)

router.get("/user/:id", userHandlers.getUserByID)

router.get("/user/:email", userHandlers.getUserByEmail)

router.put("/user/id", userHandlers.updateUserByID)

router.put("/user/email", userHandlers.updateUserByEmail)

router.delete("/user", userHandlers.deleteUserByID)

router.delete("/user/all", userHandlers.deleteAllUsers)

router.post("/user/all", userHandlers.deleteAllUsers)

// router.post("/user/activate", userHandlers.activateUser)

// router.post("/user/deactivate", userHandlers.deactivateUser)


/* Transfers (Internal & External/Withdraw) Endpoints */


/* Deposit Endpoints  */




// router.post("/user/internal-transfer", userHandlers.internalTransfer)


/** Coinbase End Points */
// router.get("/coinbase", coinbaseHandlers.pay)


/** Authentication */
// router.post("/login", authenticationHandler.login)

// router.post("/signup", authenticationHandler.signup)


module.exports = router