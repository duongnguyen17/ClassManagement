import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';
import {launchImageLibrary} from 'react-native-image-picker';

const PopupStudent = props => {
  const {dataEdit, visible, onPressCancel, onPressOK, isEdit} = props;
  const [name, setName] = useState(null);
  // const [grade, setGrade] = useState(dataEdit.grade);
  const [phonenumber, setPhonenumber] = useState(null);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    setName(dataEdit.name);
    setPhonenumber(dataEdit.phonenumber);
    setAvatar(dataEdit.avatar);
  }, [dataEdit]);
  const choosedPhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      //console.log(`response`, response);
      if (
        !response.didCancel &&
        response.assets[0] !== undefined &&
        response.assets[0] !== null
      ) {
        // console.log(`response`, response.assets[0].uri);
        setAvatar(response.assets[0].uri);
      }
    });
  };
  const checkphonenumber = phonenumber => {
    if (!phonenumber) return true;
    if (
      phonenumber.length !== 10 ||
      phonenumber[0] !== '0' ||
      phonenumber.match(/[^0-9]/g)
    ) {
      return false;
    } else return true;
  };
  //check name
  const checkName = name => {
    if (!name || !name.match(/^[a-zA-Z0-9_ ]*$/)) {
      return false;
    } else {
      return true;
    }
  };
  const submit = () => {
    const checkPhone = checkphonenumber(phonenumber);
    const checkName1 = checkName(name);
    if (!checkPhone && !checkName1) {
      Alert.alert(
        'Tên và SĐT không đúng!',
        'Số điện thoại phải bắt đầu bằng 0, có 10 chữ số.\nTên không được có kí tự đặc biệt và không để trống.',
        [{text: 'OK', onPress: () => {}}],
      );
    } else if (!checkPhone) {
      Alert.alert(
        'SĐT không đúng!',
        'Số điện thoại phải bắt đầu bằng 0, có 10 chữ số.',
        [{text: 'OK', onPress: () => {}}],
      );
    } else if (!checkName1) {
      Alert.alert(
        'Tên không đúng!',
        'Tên không được có kí tự đặc biệt và không để trống.',
        [{text: 'OK', onPress: () => {}}],
      );
    } else {
      let userData = {
        _id: dataEdit._id,
        name: name,
        phonenumber: phonenumber,
        avatar: avatar,
      };
      //console.log(`userData`, userData);
      onPressOK(userData);
    }
  };
  //console.log(`avatar`, avatar);
  return (
    <Dialog
      visible={visible}
      dialogTitle={
        <DialogTitle title={isEdit ? 'Chỉnh sửa thông tin' : 'Thêm học sinh'} />
      }
      footer={
        <DialogFooter>
          <DialogButton text="CANCEL" onPress={onPressCancel} />
          <DialogButton text="OK" onPress={submit} />
        </DialogFooter>
      }>
      <DialogContent
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 400,
        }}>
        <TouchableOpacity
          style={{marginTop: 10, backgroundColor: 'gray'}}
          onPress={choosedPhoto}>
          <Image
            style={{
              width: 180,
              height: 240,
              borderRadius: 5,
            }}
            source={
              avatar === undefined || avatar === ''
                ? require('../../assets/student.png')
                : {uri: avatar}
            }
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontWeight: '600'}}>Họ tên: </Text>
            </View>
            <View>
              <TextInput
                style={{fontWeight: '600', fontSize: 18, color: '#000'}}
                //defaultValue={dataEdit.name}
                value={name}
                style={{
                  width: 200,
                }}
                onChangeText={text => {
                  setName(text);
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* <View>
              <Text style={{fontWeight: '600'}}>Lớp: </Text>
            </View>
            <View>
              <TextInput
                style={{fontWeight: '600', fontSize: 18}}
                //defaultValue={dataEdit.grade}
                value={grade}
                style={{
                  width: 200,
                }}
                onChangeText={text => {
                  setGrade(text);
                }}
              />
            </View> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontWeight: '600'}}>SĐT: </Text>
            </View>
            <View>
              <TextInput
                style={{fontWeight: '600', fontSize: 18, color: '#000'}}
                //defaultValue={dataEdit.phonenumber}
                value={phonenumber}
                style={{
                  width: 200,
                }}
                onChangeText={text => {
                  setPhonenumber(text);
                }}
              />
            </View>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};
export default PopupStudent;
