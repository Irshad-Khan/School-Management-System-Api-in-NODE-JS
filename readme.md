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

# Lecture 9: Creating AcademicYear Model
In this lecture we will add logic for academic Year model. Lets craete file AcademicYear.js in model/Academic folder and add below code.

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