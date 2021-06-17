import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PopupTeacher from '../components/PopupTeacher';
import {getAllTeacher, addTeacher, deleteTeacher, editTeacher} from '../realm';
import ReAskPopup from '../components/popup/ReAskPopup';
import TagUser from '../components/TagUser';

const Teachers = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowAsk, setIsShowAsk] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    getTeachers();
  }, []);

  //lấy danh sách các giáo viên
  const getTeachers = async () => {
    const allTeachers = await getAllTeacher();
    // console.log(`allTeachers1`, allTeachers);
    setTeachers(allTeachers);
  };

  // thêm giáo viên
  const m_addTeacher = async userData => {
    const newTeacher = {
      _id: Date.now(),
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      avatar: userData.avatar,
    };
    //console.log(`newTeacher`, newTeacher);
    await addTeacher(newTeacher);
    setIsShowPopup(false);
  };

  const editUser = userInfor => {
    setIsEdit(true);
    setDataEdit(userInfor);
    setIsShowPopup(true);
  };
  const deleteUser = userInfor => {
    setIsShowAsk(true);
    setDataEdit(userInfor);
  };
  const m_editTeacher = async teacher => {
    //console.log(`teacher`, teacher);
    await editTeacher(teacher);
    setIsShowPopup(false);
  };
  const m_deleteTeacher = async () => {
    await deleteTeacher(dataEdit);
    setDataEdit({});
    setIsShowAsk(false);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={{marginVertical: 10, flex: 1}}
        data={teachers}
        renderItem={({item, index}) => (
          <TagUser
            position={'teacher'}
            userInfor={item}
            itemIndex={index}
            onPressItem={() => {}}
            editUser={editUser}
            deleteUser={deleteUser}
          />
        )}
        keyExtractor={item => item._id}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: 20,
          backgroundColor: '#fff',
          borderRadius: 50,
          width: 50,
          height: 50,
        }}
        onPress={() => {
          setIsEdit(false);
          setIsShowPopup(true);
        }}>
        <MaterialIcons name="add-circle-outline" size={50} color="#0066ff" />
      </TouchableOpacity>
      <PopupTeacher
        dataEdit={dataEdit}
        visible={isShowPopup}
        isEdit={isEdit}
        onPressCancel={() => {
          setIsShowPopup(false);
          setDataEdit({});
        }}
        onPressOK={isEdit ? m_editTeacher : m_addTeacher}
      />
      <ReAskPopup
        visible={isShowAsk}
        onPressOK={m_deleteTeacher}
        onPressCancel={() => {
          setIsShowAsk(false);
        }}
      />
    </SafeAreaView>
  );
};
export default Teachers;

const styles = StyleSheet.create({
  tag: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 3,
    shadowColor: '#595959',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#66ccff',
    borderRadius: 5,
  },
});
