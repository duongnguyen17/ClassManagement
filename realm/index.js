import Realm from 'realm';

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
    class: SCHEMA.CLASS,
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

export const StudentOff = {
  name: SCHEMA.STUDENTOFF,
  embedded: true,
  properties: {
    student: SCHEMA.STUDENT,
    count: 'int',
  },
};

//ngày có học sinh nghỉ
export const DayHasOff = {
  name: SCHEMA.DAYHASOFF,
  primaryKey: '_id',
  properties: {
    _id: 'string',
    students: `${SCHEMA.STUDENTOFF}[]`,
  },
};

//Môn học được quản lý với các thuộc tính: tên
export const SubjectSchema = {
  name: SCHEMA.SUBJECT,
  primaryKey: '_id',
  properties: {
    _id: 'int',
    name: 'string',
    teacher: `${SCHEMA.TEACHER}`,
  },
};

//ngày trong thời khóa biểu
export const DaySchema = {
  name: SCHEMA.DAY,
  //embedded: true,
  properties: {
    name: 'int',
    subMorning: `${SCHEMA.SUBJECT}[]`,
    subAfternoon: `${SCHEMA.SUBJECT}[]`,
  },
};

//thời khóa biểu
export const ScheduleSchema = {
  name: SCHEMA.SCHEDULE,
  properties: {
    _id: 'string',
    days: `${SCHEMA.DAY}[]`,
  },
};

const configureRealm = {
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
    console.log(`allTeacher`, allTeacher);
    allTeacher.forEach((value, index) => {
      if (value.name == newClass.teacher) {
        newClass.teacher = value;
        isHas = true;
      }
    });
    if (!isHas) {
      let newTeacher = {
        _id: Math.floor(Date.now() / 100),
        name: newClass.teacher,
        phoneNumber: '',
        avatar: '',
      };
      await addTeacher(newTeacher);
      newClass.teacher = newTeacher;
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
