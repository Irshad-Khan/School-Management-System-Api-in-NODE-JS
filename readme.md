# Lecture 1: Structuring a Project
In this Lecture we create all folder and two files to that is require in begning.
- app
- config
- controller
- middlewares
- model
- routes
- utils

here we add two files one 
```bash
app.js
```
in app folder and 
```bash
server.js 
```
in root folder

# Lecture 2: Creating Server
First we run command below
```bash
npm init --yes
```

for creating file 
```bash
package.json
```
Now we install packages using below commond
```bash
npm i express mongoose
```
we also install dev dependency using command
```bash
npm i nodemon morgan -D
```
Here nodemon is used to run our server and restart every time our page if made any change in a file.
now we add script in package.json scripts section file for running server.
```bash
"server": "nodemon server.js"
```
Now we add content in server.js file and run the server.
```bash
const express = require('express');
const morgon = require('morgan');

const app = express();

# If env not containing variable then 2020 port used
const PORT = process.env.PORT || 2020;


#Middlewares
#Morgon is used to display end point in console
app.use(morgon('dev'))

#Server Created
app.listen(PORT, console.log(`Server running on port ${PORT}`));
```
run server using below command
```bash
npm run erver
```

# Lecture 3: Advance Server
In the lecture we use expressjs and node core http module for creating server.
now we change server.js and add code in app.js code is below. All these changes are done because we know server.js duty is only create server and app.js is use to intract with app using middleware or other stuff. So we seprate duty of app and server.js files

```bash
# app.js
const express = require('express');
const morgon = require('morgan');

const app = express();

module.exports = app;
```
```bash
# server.js
const http = require('http');
const app = require('./app/app');

# If env not containing variable then 2020 port used
const PORT = process.env.PORT || 2020;

#Server Created
const serevr = http.createServer(app);
serevr.listen(PORT, console.log(`Server running on port ${PORT}`));
```

# Lecture 4: Creating Admin Model
Now we write code for admin model. Create new file in model/staff folder named Admin.js and add below code.

```bash
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    }
}, {
    timestamps: true
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
```

# Lecture 5: Creating Program Model
In this lecture we will add logic for program model. Lets craete file Program.js in model/Academic folder and add below code.

```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
        default: "4 years"
    },
    # Created Automatically
    #CSFTY Example
    code: {
        type: String,
        default: function() {
            return (
                this.name
                .split(" ")
                .map(name => name[0])
                .join("").toUpperCase() +
                Math.floor(10 + Math.random() * 90) +
                Math.floor(10 + Math.random() * 90)
            );
        }
    },
    # For Forgin Key
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    # We will push the teachers that are incharge of the program
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        default: []
    }],
    studnets: [{
        type: Schema.Types.ObjectId,
        ref: "Studnet",
        default: []
    }],
    # We will push the subjects that are in the program is created
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
        default: []
    }]
}, {
    timestamps: true
});

const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;
```

# Lecture 6: Creating Subject Model
In this lecture we will add logic for subject model. Lets craete file Subject.js in model/Academic folder and add below code.
```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    },
    academicTerm: {
        type: Schema.Types.ObjectId,
        ref: "AcademicTerm",
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    duration: {
        type: String,
        required: true,
        default: "3 months"
    }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectModel);

module.exports = Subject;
```

# Lecture 7: Creating AcademicYear Model
In this lecture we will add logic for academic year model. Lets craete file AcademicYear.js in model/Academic folder and add below code.
```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const acadmicYearModel = new Schema({
    name: {
        type: String,
        required: true
    },
    fromYear: {
        type: String,
        required: true
    },
    toYear: {
        type: String,
        required: true
    },
    isCurrent: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Studnet"
    }],
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    }]
}, { timestamps: true });

const AcademicYear = mongoose.model('AcademicYear', acadmicYearModel);

module.exports = AcademicYear;
```
# Lecture 8: Creating AcademicTerm Model
In this lecture we will add logic for academic Term model. Lets craete file AcademicTerm.js in model/Academic folder and add below code.
```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const academicTermModel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requried: true
    },
    duration: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, { timestamps: true });

const AcademicTerm = mongoose.model('AcademicTerm', academicTermModel);

module.exports = AcademicTerm;
```

# Lecture 9: Creating YearGroup Model
In this lecture we will add logic for yearGroup model. Lets create file YearGroup.js in model/Academic folder and add below code.

```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const yearGroupModel = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true
    }
}, { timestamps: true });

const YearGroup = mongoose.model('YearGroup', yearGroupModel);

module.exports = YearGroup;
```

# Lecture 10: Creating ClassLevel Model
In this lecture we will add logic for class level model. Lets craete file ClassLevel.js in model/Academic folder and add below code.

```bash
const mongoose = require('mongoose');

const { Schema } = mongoose

const classLevelModel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }]
}, { timestamps: true });

const ClassLevel = mongoose.model('ClassLevel', classLevelModel);

module.exports = ClassLevel;
```
# Lecture 11: Creating Teacher Model
In this lecture we will add logic for teacher model. Lets craete file Teacher.js in model/Staff folder and add below code.

```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateEmployed: {
        type: Date,
        default: Date.now
    },
    teacherId: {
        type: String,
        required: true,
        default: function() {
            return (
                "TEA" +
                Math.floor(100 + Math.random() * 900) +
                Date.now().toString().slice(2, 4) +
                this.name
                .split(" ")
                .map(name => name[0])
                .join("")
                .toUpperCase()
            );
        }
    },
    # If Withdrawn, the teacher will not be able to login
    isWithdrawn: {
        type: Boolean,
        default: false
    },
    # If Suspended, the teacher will login but can not perform ang task
    isSuspended: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'teacher'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    classLevel: {
        type: Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear',
        required: true
    },
    examsCreated: [{
        type: Schema.Types.ObjectId,
        ref: 'Exam'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    academicTerm: {
        type: Schema.Types.ObjectId,
        ref: "AcademicTerm",
        required: true
    }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherModel);

module.exports = Teacher;
```

# Lecture 12: Creating Student Model
In this lecture we will add logic for Student model. Lets craete file Student.js in model/Academic folder and add below code.

```bash
const mongoose = require('mongoose');

const { Schema } = mongoose

const studentModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        default: function() {
            return (
                "STU" +
                Math.floor(100 + Math.random() * 900) +
                Date.now().toString().slice(2, 4) +
                this.name
                .split(" ")
                .map(name => name[0])
                .join("")
                .toUpperCase()
            );
        }
    },
    isWithdrawn: {
        type: Boolean,
        default: false
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'student'
    },
    classLevels: [{
        type: Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true
    }],
    currentClassLevel: {
        type: String,
        default: function() {
            //  Return last record
            return this.classLevels[this.classLevels.length - 1]
        }
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear',
        required: true
    },
    dateAdmitted: {
        type: Date,
        default: Date.now
    },
    examResults: [{
        type: Schema.Types.ObjectId,
        ref: "ExamResult"
    }],
    program: {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    isPromotedToLevel200: {
        type: Boolean,
        default: false
    },
    isPromotedToLevel300: {
        type: Boolean,
        default: false
    },
    isPromotedToLevel400: {
        type: Boolean,
        default: false
    },
    isGraduated: {
        type: Boolean,
        default: false
    },
    perfectName: {
        type: String
    },
    yearGraduated: {
        type: String
    }
}, { timestamps: true });

const Student = mongoose.model('Student', studentModel);

module.exports = Student;
```

# Lecture 13: Creating Exam Model
In this lecture we will add logic for Exam model. Lets craete file Exam.js in model/Academic folder and add below code.
```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const examModel = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    passMark: {
        type: Number,
        required: true,
        default: 50
    },
    totalMark: {
        type: Number,
        required: true,
        default: 100
    },
    academicTerm: {
        type: Schema.Types.ObjectId,
        ref: "AcademicTerm",
        required: true
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true
    },
    duration: {
        type: String,
        required: true,
        default: "30 minuts"
    },
    examDate: {
        type: Date,
        required: true
    },
    examTime: {
        type: Date,
        required: true
    },
    examType: {
        type: String,
        required: true,
        default: "Quize"
    },

    examStatus: {
        type: String,
        required: true,
        enum: ['pending', 'live'],
        default: "pending"
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question"
    }],
    classLevel: {
        type: Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },

}, { timestamps: true });

const Exam = mongoose.model('Exam', examModel);

module.exports = Exam;
```

# Lecture 14: Creating Question Model
In this lecture we will add logic for Question model. Lets craete file Question.js in model/Academic folder and add below code.

```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionModel = new Schema({
    question: {
        type: String,
        required: true
    },
    optionA: {
        type: String,
        required: true
    },
    optionB: {
        type: String,
        required: true
    },
    optionC: {
        type: String,
        required: true
    },
    optionD: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    },
}, { timestamps: true });

const Question = mongoose.model('Question', questionModel);

module.exports = Question;
```

# Lecture 15: Creating ExamResult Model
In this lecture we will add logic for ExamResult model. Lets craete file ExamResult.js in model/Academic folder and add below code.
```bash
const mongoose = require('mongoose');

const { Schema } = mongoose;

const examResultModel = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    passMark: {
        type: Number,
        required: true,
        default: 50
    },
    status: {
        type: String,
        enum: ['failed', 'passed'],
        default: 'failed'
    },
    remarks: {
        type: String,
        enum: ['excellent', 'good', 'poor'],
        default: 'poor'
    },
    position: {
        type: Number,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    classLevel: {
        type: Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true
    },
    academicTerm: {
        type: Schema.Types.ObjectId,
        ref: "AcademicTerm",
        required: true
    },
    academicYear: {
        type: Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const ExamResult = mongoose.model('ExamResult', examResultModel);

module.exports = ExamResult;
```

# Lecture 16: Creating DB Connect File for DB COnnection
In this lecture we will create and add logic for database connectivity in db connect file and also code updated in server.js.

***dbConnect.js code***
```bash
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        mongoose.set('strictQuery', true);

        const conn = await mongoose.connect("mongodb+srv://mcsirshad95:AtMFFGwJq8txlNij@lms.yy6o4yl.mongodb.net/lms?retryWrites=true&w=majority");
        mongoose.connect("mongodb://localhost:27017/collectionName", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongooDb Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
```

*** Updated server.js File ***

```bash
const http = require('http');

require("./config/dbConnect")

const app = require('./app/app');
// If env not containing variable then 2020 port used
const PORT = process.env.PORT || 2020;

//Server Created
const serevr = http.createServer(app);
const URL = 'http://127.0.0.1:' + PORT;

serevr.listen(PORT, console.log(`Server running on port ${PORT} and URL: ${URL}`));
```

# Lecture 17: Creating .env file
In this lecture we are creating .env file for this we need to
 - Create .env file in root directory
we added below code in .env

```bash
MONGO_URL=mongodb+srv://mcsirshad95:AtMFFGwJq8txlNij@lms.yy6o4yl.mongodb.net/lms?retryWrites=true&w=majority
```

for this is not enough we need to install package to get this variable run below command

```bash
npm i dotenv
```

atfer that goto server.js file add below line in top of the file

```bash
require('dotenv').config();
```

Now we can access .env file variable using below code

```bash
#MONGODB_URL this .env variable name
process.env.MONGODB_URL
```

# Lecture 18: MongoDb in Vscode
we can also use mangodb in our vs code. for this install
***Mangodb***
vscode extension after that open extenstion add new connection and click on connect string paste connection string and hit enter.

# Lecture 18: Using Express Routing

Firft we create AdminRouter file in routes/Staff directory and add below code.

```bash
const express = require('express')

const adminRouter = express.Router();

/**
 * Register Admin
 */
adminRouter.post('/register', (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin Created Successfully.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
});

/**
 * Login Admin
 */
adminRouter.post('/login', (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin login Successfully.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
});

/**
 * Get Single admin
 */
adminRouter.get('/:id', (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Single Admin.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
});

/**
 * Get All admins
 */
adminRouter.get('/', (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'All Admins.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
});

/**
 * Admin Update
 */
adminRouter.put('/:id', (req, res) => {
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
});

/**
 * Admin Delete
 */
adminRouter.delete('/:id', (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Delete Admins.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
});

/**
 * Admin Suspended Teacher
 */
adminRouter.put('/suspended/teacher/:id', (req, res) => {
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
});

/**
 * Admin Unsuspended Teahcer
 */
adminRouter.put('/unsuspended/teacher/:id', (req, res) => {
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
});

/**
 * Admin Withdraw Teacher
 */
adminRouter.put('/withdraw/teacher/:id', (req, res) => {
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
});

/**
 * Admin Unwithdraw Teahcer
 */
adminRouter.put('/unwithdraw/teacher/:id', (req, res) => {
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
});

/**
 * Admin publish exam
 */
adminRouter.put('/publish/exam/:id', (req, res) => {
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
});

/**
 * Admin unpublish exam
 */
adminRouter.put('/unpublish/exam/:id', (req, res) => {
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
});



module.exports = adminRouter;
```

after that in app.js we add code for this router

```bash
const adminRouter = require('../routes/Staff/AdminRouter');
app.use("/api/v1/admins", adminRouter);
```
complete code for app.js

```bash
const express = require('express');
const morgon = require('morgan');
const adminRouter = require('../routes/Staff/AdminRouter');

const app = express();

//Middlewares
app.use(morgon('dev'));

//Routes
app.use("/api/v1/admins", adminRouter);

module.exports = app;
```

here we use /api/v1/admins as a base URL


# Lecture 20: Creating Controllers

In this lecture we create Controller. For this we create two folder in controller directory named: staff, academics
In staff we create AdminController and add logic
```bash
exports.index = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'All Admins.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

exports.adminRegister = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin Created Successfully.s'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

exports.adminLogin = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Admin login Successfully.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
}

exports.getSingleAdmin = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Single Admin.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

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

exports.deleteAdmin = (req, res) => {
    try {
        res.status(201).json({
            'status': 'success',
            'data': 'Delete Admins.'
        });
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};

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
```

now we can access this function from controller to router using following code.
```bash
const express = require('express');
const express = require('express');
const {
    adminRegister,
    adminLogin,
    getSingleAdmin,
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
adminRouter.get('/:id', getSingleAdmin);

/**
 * Get All admins
 */
adminRouter.get('/', index);

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
```
***We Can create function like that***

# Lecture 22: Register admin and store data in db
we already craete dummy data in controller now update adminRegister method in admin controller as 

```bash
exports.adminRegister = async(req, res) => {
    const { name, email, password } = req.body
    try {
        //Found Admin
        const adminFound = await Admin.findOne({ email });
        if (adminFound) {
            res.json('Admin exist with this email');
        } else {
            const admin = await Admin.create({ name, email, password });
            res.status(201).json({
                'status': 'success',
                'data': admin
            });
        }

    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
};
```
*** Make password Hash ***
For this we need to install package using below command
```bash
npm i bcryptjs
```

In admin model we include packge top of file using below code

```bash
const bcrypetjs = require('bcryptjs')

```

and after setting columns add below code.
```bash

 # Mogoose use two type of middleware pre and post.
 # pre middleware is invoke before data adding in database
 # here we make password hash before adding in db. if condation check that
 # if user updating data and doesnt change password so it not rehash it otherwise 
 # below code run and password hash
 
adminSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypetjs.genSalt()
    this.password = await bcrypetjs.hash(this.password, salt);
    next();
});
```

# Lecture 23: Admin Login logic

we have to create methods in Admin model so this method can be access for each admin object.

```bash
adminSchema.methods.verifyPassword = async function(enteredPassword) {
    return bcrypetjs.compare(enteredPassword, this.password);
};
```

In AdminController in Login Method we update code.

```bash
//@desc Login Admin
//@route POST /api/v1/admins
//@access private
exports.adminLogin = async(req, res) => {
    const { email, password } = req.body;
    try {

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.json({
                'status': 'failed',
                'data': 'Inivilid credential'
            });
        }

        // console.log();

        if (admin && (await admin.verifyPassword(password))) {
            return res.json({
                'status': 'success',
                'data': admin
            });
        } else {
            return res.json({
                'status': 'failed',
                'data': 'Inivilid credential'
            });
        }
    } catch (error) {
        res.json({
            'status': 'faild',
            'error': error.message
        });
    }
}
```

# Lecture 24: AUses of Middleware
Middleware is use to access REQUEST and Response object. There are many USES of MIDDLEWARE.

- Use in AUthorization
- For Logging
- For Error Handling
- For Rate Limiting
- Data Validation
- Any Bussiness logic

# Lecture 24: Error Handling
We use package for async error handling run below command.
```bash
npm i express-async-handler
```
now any asyn function you rape inside asyncHanlder function. by using this no need to use trycatch
```bash
exports.adminRegister = AsynHandler(async(req, res) => {

    const { name, email, password } = req.body
        //Found Admin
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
        throw new Error('Admin Exist')
    } else {
        const admin = await Admin.create({ name, email, password });
        res.status(201).json({
            'status': 'success',
            'data': admin
        });
    }
});
```
# Leacture 25: Global Custom Error Handler
For this we use error middleware in app.js file after our routes.
```bash
app.use((err, req, res, next) => {
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : 'Faild';
    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({ status, message, stack })

});
```

## 25.1 : Refector Custom Error Handler
We need to create new file in middleware folder named globalErrorHandler and add below code.
```bash
const globalErrorHandler = (err, req, res, next) => {
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : 'Faild';
    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({ status, message, stack })

}

module.exports = globalErrorHandler;
```

Register in app.js
```bash
app.use(globalErrorHandler);
```

# Lecture 26 : Route Not Found Error
We need to update global handler file as
```bash
const globalErrorHandler = (err, req, res, next) => {
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : 'Faild';
    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({ status, message, stack })

}

const notFoundError = (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    next(error); // This is pass a message to next middleware.
}

module.exports = { globalErrorHandler, notFoundError };
```

and also update app.js
```bash
const express = require('express');
const morgon = require('morgan');
const adminRouter = require('../routes/Staff/AdminRouter');
const { globalErrorHandler, notFoundError } = require('../middlewares/globalErrorHandler');

const app = express();

//Middlewares
app.use(morgon('dev'));
app.use(express.json());

//Routes
app.use("/api/v1/admins", adminRouter);

//Custom Error Handler
app.use(notFoundError);
app.use(globalErrorHandler);


module.exports = app;
```

# Lecture 27 : Create isLogin Middleware
In this lecture we are going to create new file in middleware folder named: isLogin.js
```bash
const Admin = require('../model/Staff/Admin');
const verifyToken = require('../utils/verifyToken')

const isLogin = async(req, res, next) => {
    const headers = req.headers;
    const token = headers.authorization.split(" ")[1];
    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
        const user = await Admin.findById(verifiedToken.id).select("name email role")
        req.userAuth = user;
        next();
    } else {
        const err = new Error('Token expired/inivilid');
        next(err);
    }
}

module.exports = isLogin;
```
Now we can access login user using req.userAuth object in any function

Now we need to add this middleware in route we need to protect.
We pass second argument as a middleware
```bash
adminRouter.get('/:id', isLogin, getSingleAdmin);
```

# Lecture 28 : User Authentication using Json Web Token
First install json web token using below command
```bash
npm i jsonwebtoken
```
Now in utils folder create file generateToken.js
```bash
const jwt = require('jsonwebtoken');

const generateToken = id => {
    return jwt.sign({ id }, 'anykey', { expiresIn: "5d" });
}

module.exports = generateToken;
```
Now we have to update login method in AdminController
```bash
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
```

# Lecture 29 : Verify JWT
we need to create new file in utils folder named verifyToken.js
```bash
const jwt = require('jsonwebtoken')

const verifyToken = token => {
    return jwt.verify(token, 'anykey', (err, decoded) => {
        if (err) {
            return {
                message: "Inivilid Token"
            }
        } else {
            return decoded;
        }
    });
}

module.exports = verifyToken;
```
