import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getAllClass, addClass, editClass, deleteClass} from '../realm';
import TagClass from '../components/tag/TagClass';
import PopupClass from '../components/popup/PopupClass';
import ReAskPopup from '../components/popup/ReAskPopup';
const Classes = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowAsk, setIsShowAsk] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

  //lấy danh sách lớp học
  const getClasses = async () => {
    const allClasses = await getAllClass();
    //  console.log(`allClasses`, allClasses);
    setClasses(allClasses);
  };
  //thêm lớp học
  const m_addClass = async classData => {
    const newClass = {
      _id: Date.now(),
      name: classData.name,
      year: classData.year,
      teacher: classData.teacher,
      students: [],
    };
    await addClass(newClass);
    setIsShowPopup(false);
  };
  //show edit
  const edit = classData => {
    setIsEdit(true);
    setDataEdit(classData);
    setIsShowPopup(true);
  };
  //show del
  const del = classData => {
    setIsShowAsk(true);
    setDataEdit(classData);
  };
  // edit class
  const m_editClass = async classData => {
    await editClass(classData);
    setIsShowPopup(false);
  };

  //delete class
  const m_deleteClass = async () => {
    await deleteClass(dataEdit);
    setDataEdit({});
    setIsShowAsk(false);
  };
  //xem chi tiết lớp học đó
  const gotoClass = (classId, className) => {
    props.navigation.navigate('Class', {_id: classId, name: className});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={{marginVertical: 10, flex: 1}}
        data={classes}
        renderItem={({item, index}) => (
          <TagClass
            classData={item}
            itemIndex={index}
            onPressItem={gotoClass}
            editClass={edit}
            deleteClass={del}
          />
        )}
        keyExtractor={item => item._id}
      />
      <TouchableOpacity
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
      <PopupClass
        dataEdit={dataEdit}
        visible={isShowPopup}
        isEdit={isEdit}
        onPressCancel={() => {
          setIsShowPopup(false);
          setDataEdit({});
        }}
        onPressOK={isEdit ? m_editClass : m_addClass}
      />
      <ReAskPopup
        visible={isShowAsk}
        onPressOK={m_deleteClass}
        onPressCancel={() => {
          setIsShowAsk(false);
        }}
      />
    </SafeAreaView>
  );
};
export default Classes;
