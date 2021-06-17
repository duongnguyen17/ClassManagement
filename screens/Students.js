import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import TagUser from '../components/TagUser';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReAskPopup from '../components/popup/ReAskPopup';
import PopupStudent from '../components/popup/PopupStudent';
import {addStudent, getAllStudents, editStudent, deleteStudent} from '../realm';
const Students = props => {
  const [students, setStudents] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const scrollView = useRef(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [isShowAsk, setIsShowAsk] = useState(false);
  useEffect(() => {
    m_getAllStudents();
  }, []);
  useEffect(() => {
    scrollView.current.scrollTo({x: 0, y: 74, animated: true});
    if (searchInput == '') {
      setSearchResult(students);
    } else {
      let result = findName(searchInput);
      //console.log(`result`, result);
      setSearchResult(result);
    }
  }, [searchInput]);

  //lấy danh sách học sinh
  const m_getAllStudents = async () => {
    let allStudents = await getAllStudents(props.classId);
    //console.log(`allStudents`, allStudents);
    setStudents(allStudents);
  };
  //hàm tìm kiếm theo tên và SĐT
  const findName = strSearch => {
    let result = [];
    students.forEach(element => {
      if (element.name.includes(strSearch)) {
        result.push(element);
      } else if (element.phoneNumber.includes(strSearch)) {
        result.push(element);
      }
    });
    return result;
  };

  //xem thông tin chi tiết của học sinh
  const gotoStudent = id => {
    props.navigation.navigate('StudentInfor', {_id: id});
  };
  //thêm học sinh
  const m_addStudent = async userData => {
    const newStudent = {
      _id: Date.now(),
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      avatar: userData.avatar,
    };
    await addStudent(props.classId, newStudent);
    setIsShowPopup(false);
  };
  //chỉnh sửa học sinh
  const editUser = userInfor => {
    setIsEdit(true);
    setDataEdit(userInfor);
    setIsShowPopup(true);
  };
  //xoá học sinh
  const deleteUser = userInfor => {
    setIsShowAsk(true);
    setDataEdit(userInfor);
  };
  const m_editStudent = async student => {
    await editStudent(student);
    setIsShowPopup(false);
  };
  const m_deleteStudent = async () => {
    await deleteStudent(dataEdit._id);
    setDataEdit({});
    setIsShowAsk(false);
  };
  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom: 10}}>
        <TextInput
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'black',
            marginHorizontal: 20,
          }}
          placeholder={'Nhập tên hoặc SĐT'}
          onChangeText={text => {
            setSearchInput(text);
          }}
        />
      </View>
      <ScrollView ref={scrollView}>
        <TouchableOpacity
          onPress={() => {
            setIsEdit(false);
            setIsShowPopup(true);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
            backgroundColor: '#fff',
            borderRadius: 5,
            marginVertical: 2,
            shadowColor: '#595959',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 1,
          }}>
          <MaterialIcons
            name={'add-circle-outline'}
            size={50}
            color={'#3399ff'}
            style={{marginVertical: 10}}
          />
        </TouchableOpacity>
        {/* <FlatList
          style={{marginVertical: 10, flex: 1}}
          data={searchResult}
          renderItem={({item, index}) => (
            <TagUser
              position={'student'}
              userInfor={item}
              itemIndex={index}
              onPressItem={gotoStudent}
              editUser={editUser}
              deleteUser={deleteUser}
            />
          )}
          keyExtractor={item => item._id}
        /> */}
        {searchResult.map((item, index) => (
          <TagUser
            position={'student'}
            userInfor={item}
            key={index}
            onPressItem={gotoStudent}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        ))}
      </ScrollView>
      <PopupStudent
        dataEdit={dataEdit}
        visible={isShowPopup}
        isEdit={isEdit}
        onPressCancel={() => {
          setIsShowPopup(false);
          setDataEdit({});
        }}
        onPressOK={isEdit ? m_editStudent : m_addStudent}
      />
      <ReAskPopup
        visible={isShowAsk}
        onPressOK={m_deleteStudent}
        onPressCancel={() => {
          setIsShowAsk(false);
        }}
      />
    </View>
  );
};
export default Students;
