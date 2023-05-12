const express = require('express');
const {
    adminRegister,
    adminLogin,
    getAdminProfile,
    index,
    update,
    deleteAdmin,
    suspendedTeacher,
    unsuspenedTeacher,
    withDrawTeacher,
    unwithdrawTeacher,
    publishExam,
    unpublishExam
} = require('../../controller/staff/AdminController');
const isLogin = require('../../middlewares/isLogin');

const adminRouter = express.Router();

/**
 * Register Admin
 */
adminRouter.post('/register', adminRegister);

/**
 * Login Admin
 */
adminRouter.post('/login', adminLogin);

/**
 * Get Single admin
 */
adminRouter.get('/profile', isLogin, getAdminProfile);

/**
 * Get All admins
 */
adminRouter.get('/', isLogin, index);

/**
 * Admin Update
 */
adminRouter.put('/:id', update);

/**
 * Admin Delete
 */
adminRouter.delete('/:id', deleteAdmin);

/**
 * Admin Suspended Teacher
 */
adminRouter.put('/suspended/teacher/:id', suspendedTeacher);

/**
 * Admin Unsuspended Teahcer
 */
adminRouter.put('/unsuspended/teacher/:id', unsuspenedTeacher);

/**
 * Admin Withdraw Teacher
 */
adminRouter.put('/withdraw/teacher/:id', withDrawTeacher);

/**
 * Admin Unwithdraw Teahcer
 */
adminRouter.put('/unwithdraw/teacher/:id', unwithdrawTeacher);

/**
 * Admin publish exam
 */
adminRouter.put('/publish/exam/:id', publishExam);

/**
 * Admin unpublish exam
 */
adminRouter.put('/unpublish/exam/:id', unpublishExam);



module.exports = adminRouter;