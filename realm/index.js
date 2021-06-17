import Realm from 'realm';
import {STATE_STUDENT} from '../constants';
export const SCHEMA = {
  TEACHER: 'Teacher',
  CLASS: 'Class',
  STUDENT: 'Student',
  SUBJECT: 'Subject',
  DAY: 'Day',
  SCHEDULE: 'Schedule',
  DAYOFF: 'DayOff',
  DAYHASOFF: 'DayHasOff',
  STUDENTOFF: 'StudentOff',
};
//Giáo viên được quản lý với các thuộc tính: tên, số điện thoại, hình đại diện
export const TeacherSchema = {
  name: SCHEMA.TEACHER,
  primaryKey: '_id',
  properties: {
    _id: 'int', //primaryKey
    name: 'string',
    phoneNumber: 'string?',
    avatar: 'string?',
  },
};

//Lớp học được quản lý với các thuộc tính: tên lớp, niên khoá, giáo viên chủ nhiệm
export const ClassSchema = {
  name: SCHEMA.CLASS,
  primaryKey: '_id',
  properties: {
    _id: 'int',
    name: 'string',
    year: 'string?',
    teacher: `${SCHEMA.TEACHER}?`,
    schedule: `${SCHEMA.SCHEDULE}?`,
    students: `${SCHEMA.STUDENT}[]`,
  },
};

//Học sinh được quản lý với các thuộc tính: tên, số điện thoại, hình đại diện, lớp học
export const StudentSchema = {
  name: SCHEMA.STUDENT,
  primaryKey: '_id',
  properties: {
    _id: 'int',
    name: 'string',
    phoneNumber: 'string?',
    avatar: 'string?',
    class: `${SCHEMA.CLASS}`,
    dayOff: `${SCHEMA.DAYOFF}[]`,
  },
};

// ngay nghi
export const DayOffSchema = {
  name: SCHEMA.DAYOFF,
  embedded: true,
  properties: {
    date: 'string',
    count: 'int',
  },
};

// export const StudentOff = {
//   name: SCHEMA.STUDENTOFF,
//   embedded: true,
//   properties: {
//     student: SCHEMA.STUDENT,
//     count: 'int',
//   },
// };

// //ngày có học sinh nghỉ
// export const DayHasOff = {
//   name: SCHEMA.DAYHASOFF,
//   primaryKey: '_id',
//   properties: {
//     _id: 'string',
//     students: `${SCHEMA.STUDENTOFF}[]`,
//   },
// };

//Môn học được quản lý với các thuộc tính: tên
export const SubjectSchema = {
  name: SCHEMA.SUBJECT,
  primaryKey: '_id',
  properties: {
    _id: 'int',
    name: 'string',
    // teacher: `${SCHEMA.TEACHER}?`,
  },
};

//ngày trong thời khóa biểu
export const DaySchema = {
  name: SCHEMA.DAY,
  primaryKey: '_id',
  //embedded: true,
  properties: {
    _id: 'int',
    name: 'string',
    subMorning: `${SCHEMA.SUBJECT}[]`,
    subAfternoon: `${SCHEMA.SUBJECT}[]`,
  },
};

//thời khóa biểu
export const ScheduleSchema = {
  name: SCHEMA.SCHEDULE,
  primaryKey: '_id',
  properties: {
    _id: 'int',
    days: `${SCHEMA.DAY}[]`,
  },
};

export const configureRealm = {
  //path: 'classManagement.realm',
  schema: [
    TeacherSchema,
    StudentSchema,
    ClassSchema,
    ScheduleSchema,
    DaySchema,
    DayOffSchema,
    SubjectSchema,
  ],
  // schemaVersion: 0,
};

//get all teacher
export const getAllTeacher = async () => {
  try {
    const realm = await Realm.open(configureRealm);
    let allTeacher = realm.objects(SCHEMA.TEACHER);
    //console.log(`allTeacher`, allTeacher);
    return allTeacher;
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
//add teacher
export const addTeacher = async newTeacher => {
  try {
    const realm = await Realm.open(configureRealm);
    realm.write(() => {
      realm.create(SCHEMA.TEACHER, newTeacher);
      return newTeacher;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
// edit teacher
export const editTeacher = async teacher => {
  try {
    //console.log(`teacher`, teacher)
    const realm = await Realm.open(configureRealm);
    realm.write(() => {
      let editTeacher = realm.objectForPrimaryKey(SCHEMA.TEACHER, teacher._id);
      editTeacher.name = teacher.name;
      editTeacher.phoneNumber = teacher.phoneNumber;
      editTeacher.avatar = teacher.avatar;
      return editTeacher;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
//delete teacher
export const deleteTeacher = async teacher => {
  try {
    const realm = await Realm.open(configureRealm);
    realm.write(() => {
      let deleteTeacher = realm.objectForPrimaryKey(
        SCHEMA.TEACHER,
        teacher._id,
      );
      realm.delete(deleteTeacher);
      return;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};

//get all class
export const getAllClass = async () => {
  try {
    const realm = await Realm.open(configureRealm);
    let allClass = realm.objects(SCHEMA.CLASS);
    //console.log(`allClass`, allClass);
    return allClass;
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
//add Class
export const addClass = async newClass => {
  try {
    let isHas = false;
    const realm = await Realm.open(configureRealm);
    let allTeacher = realm.objects(SCHEMA.TEACHER);
    //console.log(`allTeacher`, allTeacher);
    allTeacher.forEach((value, index) => {
      if (value.name == newClass.teacher) {
        newClass.teacher = value;
        isHas = true;
      }
    });
    if (!isHas) {
      let newTeacher = {
        _id: newClass._id,
        name: newClass.teacher,
        phoneNumber: '',
        avatar: '',
      };
      let newSchedule = {
        _id: newClass._id,
        days: [
          {
            _id: newClass._id >> 2,
            name: 'Thứ 2',
            subMorning: [],
            subAfternoon: [],
          },
          {
            _id: newClass._id >> 3,
            name: 'Thứ 3',
            subMorning: [],
            subAfternoon: [],
          },
          {
            _id: newClass._id >> 4,
            name: 'Thứ 4',
            subMorning: [],
            subAfternoon: [],
          },
          {
            _id: newClass._id >> 5,
            name: 'Thứ 5',
            subMorning: [],
            subAfternoon: [],
          },
          {
            _id: newClass._id >> 6,
            name: 'Thứ 6',
            subMorning: [],
            subAfternoon: [],
          },
          {
            _id: newClass._id >> 7,
            name: 'Thứ 7',
            subMorning: [],
            subAfternoon: [],
          },
          {
            _id: newClass._id >> 8,
            name: 'Chủ Nhật',
            subMorning: [],
            subAfternoon: [],
          },
        ],
      };
      newClass.teacher = newTeacher;
      newClass.schedule = newSchedule;
    }
    //console.log(`newClass`, newClass);
    realm.write(() => {
      realm.create(SCHEMA.CLASS, newClass);
      return newClass;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
// edit Class
export const editClass = async classData => {
  try {
    //console.log(`teacher`, teacher)
    const realm = await Realm.open(configureRealm);
    realm.write(() => {
      let editClass = realm.objectForPrimaryKey(SCHEMA.CLASS, classData._id);
      editClass.name = classData.name;
      editClass.year = classData.year;
      editClass.teacher = classData.teacher;
      return editClass;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
//delete Class
export const deleteClass = async classData => {
  try {
    const realm = await Realm.open(configureRealm);
    realm.write(() => {
      let deleteClass = realm.objectForPrimaryKey(SCHEMA.CLASS, classData._id);
      realm.delete(deleteClass);
      return;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};

//get class infor
export const getClass = async classId => {
  //console.log(`id`, id);
  const realm = await Realm.open(configureRealm);
  let classInfor = realm.objectForPrimaryKey(SCHEMA.CLASS, classId);
  //console.log(`classInfor`, classInfor);
  return classInfor;
};
//get schedule
export const getSchedule = async classId => {
  const realm = await Realm.open(configureRealm);
  let classInfor = realm.objectForPrimaryKey(SCHEMA.CLASS, classId);
  return classInfor.schedule;
};
//getAllStudents
export const getAllStudents = async classId => {
  try {
    const realm = await Realm.open(configureRealm);
    let classInfor = realm.objectForPrimaryKey(SCHEMA.CLASS, classId);
    //console.log(`classInfor`, classInfor.students);
    return classInfor.students;
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
//add student
export const addStudent = async (classId, newStudent) => {
  try {
    const realm = await Realm.open(configureRealm);
    let allStudents = realm
      .objects(SCHEMA.STUDENT)
      .filter((value, index) => value.class._id == classId);
    //console.log(`allStudents`, allStudents);
    let isHas = false;
    allStudents.forEach((value, index) => {
      if (value.name == newStudent.name) {
        console.log('da co hoc sinh nay');
        isHas = true;
      }
    });
    if (!isHas) {
      let classInfor = realm.objectForPrimaryKey(SCHEMA.CLASS, classId);
      newStudent.class = classInfor;
      newStudent.dayOff = [];
      //console.log(`newStudent`, newStudent);
      realm.write(() => {
        classInfor.students.push(newStudent);
        return newStudent;
      });
    }
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
//edit student
export const editStudent = async studentData => {
  try {
    const realm = await Realm.open(configureRealm);
    realm.write(() => {
      let editStudent = realm.objectForPrimaryKey(
        SCHEMA.STUDENT,
        studentData._id,
      );
      editStudent.name = studentData.name;
      editStudent.phoneNumber = studentData.phoneNumber;
      return editStudent;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
//delete students
export const deleteStudent = async studentId => {
  try {
    const realm = await Realm.open(configureRealm);
    realm.write(() => {
      let deleteStudent = realm.objectForPrimaryKey(SCHEMA.STUDENT, studentId);
      realm.delete(deleteStudent);
      return;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};

//get student infor
export const getStudent = async studentId => {
  try {
    //console.log(`studentId`, studentId);
    const realm = await Realm.open(configureRealm);
    let studentInfor = realm.objectForPrimaryKey(SCHEMA.STUDENT, studentId);
    return studentInfor;
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};

//điểm danh học sinh
export const nghiHoc = async (studentId, state, date) => {
  try {
    const realm = await Realm.open(configureRealm);
    let isHas = false;
    realm.write(() => {
      let studentInfor = realm.objectForPrimaryKey(SCHEMA.STUDENT, studentId);
      for (let i = 0; i < studentInfor.dayOff.length; ++i) {
        if (studentInfor.dayOff[i].date == date) {
          isHas = true;
          if (state != STATE_STUDENT.HOC) {
            studentInfor.dayOff[i].count = state;
          } else {
            studentInfor.dayOff.splice(i, 1);
          }
        }
      }
      if (!isHas) {
        if (state != STATE_STUDENT.HOC) {
          let newDayOff = {
            date: date,
            count: state,
          };
          studentInfor.dayOff.push(newDayOff);
        }
      }
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};

//change day of Schedule
export const changeDaySchedule = async newDaySchedule => {
  try {
    // console.log(`newDaySchedule`, newDaySchedule);
    const realm = await Realm.open(configureRealm);
    realm.write(() => {
      let daySchedule = realm.objectForPrimaryKey(
        SCHEMA.DAY,
        newDaySchedule._id,
      );
      daySchedule.subMorning = newDaySchedule.subMorning;
      daySchedule.subAfternoon = newDaySchedule.subAfternoon;
    });
  } catch (error) {
    switch (error) {
      default:
        console.log(error.message);
    }
  }
};
