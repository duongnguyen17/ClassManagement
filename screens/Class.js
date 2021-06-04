import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {TabView, SceneMap} from 'react-native-tab-view';
import Attendance from '../components/Attendance';
import Schedule from '../components/Schedule';
import Students from '../components/Students';
//const SCREEN_WIDTH = Dimensions.get('screen').Width;
// const HEIGHT_COMPONENT = SCREEN_HEIGHT - 60;

const Class = props => {
  const [classInfor, setClassInfor] = useState({
    schedule: [
      {
        title: 'Thứ 2, 21/05/2021',
        lessMorning: 5,
        subMorning: [
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
        ],
        lessAfternoon: 1,
        subAfternoon: [
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
        ],
      },
      {
        title: 'Thứ 3, 22/05/2021',
        lessMorning: 5,
        subMorning: [
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
        ],
        lessAfternoon: 1,
        subAfternoon: [
          {
            name: 'Sinh học',
            teacher: 'Nguyễn Văn Dương',
            note: 'nộp bài báo cáo',
          },
        ],
      },
    ],
    students: [
      {
        _id: 'asdfasdfasdf',
        name: 'Nguyễn Văn Dương',
        phoneNumber: '023223423',
        avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
        class: '12a1',
      },
      {
        _id: 'asdfasdfasdf',
        name: 'Nguyễn Văn Duy',
        phoneNumber: '02349434',
        avatar:
          'https://res.cloudinary.com/do4l7xob6/image/upload/v1622478145/gp7usdjkqptpjkfh1rlp.jpg',
        class: '12a1',
      },
      {
        _id: 'asdfasdfasdf',
        name: 'Nguyễn Hữu Dương',
        phoneNumber: '01234',
        avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
        class: '12a1',
      },
      {
        _id: 'asdfasdfasdf',
        name: 'Nguyễn Văn Cường',
        avatar:
          'https://res.cloudinary.com/do4l7xob6/image/upload/v1622478145/gp7usdjkqptpjkfh1rlp.jpg',
        phoneNumber: '0sadfasdf48',
        class: '12a1',
      },
      {
        _id: 'asdfasdfasdf',
        name: 'Nguyễn Văn Dương',
        phoneNumber: '023223423',
        avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
        class: '12a1',
      },
      {
        _id: 'asdfasdfasdf',
        name: 'Nguyễn Văn Duy',
        phoneNumber: '02349434',
        avatar:
          'https://res.cloudinary.com/do4l7xob6/image/upload/v1622478145/gp7usdjkqptpjkfh1rlp.jpg',
        class: '12a1',
      },
      {
        _id: 'asdfasdfasdf',
        name: 'Nguyễn Hữu Dương',
        phoneNumber: '01234',
        avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
        class: '12a1',
      },
      {
        _id: 'asdfasdfasdf',
        name: 'Nguyễn Văn Cường',
        avatar:
          'https://res.cloudinary.com/do4l7xob6/image/upload/v1622478145/gp7usdjkqptpjkfh1rlp.jpg',
        phoneNumber: '0sadfasdf48',
        class: '12a1',
      },
    ],
  });

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {key: 'schedule', title: 'TKB'},
    {key: 'attendance', title: 'Điểm danh'},
    {key: 'students', title: 'Học sinh'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'schedule':
        return <Schedule schedule={classInfor.schedule} />;
      case 'attendance':
        return <Attendance students={classInfor.students} />;
      case 'students':
        return <Students students={classInfor.students} />;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaView>
  );
};
export default Class;

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollView: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

//cũ
{
  // const [searchResult, setSearchResult] = useState([]);
  // const [searchInput, setSearchInput] = useState('');
  // const [date, setDate] = useState(new Date());
  // const [btnState, setBtnState] = useState([1, 0, 0]);
  // let scheHeight = useRef(new Animated.Value(0)).current;
  // let stuHeight = useRef(new Animated.Value(0)).current;
  // let attHeight = useRef(new Animated.Value(HEIGHT_COMPONENT)).current;
  // //const [pos_y, setPos_y] = useState(null);
  // const scrollView = useRef(null);
  // //console.log(`attHeight`, attHeight);
  // //const headerHeight = useHeaderHeight();
  // useEffect(() => {
  //   if (searchInput == '') {
  //     setSearchResult(classInfor.students);
  //   } else {
  //     let result = findName(searchInput);
  //     //console.log(`result`, result);
  //     setSearchResult(result);
  //   }
  // }, [searchInput]);
  // const findName = strSearch => {
  //   let result = [];
  //   classInfor.students.forEach(element => {
  //     if (element.name.includes(strSearch)) {
  //       result.push(element);
  //     } else if (element.phoneNumber.includes(strSearch)) {
  //       result.push(element);
  //     }
  //   });
  //   return result;
  // };
  // const calPos = (button, callBack = scrollTo) => {
  //   //button là stt button 1,2,3
  //   let dis = 0;
  //   //console.log(`btnState`, btnState);
  //   for (let i = 1; i < button; ++i) {
  //     //console.log(i, btnState[i - 1]);
  //     dis += 10 + 46.9 + btnState[i - 1] * HEIGHT_COMPONENT;
  //   }
  //   //dis + headerHeight;
  //   console.log(`dis`, dis);
  //   //setPos_y(dis);
  //   callBack(dis);
  // };
  // const scrollTo = pos_y => {
  //   // console.log(`pos_y`, pos_y);
  //   scrollView.current.scrollTo({x: 0, y: pos_y, animated: true});
  // };
  // const showAttendance = () => {
  //   Animated.timing(attHeight, {
  //     toValue: HEIGHT_COMPONENT,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     let btnStateTemp = btnState;
  //     btnStateTemp[0] = 1;
  //     // console.log(`btnState`, btnState);
  //     setBtnState(btnStateTemp);
  //   });
  // };
  // const hideAttendance = () => {
  //   Animated.timing(attHeight, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     let btnStateTemp = btnState;
  //     btnStateTemp[0] = 0;
  //     setBtnState(btnStateTemp);
  //   });
  // };
  // const showShedule = () => {
  //   Animated.timing(scheHeight, {
  //     toValue: HEIGHT_COMPONENT,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     let btnStateTemp = btnState;
  //     btnStateTemp[1] = 1;
  //     setBtnState(btnStateTemp);
  //   });
  // };
  // const hideShedule = () => {
  //   Animated.timing(scheHeight, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     let btnStateTemp = btnState;
  //     btnStateTemp[1] = 0;
  //     setBtnState(btnStateTemp);
  //   });
  // };
  // const showStudents = () => {
  //   Animated.timing(stuHeight, {
  //     toValue: HEIGHT_COMPONENT,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     let btnStateTemp = btnState;
  //     btnStateTemp[2] = 1;
  //     // console.log(`btnState`, btnState);
  //     setBtnState(btnStateTemp);
  //   });
  // };
  // const hideStudents = () => {
  //   Animated.timing(stuHeight, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     let btnStateTemp = btnState;
  //     btnStateTemp[2] = 0;
  //     setBtnState(btnStateTemp);
  //   });
  // };
  // const editStudent = () => {};
  // return (
  //   <SafeAreaView style={styles.container}>
  //     <ScrollView
  //       style={styles.scrollView}
  //       //scrollEnabled={false}
  //       ref={scrollView}>
  //       <TouchableHighlight
  //         style={{
  //           marginTop: 10,
  //           borderTopEndRadius: 10,
  //           borderTopStartRadius: 10,
  //         }}
  //         onPress={() => {
  //           if (btnState[0]) {
  //             hideAttendance();
  //           } else {
  //             showAttendance();
  //           }
  //           calPos(1);
  //         }}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             backgroundColor: '#80bfff',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             borderTopEndRadius: 10,
  //             borderTopStartRadius: 10,
  //           }}>
  //           <Text
  //             style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
  //             Attendance
  //           </Text>
  //           <TouchableOpacity
  //             onPress={() => {}}
  //             style={{position: 'absolute', right: 10}}>
  //             <Octicons
  //               name="triangle-right"
  //               size={25}
  //               color="#fff"
  //               style={{padding: 10}}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       </TouchableHighlight>
  //       <Animated.ScrollView
  //         style={{backgroundColor: '#fff', height: attHeight}}>
  //         <View
  //           style={{
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}>
  //           <DatePicker mode={'date'} date={date} onDateChange={setDate} />
  //         </View>
  //         <TableStudent students={classInfor.students} />
  //       </Animated.ScrollView>
  //       <TouchableHighlight
  //         onPress={() => {
  //           if (btnState[1]) {
  //             hideShedule();
  //           } else {
  //             showShedule();
  //           }
  //           calPos(2);
  //         }}
  //         style={{
  //           marginTop: 10,
  //           borderTopEndRadius: 10,
  //           borderTopStartRadius: 10,
  //         }}>
  //         <View
  //           style={{
  //             backgroundColor: '#80bfff',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             borderTopEndRadius: 10,
  //             borderTopStartRadius: 10,
  //           }}>
  //           <Text
  //             style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
  //             Schedule
  //           </Text>
  //           <TouchableOpacity
  //             onPress={() => {}}
  //             style={{position: 'absolute', right: 10}}>
  //             <Octicons
  //               name="triangle-right"
  //               size={25}
  //               color="#fff"
  //               style={{padding: 10}}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       </TouchableHighlight>
  //       <Animated.ScrollView
  //         style={{backgroundColor: '#fff', height: scheHeight}}
  //         scrollEnabled={true}>
  //         <View>
  //           {classInfor.schedule.map((value, index) => (
  //             <TableSchedule {...value} key={index} />
  //           ))}
  //         </View>
  //       </Animated.ScrollView>
  //       <TouchableHighlight
  //         onPress={() => {
  //           if (btnState[2]) {
  //             hideStudents();
  //           } else {
  //             showStudents();
  //           }
  //           calPos(3);
  //         }}
  //         style={{
  //           marginTop: 10,
  //           borderTopEndRadius: 10,
  //           borderTopStartRadius: 10,
  //         }}>
  //         <View
  //           style={{
  //             backgroundColor: '#80bfff',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             borderTopEndRadius: 10,
  //             borderTopStartRadius: 10,
  //           }}>
  //           <Text
  //             style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
  //             Students
  //           </Text>
  //           <TouchableOpacity
  //             onPress={() => {}}
  //             style={{position: 'absolute', right: 10}}>
  //             <Octicons
  //               name="triangle-right"
  //               size={25}
  //               color="#fff"
  //               style={{padding: 10}}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //       </TouchableHighlight>
  //       <Animated.ScrollView
  //         style={{backgroundColor: '#fff', height: stuHeight}}>
  //         <View style={{marginBottom: 20}}>
  //           <TextInput
  //             style={{
  //               borderBottomWidth: 0.5,
  //               borderBottomColor: 'black',
  //               marginHorizontal: 20,
  //             }}
  //             placeholder={'Nhập tên hoặc SĐT của học sinh'}
  //             onChangeText={text => {
  //               setSearchInput(text);
  //             }}
  //           />
  //         </View>
  //         {searchResult.map((value, index) => (
  //           <TagUser
  //             key={index}
  //             userInfor={value}
  //             isEdit={false}
  //             onLongPress={editStudent}
  //           />
  //         ))}
  //       </Animated.ScrollView>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
}
