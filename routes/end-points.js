const express = require("express")
const userHandlers = require("../controls/user-controllers")
const coinbaseHandlers = require("../controls/coinbase-controllers");
const userCtr = require('../controls/auth')

const router = express.Router()


/** User End Points */

router.get("/user", userHandlers.getAllUsers)

router.post("/signup", userCtr.signup);

router.get("/resend-verification-link", userCtr.resendVerificationLink);

router.get("/verify-account", userCtr.verifyAccount);

router.post("/signin", userCtr.signin);

router.post("/refreshtoken", userCtr.refreshtoken);

router.post("/reset-pass-request", userCtr.resetPassRequest);

router.post('/reset-pass', userCtr.resetPass)

router.get('/remove-unverified-users', userCtr.removeUnverifiedUser)

// router.get("/:id", userHandlers.getUserByID)

// router.get("/:email", userHandlers.getUserByEmail)

// router.put("/:id", userHandlers.updateUserByID)

// router.put("/email", userHandlers.updateUserByEmail)

router.delete("/:id", userHandlers.deleteUserByID)

router.delete("/all", userHandlers.deleteAllUsers)

router.post("/all", userHandlers.deleteAllUsers)

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