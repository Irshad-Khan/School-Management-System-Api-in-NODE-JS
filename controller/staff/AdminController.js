const AsynHandler = require('express-async-handler')
const Admin = require('../../model/Staff/Admin');
const generateToken = require('../../utils/generateToken');


//@desc Get All Admin
//@route GET /api/v1/admins
//@access private
exports.index = AsynHandler(async(req, res) => {
    const admins = await Admin.find({});
    res.status(201).json({
        'status': 'success',
        'data': admins
    });

})

//@desc Register Admin
//@route POST /api/v1/admins/register
//@access private
exports.adminRegister = AsynHandler(async(req, res) => {

    const { name, email, password } = req.body
        //Found Admin
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
        throw new Error('Admin with this email already exist')
    } else {
        const admin = await Admin.create({ name, email, password });
        res.status(201).json({
            'status': 'success',
            'data': admin
        });
    }
});

//@desc Login Admin
//@route POST /api/v1/admins
//@access private
exports.adminLogin = AsynHandler(async(req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.json({
            'status': 'failed',
            'data': 'Inivilid credential'
        });
    }
    if (admin && (await admin.verifyPassword(password))) {
        return res.json({
            'status': 'success',
            'user': admin,
            'token': generateToken(admin._id)
        });
    } else {
        return res.json({
            'status': 'failed',
            'data': 'Inivilid credential'
        });
    }
})

//@desc Get Admin Profile
//@route GET /api/v1/admins/:id
//@access private
exports.getAdminProfile = AsynHandler(async(req, res) => {
    console.log(req.userAuth);
    const admin = await Admin.findById(req.userAuth._id);
    if (!admin) {
        throw new Error('Admin not Found')
    } else {
        res.status(201).json({
            'status': 'success',
            'data': admin
        });
    }

});

//@desc Update Admin
//@route PUT /api/v1/admins/:id
//@access private
exports.update = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Update Admins.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

//@desc DELETE Admin
//@route DELETE /api/v1/admins/:id
//@access private
exports.deleteAdmin = AsynHandler(async(req, res) => {
    const id = req.params.id
    const admin = await Admin.findById(id);
    if (!admin) {
        throw new Error('Admin not found')
    } else {
        // admin.deleteOne(id);
        res.status(200).json({
            'status': 'success',
            'data': admin,
            'message': 'Admin deleted successfuly'
        });
    }
});

//@desc Admin Suspended Teacher
//@route PUT /api/v1/admins/suspended/teacher/:id
//@access private
exports.suspendedTeacher = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin Suspended Teacher'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};


//@desc Admin UNSuspended Teacher
//@route PUT /api/v1/admins/unsuspended/teacher/:id
//@access private
exports.unsuspenedTeacher = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin Unsuspended Teacher'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

//@desc Admin Withdraw Teacher
//@route PUT /api/v1/admins/withdraw/teacher/:id
//@access private
exports.withDrawTeacher = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin Withdraw Teacher'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

//@desc Admin UnWithdraw Teacher
//@route PUT /api/v1/admins/unwithdraw/teacher/:id
//@access private
exports.unwithdrawTeacher = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin Unwithdraw Teacher'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

//@desc Admin publish Teacher
//@route PUT /api/v1/admins/publish/exam/teacher/:id
//@access private
exports.publishExam = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin publish exam'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

//@desc Admin unpublish Teacher
//@route PUT /api/v1/admins/unpublish/exam/teacher/:id
//@access private
exports.unpublishExam = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin unpublish exam'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};