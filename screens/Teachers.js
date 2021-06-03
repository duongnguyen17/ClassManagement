import React, {useState, useEffect} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import TagUser from '../components/TagUser';

const Teachers = props => {
  const [isShow, setIsShow] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [teachers, setTeachers] = useState([
    {
      name: 'Nguyễn Văn Dương',
      avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
      phoneNumber: '0393072748',
    },
    {
      name: 'Nguyễn Văn Duy',
      avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
      phoneNumber: '0393072748',
    },
    {
      name: 'Nguyễn Văn Dương',
      avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
      phoneNumber: '0393072748',
    },
    {
      name: 'Nguyễn Văn Duy',
      avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
      phoneNumber: '0393072748',
    },
    {
      name: 'Nguyễn Văn Dương',
      avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
      phoneNumber: '0393072748',
    },
    {
      name: 'Nguyễn Văn Duy',
      avatar: 'https://ctt-sis.hust.edu.vn/Content/Anh/anh_20173069.JPG',
      phoneNumber: '0393072748',
    },
  ]);
  
  const showModal = data => {
    //console.log(`data`, data);
    setDataEdit(data);
    setIsShow(true);
  };
  const editUser = () => {};
  const deleteUser =  () => {};
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{marginVertical: 10, flex: 1}}>
        {teachers.map((value, index) => (
          <TagUser
            userInfor={value}
            key={index}
            isEdit={false}
            onLongPress={showModal}
          />
        ))}
      </ScrollView>
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
          setDataEdit({});
          setIsShow(true);
        }}>
        <MaterialIcons name="add-circle-outline" size={50} color="#0066ff" />
      </TouchableOpacity>
      <Modal visible={isShow} transparent={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              opacity: 0.8,
              backgroundColor: '#f2f2f2',
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
          <View style={{backgroundColor: '#f2f2f2', width: '100%'}}>
            <TagUser userInfor={dataEdit} isEdit={true} />
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                marginRight: 50,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={deleteUser}
                style={{backgroundColor: '#fff', borderRadius: 5}}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={28}
                  color="black"
                  style={{marginVertical: 5, marginHorizontal: 5}}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    setIsShow(false);
                    setDataEdit(null);
                  }}
                  style={[styles.button, {marginRight: 40}]}>
                  <Text style={styles.text}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={editUser} style={styles.button}>
                  <Text style={styles.text}>Thay đổi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
